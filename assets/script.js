var userCharacter = $('#marvel-input');
var characterList = $('#character-list');
var searchBlock = $('#search-block');
var currentDisplay = $('#current-character');
var saveCharacterBtn = $('#save-character');
var moreInfoBtn = $('#more-info');
var submitButton = $('#submit');

var ts = Date.now();
var publicKey = 'daa60ec964f3d078d4b5113c45d2896d';
var privateKey = 'e0be486578d748d3413bbde846a19265cc745c2a'
var hash = ts + privateKey + publicKey;
const realhash = hashCode(hash);

console.log(realhash);
console.log(ts);
console.log(hash);

var savedCharactersList = {};

submitButton.on('click', function () {
	var userInput = userCharacter.val();
	getMarvelCharacter(userInput);
	console.log(userInput);

});


// Get marvel character from user input
function getMarvelCharacter(userInput) {
	fetch("https://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey=daa60ec964f3d078d4b5113c45d2896d&hash="+realhash)
	//?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log("UGH FINALLY", data);
		})
	}

	// Get API with more info on WIKI or something
	function getMoreInfo(input) {

	}

	// Get and fetch marvel character from API and whatever attributes
	function displayMarvelCharacter(data) {
		// Get data and append it to container
	}

	function handleSearchBtn(event) {
		// Set local storage with click
	}

	function handleMoreInfoBtn(event) {
		// Fetch more infor when clicked
	}

	function handleClearBtn(event) {
		// Clear local storage and list if needed
	}

	//search.addEventListener('click', handleSearchBtn);
	//document.body.append(newButton);

function hashCode(string) {
		var hash = 0,
		  i, chr;
		if (string.length === 0) return hash;
		for (i = 0; i < string.length; i++) {
		  chr = string.charCodeAt(i);
		  hash = ((hash << 5) - hash) + chr;
		  hash |= 0; // Convert to 32bit integer
		}
		return hash;
	  }