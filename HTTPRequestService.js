function loadSound(playerIndex) {
	document.getElementById("xhr").style.display = "block";
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	let url;
	if (playerIndex){
		url = "https://www.evdh.net/tones/2006-03-27T04.flac";
	}
	else {
		url = "https://www.evdh.net/tones/2006-03-27T00.flac";
	}
	getSound.open("GET", url, true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		document.getElementById("xhr").style.display = "none";
		setTimeout( function() {
		document.getElementById("decode").style.display = "block";
		audioContext.decodeAudioData(getSound.response, function (buffer) {
			document.getElementById("decode").style.display = "none";
            setTimeout( function () {loadSampleInBufferAndPlay(buffer, playerIndex);}, 1500);
		});
		}, 1500);
	};
	getSound.send(); // Send the Request and Load the File
}

function loadSampleInBufferAndPlay(buffer, playerIndex){
	document.getElementById("buffer").style.display = "block";
	let playSound = audioContext.createBufferSource(); // Declare a New Sound
    playSound.connect(gainNode[playerIndex]);
	playSound.buffer = buffer; // Attatch our Audio Data as it's Buffer
	bufferArray[playerIndex] = playSound; //Put the buffer in buffersArray
	setTimeout( function () {document.getElementById("buffer").style.display = "none"}, 50);
	setTimeout( function () {
		document.getElementById("start").style.display = "block";
		if(logging) console.log("Start buffer " + playerIndex);
		bufferArray[playerIndex].start();
		setTimeout( function () {document.getElementById("start").style.display = "none"}, 50);
	}, 1500);
}