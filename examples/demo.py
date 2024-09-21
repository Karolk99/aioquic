#
# demo application for http3_server.py
#

import datetime
import os
from urllib.parse import urlencode
import time

from starlette.applications import Starlette
from starlette.responses import PlainTextResponse, Response
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from starlette.types import Receive, Scope, Send
from starlette.websockets import WebSocketDisconnect

ROOT = os.path.dirname(__file__)
STATIC_ROOT = os.environ.get("STATIC_ROOT", os.path.join(ROOT, "htdocs"))
STATIC_URL = "/"
LOGS_PATH = os.path.join(STATIC_ROOT, "logs")
QVIS_URL = "https://qvis.quictools.info/"

templates = Jinja2Templates(directory=os.path.join(ROOT, "templates"))


async def homepage(request):
    """
    Simple homepage.
    """
    await request.send_push_promise("/style.css")
    return templates.TemplateResponse("index.html", {"request": request})


async def echo(request):
    """
    HTTP echo endpoint.
    """
    content = await request.body()
    media_type = request.headers.get("content-type")
    return Response(content, media_type=media_type)


async def logs(request):
    """
    Browsable list of QLOG files.
    """
    logs = []
    for name in os.listdir(LOGS_PATH):
        if name.endswith(".qlog"):
            s = os.stat(os.path.join(LOGS_PATH, name))
            file_url = "https://" + request.headers["host"] + "/logs/" + name
            logs.append(
                {
                    "date": datetime.datetime.utcfromtimestamp(s.st_mtime).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                    "file_url": file_url,
                    "name": name[:-5],
                    "qvis_url": QVIS_URL
                    + "?"
                    + urlencode({"file": file_url})
                    + "#/sequence",
                    "size": s.st_size,
                }
            )
    return templates.TemplateResponse(
        "logs.html",
        {
            "logs": sorted(logs, key=lambda x: x["date"], reverse=True),
            "request": request,
        },
    )


async def padding(request):
    """
    Dynamically generated data, maximum 50MB.
    """
    size = min(50000000, request.path_params["size"])
    return PlainTextResponse("Z" * size)


async def ws(websocket):
    """
    WebSocket echo endpoint.
    """
    if "chat" in websocket.scope["subprotocols"]:
        subprotocol = "chat"
    else:
        subprotocol = None
    await websocket.accept(subprotocol=subprotocol)

    try:
        while True:
            message = await websocket.receive_text()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        pass


async def wt(_scope: Scope, receive: Receive, send: Send) -> None:
    """
    WebTransport echo endpoint.
    """
    # accept connection
    message = await receive()

    assert message["type"] == "webtransport.connect"
    await send({"type": "webtransport.accept"})

    state = {}
    rest = {}

    with open("stats.csv", 'w') as file:
        file.write("segment_no,latency,sent,recv,number,type\n")

        while True:
            message = await receive()

            stream = message["stream"]
            data = message["data"]

            if message["type"] == "webtransport.stream.receive" and data:
                if stream not in state:
                    state[stream] = {"current": 0, "next_value": "S"}
                    rest[stream] = b''

                new_data = rest[stream] + data
                rest[stream] = handle_process(state, stream, new_data, file)


def handle_process(state, stream, data, file):
    while True:
        next_value = state[stream]["next_value"]

        if next_value.encode("utf-8") not in data:
            return b''
        
        if next_value == "S" and len(data) < 21:
            return data

        idx = data.index(next_value.encode("utf-8"))
        
        if next_value == "S":
            handle_start(state, stream, data[1:2], data[2:7], data[7:20])
            state[stream]["next_value"] = "E"
        else:
            handle_end(state, stream, file)
            state[stream]["next_value"] = "S"

        data = data[idx + 1:]

def handle_start(state, stream, type, number, timestamp):
    timestamp = int(timestamp.decode('utf-8'))
    number = int(number.decode('utf-8'))
    
    current = state[stream]["current"]
    state[stream][current] = {"sent": timestamp, "number": number, "type": type}

def handle_end(state, stream, file):
    current = state[stream]["current"]
    state[stream][current]["recv"] = time.time_ns() // 1000000

    name = f"{stream}:{current}"
    segment = state[stream][current]

    save_segment(name, segment, file)

    state[stream]["current"] += 1


def save_segment(name, segment, file):
    duration = segment["recv"] - segment["sent"]
    file.write(f"{name},{duration},{segment['sent']},{segment['recv']},{segment['number']},{segment['type']}\n")
    print(f"{name},{duration},{segment['sent']},{segment['recv']},{segment['number']},{segment['type']}\n")

starlette = Starlette(
    routes=[
        Route("/", homepage),
        Route("/{size:int}", padding),
        Route("/echo", echo, methods=["POST"]),
        Route("/logs", logs),
        WebSocketRoute("/ws", ws),
        Mount(STATIC_URL, StaticFiles(directory=STATIC_ROOT, html=True)),
    ]
)


async def app(scope: Scope, receive: Receive, send: Send) -> None:
    if scope["type"] == "webtransport" and scope["path"] == "/wt":
        await wt(scope, receive, send)
    else:
        await starlette(scope, receive, send)
