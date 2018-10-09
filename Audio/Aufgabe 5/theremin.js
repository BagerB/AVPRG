var context = new AudioContext(),
    oscillator = null,
    mousedown = false,
    gainNode = context.createGain();

document.body.addEventListener('mousemove', function(e){
    if(mousedown) {
        calculateFrequencyandGain(e);
    }
});

document.body.addEventListener('mousedown', function(e){
        mousedown = true;

        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        calculateFrequencyandGain(e);

        oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function(e){
    mousedown = false;
    if(oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }   
});

function calculateFrequencyandGain(e) {
    var maxFrequency = 2000,
        minFrequency = 20,
        maxGain = 1,
        minGain = 0;

    oscillator.frequency.value = (((e.clientX / window.innerWidth) * maxFrequency) + minFrequency);
    gainNode.gain.value = (((e.clientY / window.innerHeight) * maxGain) + minGain);

    gainNode.gain.setTargetAtTime((((e.clientY / window.innerHeight) * maxGain) + minGain), context.currentTime, 0.01);
    oscillator.frequency.setTargetAtTime((((e.clientX / window.innerWidth) * maxFrequency) + minFrequency), context.currentTime, 0.01);

}


console.log(e.clientX);
console.log(e.clientY);

console.log(window.innerWidth);
console.log(window.innerHeight);