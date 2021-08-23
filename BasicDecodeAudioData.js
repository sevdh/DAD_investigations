let audioContext;
let bufferArray = [];
let time;
let scheduler;
let getBuffer = [0,0];
let index = 1;
let logging = true;
let gainNode = []

function loadAndPlayData(){
    if (audioContext === undefined || audioContext === null) {
        createWebAudioAPI();
    }
    loadSound(0);
    time = performance.now();
    mainLoopTimer = setTimeout(mainLoop, 100);
}

function createWebAudioAPI() {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext({ sampleRate: 44100 });
    if(logging) console.log(audioContext);
    gainNode[0] = audioContext.createGain();
    gainNode[0].gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode[0].connect(audioContext.destination)
    gainNode[1] = audioContext.createGain();
    gainNode[1].gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode[1].connect(audioContext.destination)
}

function mainLoop(){
    scheduler = performance.now() - time;
    mainLoopTimer = setTimeout(mainLoop, 100);
    if(scheduler > 4000 && !getBuffer[index])
    {
        getBuffer[index] = 1;
        if(logging) console.log("Load buffer " + index);
        loadSound(index);
    }
    if(scheduler > 11000){
        index = (index+1)%2;
        bufferArray[index].stop();
        if(logging) console.log("Stop buffer "+ index);
        getBuffer[index] = 0;
        time = performance.now();
    }
}

function stop(){
    clearTimeout(mainLoopTimer);
    try{
        bufferArray[0].stop();
        bufferArray[1].stop();
    }
    catch(e){

    }
    getBuffer = [0,0];
}