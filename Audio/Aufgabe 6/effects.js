var context = new AudioContext(),
    playStopButton = document.getElementById("playStopButton"),
    isPlaying = false,
    sound = new Audio("sound.wav"),
    source = context.createMediaElementSource(sound),
    gain = context.createGain();
    stereoPanner = context.createStereoPanner();
    delay = context.createDelay(4.0);

sound.loop = true;

source.connect(gain);
gain.connect(delay);
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

document.getElementById("gainSlider").addEventListener("input", function (e) {
    var gainValue = (this.value / 20);
    gain.gain.value = gainValue;
    document.getElementById("gainOuput").innerHTML = gainValue + " dB";
});

document.getElementById("panningSlider").addEventListener("input", function (e) {
    var panValue = (this.value - 50) / 50;
    stereoPanner.pan.value = panValue;
    document.getElementById("panningOuput").innerHTML = panValue + " LR";
});

document.getElementById("delaySlider").addEventListener("input", function (e) {
    var gainValue = (this.value / 25);
    delay.delayTime.value = delayValue;
    document.getElementById("delayOuput").innerHTML = delayValue + " sec";
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