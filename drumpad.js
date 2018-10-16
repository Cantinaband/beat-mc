const colors = [
    "#795548",
    "#4CAF50",
    "#303F9F",
    "#E64A19",
    "#FFEB3B",
    "#7B1FA2"
  ],
  numerOfRows = 6,
  numberOfRowPads = 17,
  beatTypes = [
    { type: "hihat", color: "yellow" },
    { type: "kick", color: "orange" },
    { type: "snare", color: "red" },
    { type: "tom1", color: "purple" },
    { type: "tom2", color: "green" },
    { type: "tom3", color: "blue" }
  ];

let drumpad = document.querySelector("#drumpad"),
  AudioContext = window.AudioContext || window.webkitAudioContext,
  context = new AudioContext(),
  soundBuffers = [];

window.onload = function() {
  for (let i = 0; i < beatTypes.length; i++) {
    getData(i);
  }
  createDrumpad();
};

function getData(i) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `sounds/drum-samples/Bongos/${beatTypes[i].type}.wav`,
    true
  );
  request.responseType = "arraybuffer";
  request.onload = function() {
    var undecodedAudio = request.response;
    context.decodeAudioData(undecodedAudio, function(buffer) {
      soundBuffers[i] = buffer;
    });
  };
  request.send();
}

function createDrumpad() {
  for (let i = 0; i < numerOfRows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < numberOfRowPads; j++) {
      var pad = document.createElement("div");
      pad.classList.add("pad");
      pad.id = `${i}_${j}`;
      if (j === 0) pad.innerHTML = beatTypes[i].type;
      pad.addEventListener("click", () => {
        playSound(i, j);
      });
      row.appendChild(pad);
    }
    drumpad.appendChild(row);
  }
}

function playSound(row, index) {
  var pad = document.getElementById(`${row}_${index}`);
  pad.style.background = beatTypes[row].color;
  setTimeout(() => {
    pad.style.background = "#385260";
  }, 100);
  var sourceBuffer = context.createBufferSource();
  sourceBuffer.buffer = soundBuffers[row];
  sourceBuffer.connect(context.destination);
  sourceBuffer.start(0);
}
