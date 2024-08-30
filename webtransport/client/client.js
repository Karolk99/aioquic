// Adds an entry to the event log on the page, optionally applying a specified
// CSS class.

const one_second = [
  60092, 111919, 177018, 146783, 117636, 169945, 168790, 53614, 85151, 178518,
  165951, 101720, 353651, 134185, 101365, 111792, 222258, 167717, 235935,
  211846, 128691, 160301, 168123, 289833, 193744, 83564, 89781, 69162, 81735,
  107539, 107985, 59694, 224383, 209223, 65574, 115444, 94462, 73201, 107368,
  116624, 131915, 76620, 32933, 88954, 172811, 64675, 175967, 216956, 226681,
  93399, 69847, 33305, 62685, 93882, 22941, 184919, 198034, 136102, 72982,
  89589, 143568, 72515, 221509, 198188, 108776, 90519, 54240, 108369, 53272,
  84843, 58233, 124166, 170908, 99996, 145399, 212990, 213806, 203256, 97626,
  108073, 160268, 194325, 159975, 273555, 145012, 91301, 69879, 34225, 133960,
  205474, 189480, 65068, 85150, 66069, 74504, 77828, 75318, 126941, 193373,
  224797, 39197, 96325, 49998, 95045, 174770, 158125, 296761, 239323, 112709,
  71300, 156454, 297233, 248207, 215254, 127747, 166110, 86266, 43032, 83125,
  103353, 68787, 121450, 106017, 142152, 165231, 216486, 164243, 107813, 48523,
  127911, 41561, 116275, 113009, 102256, 69864, 40111, 73214, 36705, 247885,
  198783, 191797, 226183, 56240, 70915, 89486, 61033, 106484, 151929, 47085,
  80241, 80552, 76685, 68795, 191840, 217017, 65119, 80613, 89592, 114531,
  87532, 93637, 45755, 85285, 167945, 189204, 180063, 223352, 124867, 111326,
  195537, 117353, 110393, 91528, 179623, 141193, 169120, 204614, 186279, 74713,
  49669, 194212, 105507, 223140, 118550, 107696, 114018, 90273, 84547, 140247,
  102537, 65250, 77906, 35529, 95706, 102918, 195069, 182649, 60717, 49091,
  59145, 87829, 97232, 216021, 185429, 73856, 71463, 186803, 145596, 69954,
  120231, 162923, 124413, 149795, 92220, 100044, 88156, 98952, 211974, 346293,
  170507, 172965, 143468, 70977, 44823, 208958, 143206, 220574, 142504, 229083,
  31425, 74514, 199248, 122687, 135925, 172183, 183003, 80346, 85528, 172580,
  158270, 126047, 88376, 104408, 102163, 129717, 180554, 147625, 217270, 79567,
  106478, 129211, 245003, 115012, 55830, 64754, 60575, 77319, 74708, 188563,
  157097, 53952, 84590, 109911, 88230, 46454, 148689, 74674, 127750, 59471,
  106665, 118992, 120458, 53012, 161511, 97288, 71716, 83094, 94861, 97935,
  76297, 145782, 217003, 49043, 70081, 84093, 99350, 68143, 120330, 140137,
  106882, 87104, 76378, 139770, 164946, 208764, 83839, 74317, 226644, 121485,
  136265, 226166, 100432, 91596, 63322, 233708, 175932, 238823, 198527, 139775,
  62414, 54622, 141049, 150634, 194755, 169961, 183120, 42865, 87226, 228667,
  214463, 168442, 213490, 165070, 79407, 82055, 180287, 101089, 103073, 186041,
  131816, 118073, 52559, 140392, 245735, 67742, 68124, 156764, 199768, 95896,
  66970, 70908, 50517, 126412, 193142, 124237, 86204, 72681, 85120, 111266,
  121212, 163370, 120574, 98420, 91064, 192862, 128877, 40196, 183669, 152532,
  124738, 116689, 203258, 83718, 87729, 164170, 188161, 256148, 50002, 139848,
  183713, 126358, 47227, 106777, 114800, 58156, 77596, 100138, 44080, 52158,
  6251, 125604, 77233, 78505, 113257, 72555, 84562, 80904, 60726, 104631, 91012,
  68149, 68403, 107053, 100567, 154418, 136147, 49484, 29536, 89466, 80563,
  130155, 125238, 64766, 163657, 163144, 98454, 180557, 69223, 179118, 262209,
  100637, 43944, 88590, 165834, 207515, 183458, 95776, 135369, 147500, 175498,
  173892, 242914, 163889, 314605, 131050, 188910, 242772, 135863, 100496,
  173135, 123271, 127591, 139946, 93176, 220063, 236895, 131009, 55216, 113673,
  103489, 105985, 40337, 67499, 63472, 66900, 221054, 94378, 73470, 45812,
  91345, 154040, 73558, 68206, 81929, 63740, 100408, 93676, 78098, 61798,
  124406, 34599, 101235, 106525, 39772, 91631, 83822, 59044, 137785, 78909,
  117607, 192851, 139107, 67936, 158356, 107187, 60426, 174591, 195669, 83942,
  151102, 68226, 158011, 164573, 31738, 276096, 167696, 100302, 19358, 65900,
  87148, 112224, 96200, 99010, 145744, 110038, 129911, 126090, 92465, 49724,
  134639, 51159, 140682, 95776, 89537, 200174, 184449, 111092, 282614, 272403,
  90520, 177181, 120051, 201559, 236495, 115106, 182591, 158791, 38856, 151557,
  102890, 169463, 107477, 43415, 102143, 165279, 157401, 32999, 97821, 127830,
  168294, 100525, 164476, 210067, 107359, 78086, 240457, 218147, 144587, 253936,
  213536, 110055, 52020, 83499, 62676, 84829, 84901, 43498, 126090, 225475,
  114763, 62211, 92971, 47789, 137627, 26143, 51564, 68906, 91911, 231066,
  150005, 60409, 107657, 92493, 50407, 26056, 116379, 116624, 61419, 129080,
  99471, 211591, 79188, 50148, 51241, 106950, 44616, 93317, 217291, 364044,
  189061, 212932, 128858, 165279, 124129, 113362, 103027, 178133, 176659,
  228486, 130358, 112127, 159409, 45915, 202950, 191107, 124025, 96656, 165304,
  45150, 120692, 172787, 192141, 112253, 213328, 156275, 163683, 109104, 103984,
  221767, 108164, 258859, 84975, 138749, 175328, 422747, 201844, 108664, 131386,
  86088, 43452, 85799, 92586, 140810, 108546, 40226, 78760, 81375, 60607,
  110137, 268713, 82732, 101446, 22367, 87296, 110657,
];
const two_second = [
  261990, 337000, 203143, 270137, 136680, 238277, 308802, 362984, 227537,
  221736, 138801, 68190, 67999, 202331, 205095, 228330, 283515, 328234, 252360,
  149824, 217900, 212287, 333209, 305305, 312158, 423332, 231577, 133870,
  361811, 247919, 225043, 302549, 345646, 414463, 152703, 246653, 237086,
  173987, 375004, 328903, 403754, 232685, 265188, 276855, 232396, 158701,
  365717, 319572, 256667, 168420, 89870, 214669, 306387, 259619, 218597, 190047,
  270808, 341352, 295715, 284899, 315031, 173092, 351952, 316039, 159244,
  247961, 171007, 250379, 191462, 113211, 209614, 199899, 133926, 289374,
  138407, 132856, 388797, 267635, 184527, 190192, 343230, 280484, 313903, 39197,
  270042, 270657, 196991, 230989, 338508, 255994, 329277, 153502, 106320,
  299461, 121446, 158124, 225910, 307081, 221389, 330851, 156390, 353027,
  250189, 336288, 287423, 265723, 291736, 282784, 307154, 169797, 218582,
  281714, 267856, 244247, 211432, 292671, 196362, 284561, 354410, 221882,
  278240, 145777, 286573, 252297, 319913, 296318, 151773, 249662, 207802,
  322914, 311412, 208086, 243615, 232193, 399103, 422759, 209826, 374854,
  176407, 180104, 273396, 175195, 217965, 227745, 186411, 259647, 232596,
  194972, 368765, 500241, 134310, 213739, 219159, 205066, 345209, 252874,
  248162, 218394, 346566, 168089, 301601, 282238, 217648, 207609, 257942,
  259540, 256904, 210279, 250669, 101935, 219673, 260177, 321994, 251925,
  175711, 245161, 255864, 324281, 258645, 317788, 283053, 285367, 163020,
  290200, 240435, 162803, 314938, 286437, 170431, 249582, 639946, 246177,
  308259, 258617, 319472, 285360, 200260, 241349, 250978, 308847, 383600,
  260960, 210778, 174823, 197569, 169829, 295069, 310195, 266285, 150151,
  243473, 298866, 223124, 284745, 232144, 122086, 285197, 307442, 224991,
  489661, 398405, 218442, 290503, 260364, 314432, 328635, 290630, 250593,
  237463, 224720, 269752, 557696, 252495, 275470, 137392, 192301, 329214,
  158949, 248962, 397516, 215294, 221352, 186618, 304304, 333040, 177953,
  164575, 384673, 325304, 329324, 153969, 321444, 172459, 182896, 193199,
  320530, 165751, 287500, 305505, 301328, 227022, 234742, 173910, 283960,
  198543, 216555, 223209, 375294, 267779, 279013, 305029, 222380, 182856,
  175046, 328245, 136124, 326787, 330535, 194402, 239700, 188289, 311762,
  150052, 205001, 388529, 69379, 97909, 138720, 52265, 324216, 210602, 161344,
  231970, 287659, 262754, 217323, 323147, 324284, 166852, 270057, 182223,
  313520, 232021, 278874, 236412, 250986, 74244, 139503, 101369, 187882, 264747,
  208268, 267334, 229340, 153399, 162925, 298798, 247751,
];

const max_size = 639946;
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

  const segmentLength = 2000;
  perfrom_test_4(transport, segmentLength);
}

function create_segment(idx, encoder, intervalTime) {
  const size = intervalTime == 1000 ? one_second[idx] : two_second[idx];
  const timestamp = Date.now().toString();

  const segment =
    timestamp +
    longString.substring(max_size - (size - timestamp.length), max_size);
  const encodedSegment = encoder.encode(segment);

  return encodedSegment;
}

async function perfrom_test_1(transport, intervalTime) {
  // one stream for all segments

  const stream = await transport.createUnidirectionalStream();
  const writer = stream.getWriter();
  const encoder = new TextEncoder("utf-8");

  const segmentNo = videoLength / intervalTime;

  let counter = 0;
  const intervalID = setInterval(() => {
    if (counter >= segmentNo) {
      clearInterval(intervalID);
      return;
    }

    const segment = create_segment(counter, encoder, intervalTime);
    writer.write(segment);

    addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);

    counter++;
  }, intervalTime);
}

async function perfrom_test_2(transport, intervalTime) {
  // stream per segment

  const encoder = new TextEncoder("utf-8");
  const segmentNo = videoLength / intervalTime;

  let counter = 0;
  const intervalID = setInterval(async () => {
    if (counter >= segmentNo) {
      clearInterval(intervalID);
      return;
    }

    const stream = await transport.createUnidirectionalStream();
    const writer = stream.getWriter();

    const segment = create_segment(counter, encoder, intervalTime);
    writer.write(segment);

    addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);

    counter++;
  }, intervalTime);
}

async function perfrom_test_3(transport, intervalTime) {
  // stream per segment with prioritization

  const encoder = new TextEncoder("utf-8");
  const segmentNo = videoLength / intervalTime;

  let counter = 0;
  const intervalID = setInterval(async () => {
    if (counter >= segmentNo) {
      clearInterval(intervalID);
      return;
    }

    const stream = await transport.createUnidirectionalStream({
      sendOrder: counter,
    });
    const writer = stream.getWriter();
    const segment = create_segment(counter, encoder, intervalTime);
    writer.write(segment);

    addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);

    counter++;
  }, intervalTime);
}

async function perfrom_test_4(transport, intervalTime) {
  // stream per segment with prioritization and aborting old streams

  const encoder = new TextEncoder("utf-8");
  const segmentNo = videoLength / intervalTime;

  let counter = 0;
  const intervalID = setInterval(async () => {
    if (counter >= segmentNo) {
      clearInterval(intervalID);
      return;
    }

    const stream = await transport.createUnidirectionalStream({
      sendOrder: counter,
    });
    const writer = stream.getWriter();
    const segment = create_segment(counter, encoder, intervalTime);
    writer.write(segment);

    addToEventLog(`Sent a unidirectional stream with data: ${segment.length}`);
    setTimeout(() => writer.abort(), 2000);

    counter++;
  }, intervalTime);
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
