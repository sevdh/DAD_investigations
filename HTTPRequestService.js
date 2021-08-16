function loadSound(playerIndex) {
	document.getElementById("xhr").style.display = "block";
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "https://www.evdh.net/tones/noise1.mp3", true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		document.getElementById("xhr").style.display = "none";
		setTimeout( function() {
		document.getElementById("decode").style.display = "block";
		audioContext.decodeAudioData(getSound.response, function (buffer) {
			document.getElementById("decode").style.display = "none";
            setTimeout( function () {loadSampleInBufferAndPlay(buffer, playerIndex);}, 2000);
		});
		}, 2000);
	};
	getSound.send(); // Send the Request and Load the File
}

function loadSampleInBufferAndPlay(buffer, playerIndex){
	document.getElementById("buffer").style.display = "block";
	let playSound = audioContext.createBufferSource(); // Declare a New Sound
    playSound.connect(audioContext.destination);
	playSound.buffer = buffer; // Attatch our Audio Data as it's Buffer
	bufferArray[playerIndex] = playSound; //Put the buffer in buffersArray
    bufferArray[playerIndex].start();
	setTimeout( function () {document.getElementById("buffer").style.display = "none"}, 50);
    if(logging) console.log("Start buffer " + playerIndex);
}