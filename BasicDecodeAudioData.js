let audioContext;

function loadAndPlayData(){
    console.log("YEAAH");
}

function createWebAudioAPI() {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext({ sampleRate: 44100 });
    silence.play();
    if (verboseFlagAPI) {
        console.log("API HAS BEEN MADE");
        console.log(audioContext);
    }
}