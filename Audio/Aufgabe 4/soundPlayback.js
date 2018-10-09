var context = new AudioContext();
var drumpads = document.getElementsByClassName("drumpad");
soundbuffers = [];

function playSound (value) {
    soundbuffers[value].play();
}

for (let i = 0; i < drumpads.length; i++) {
    soundbuffers[i] = new Audio("sounds/sounds" + (i+1) + ".wav");
    var soundNote = context.createMediaElementSource(soundbuffers[i]);
    var gainNode = context.createGain();

    gainNode.gain.value = 0.8;

    soundNote.connect(gainNode);
    gainNode.connect(connect.destination);

    drumpads[i].addEventListener("mousedown" , function(){playSound});
}