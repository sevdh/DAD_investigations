function loadSound(playerIndex) {
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "https://www.evdh.net/tones/noise1.mp3", true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		audioContext.decodeAudioData(getSound.response, function (buffer) {
            loadSampleInBufferAndPlay(buffer, playerIndex);
		});
	};
	getSound.send(); // Send the Request and Load the File
}

function loadSampleInBufferAndPlay(buffer, playerIndex){
	let playSound = audioContext.createBufferSource(); // Declare a New Sound
    playSound.connect(audioContext.destination);
	playSound.buffer = buffer; // Attatch our Audio Data as it's Buffer
	bufferArray[playerIndex] = playSound; //Put the buffer in buffersArray
    bufferArray[playerIndex].start();
    if(logging) console.log("Start buffer " + playerIndex);
}