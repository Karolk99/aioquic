import { FRAMES_SIZE, FRAMES_TYPE } from './constants.js';

const max_size = 708904; // 639946;
const mean_size = 125000; // per second
const videoLength = 600000 // milliseconds

let longString = "";

while (longString.length < max_size - 1) {
  longString += "A";
}

longString += "E";


async function connect() {
  const url = document.getElementById("url").value;
  try {
    var transport = new WebTransport(url);
    addToEventLog("Initiating connection...");
  } catch (e) {
    addToEventLog("Failed to create connection object. " + e, "error");
    return;
  }

  try {
    await transport.ready;
    addToEventLog("Connection ready.");
  } catch (e) {
    addToEventLog("Connection failed. " + e, "error");
    return;
  }

  transport.closed
    .then(() => {
      addToEventLog("Connection closed normally.");
    })
    .catch(() => {
      addToEventLog("Connection closed abruptly.", "error");
    });

  addToEventLog(`test one stream`);
  perfrom_test_1(transport);
  // perfrom_test_1(transport, segmentLength);
}

function create_frame(idx, encoder) {
  const size = FRAMES_SIZE[idx];
  const type = FRAMES_TYPE[idx];
  const timestamp = Date.now().toString();

  //size powinien byc mniejszy o pięć
  const segment =
    "S" +
    type +
    idx.toString().padStart(5, '0') +
    timestamp +
    longString.substring(max_size - (size - timestamp.length - 2), max_size);
  
  const encodedSegment = encoder.encode(segment);
  return encodedSegment;
}

async function perfrom_test_1(transport) {
  // one stream for all segments

  const stream = await transport.createUnidirectionalStream();
  const writer = stream.getWriter();
  const encoder = new TextEncoder("utf-8");

  const framesNo = FRAMES_SIZE.length;

  let counter = 0;
  const intervalID = setInterval(() => {
    if (counter == framesNo) {
      clearInterval(intervalID);
      return;
    }

    const segment = create_frame(counter, encoder);
    writer.write(segment);

    addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);

    counter++;
  }, 333);
}

async function perfrom_test_2(transport) {
  // stream per segment with prioritization

  const encoder = new TextEncoder("utf-8");

  const streamB = await transport.createUnidirectionalStream({sendOrder: 1});
  const streamP = await transport.createUnidirectionalStream({sendOrder: 2});
  const streamI = await transport.createUnidirectionalStream({sendOrder: 3});
  
  const writerB = streamB.getWriter();
  const writerP = streamP.getWriter();
  const writerI = streamI.getWriter();
  
  const framesNo = FRAMES_SIZE.length;

  let counter = 0;
  const intervalID = setInterval(async () => {
    if (counter >= framesNo) {
      clearInterval(intervalID);
      return;
    }

    const segment = create_frame(counter, encoder);

    switch (grade) {
      case 'I':
        writerI.write(segment);
        break;
      case 'P':
        writerP.write(segment);
        break;
      case 'B':
        writerB.write(segment);
        break;
      default:
        console.log('Invalid type.');
    }

    counter++;
  }, 333);
}

// async function perfrom_test_2(transport) {
//   // stream per segment

//   const encoder = new TextEncoder("utf-8");
//   let idx = 0;

//   while (true) {
//     const stream = await transport.createUnidirectionalStream();
//     const writer = stream.getWriter();

//     const segment = create_segment(idx, encoder);

//     writer.write(segment);

//     addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
//     idx += 1;
//   }
// }

// async function perfrom_test_3(transport) {
//   // stream per segment with prioritization

//   const encoder = new TextEncoder("utf-8");
//   let idx = 0;

//   while (true) {
//     const stream = await transport.createUnidirectionalStream({
//       sendOrder: idx,
//     });
//     const writer = stream.getWriter();

//     const segment = create_segment(idx, encoder);

//     writer.write(segment);

//     addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
//     idx += 1;
//   }
// }

// async function perfrom_test_4(transport) {
//   // stream per segment with prioritization and removing old segments

//   const encoder = new TextEncoder("utf-8");
//   let idx = 0;

//   while (true) {
//     const stream = await transport.createUnidirectionalStream({
//       sendOrder: idx,
//     });
//     const writer = stream.getWriter();

//     const segment = create_segment(idx, encoder);

//     writer.write(segment);

//     addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
//     idx += 1;
//   }
// }

function addToEventLog(text, severity = "info") {
  let log = document.getElementById("event-log");
  let mostRecentEntry = log.lastElementChild;
  let entry = document.createElement("li");
  entry.innerText = text;
  entry.className = "log-" + severity;
  log.appendChild(entry);

  // If the most recent entry in the log was visible, scroll the log to the
  // newly added element.
  if (
    mostRecentEntry != null &&
    mostRecentEntry.getBoundingClientRect().top <
    log.getBoundingClientRect().bottom
  ) {
    entry.scrollIntoView();
  }
}
