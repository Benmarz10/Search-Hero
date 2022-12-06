var newButton = document.createElement("button");
var characterSubmit = document.getElementById('submit');
var characterEnter = document.getElementById('userinput');

characterSubmit.addEventListener('click', function() {
	var enteredCharacter = characterEnter.value;
	console.log(enteredCharacter);
});

newButton.textContent = "Hey!"
newButton.onclick = function() {
	fetch("https://gateway.marvel.com/v1/public/characters?apikey=daa60ec964f3d078d4b5113c45d2896d")
	//http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log("UGH FINALLY YAYY", data);
		})
}

document.body.append(newButton);