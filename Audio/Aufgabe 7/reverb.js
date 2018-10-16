var context = new AudioContext(),
    sound = new Audio("sound.wav"),
    source = context.createMediaElementSource(sound),
    convolver,
    selectList = document.getElementById("selectList"),
    isPlaying = false;

    loadImpulseResponse("church");

    selectList.addEventListener("change", function() {
        loadImpulseResponse(selectList.options[selectList.selectIndex].value);
    });

    function loadImpulseResponse (name) {
        var request = new XMLHttpRequest();
        request.open("GET",  "path/to/your/impulseResponse.wav", true);
        request.responseType = "arraybuffer";

request.onload = function () {
     var undecodedAudio = request.response;
     context.decodeAudioData(undecodedAudio, function (buffer) {
         if(convolver) {convolver.disconnect();}
         convolver = context.createConvolver(),
          convolver.buffer = buffer;
          convolver.normalize = true;

          source.connect(convolver);
          convolver.connect(connect.destination);
     });
};
request.send();
    }

sound.loop = true;

playStopButton.addEventListener("click", function () {
    if(isPlaying) {
        sound.pause();
        playStopButton.innerHTML = "Play";
    } else {
        sound.play();
        playStopButton.innerHTML = "Pause";
    }
    isPlaying = !isPlaying;
}); 

sound.addEventListener("ended", function () {
    isPlaying = false;
    playStopButton.innerHTML = "Play";
});