var context = new AudioContext(),
    playStopButton = document.getElementById("playStopButton"),
    sliders = document.getElementById("slider"),
    sound = new Audio("sound.wav"),
    isPlaying = false,
    source = context.createMediaElementSource(sound),
    compressor = context.createDynamicsCompressor();

sound.loop = true;
source.connect(compressor);
compressor.connect(context.destination);

for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter);
}

function changeParameter() {
    switch(this.id) {
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.getElementById("thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "ratioSlider":
            compressor.ratio.value = (this.value / 5);
            document.getElementById("ratioOutput").innerHTML = (this.value / 5) + " Ratio";
            break;
        case "kneeSlider":
            compressor.knee.value = (this.value / 2.5);
            document.getElementById("kneeOutput").innerHTML = (this.value / 2.5) + " dB";
            break;
        case "attackSlider":
            compressor.attack.value = (this.value / 100);
            document.getElementById("attackOutput").innerHTML = (this.value / 100) + " ms";
            break;
        case "releaseSlider":
            compressor.release.value = (this.value / 100);
            document.getElementById("releaseOutput").innerHTML = (this.value / 100) + " s";
            break;
    }
}

sound.addEventListener("timeupdate", function() {
    document.getElementById("reductionOutput").innerHTML = "Reduction " + compressor.reduction + " dB";
});

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