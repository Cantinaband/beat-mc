let drumpad = document.querySelector("#drumpad");
let AudioContext = window.AudioContext || window.webkitAudioContext;

let context = new AudioContext();

const numerOfCols = 10;
const numberOfColPads = 6;

let pads = [];
let soundBuffers = [];

window.onload = function() {
  for (let i = 0; i < numerOfCols * numberOfColPads; i++) {
    getData(i);
  }
};
createDrumpad(numerOfCols, numberOfColPads);

function createDrumpad(cols, padsPerCol) {
  for (let i = 0; i < cols; i++) {
    var col = document.createElement("div");
    col.classList.add("col");
    for (let j = 0; j < padsPerCol; j++) {
      var pad = document.createElement("div");
      pad.classList.add("pad");
      pad.addEventListener("touchstart", () => {
        playSound(i, j);
      });
      pad.addEventListener("click", () => {
        playSound(i, j);
      });
      col.appendChild(pad);
      pads.push({
        col_index: i,
        index: j,
        html: pad
      });
    }

    drumpad.appendChild(col);
  }
}

function playSound(col, index) {
  console.log("col ", col, " : index ", index);
  var i = (col + 1) * index;
  var sourceBuffer = context.createBufferSource();
  sourceBuffer.buffer = soundBuffers[i];
  sourceBuffer.connect(context.destination);
  sourceBuffer.start(0);
}

function getData(i) {
  var request = new XMLHttpRequest();
  request.open("GET", `sounds/sound_${i + 1}.wav`, true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    var undecodedAudio = request.response;
    context.decodeAudioData(undecodedAudio, function(buffer) {
      soundBuffers[i] = buffer;
    });
  };
  request.send();
}
