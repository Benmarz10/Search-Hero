var userCharacter = $('#marvel-input');
var characterList = $('#character-list');
var searchBlock = $('#search-block');
var currentDisplay = $('#current-character');
var saveCharacterBtn = $('#save-character');
var moreInfoBtn = $('#more-info');
var submitButton = $('#submit'); 

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
			console.log("UGH FINALLY", data);
		})
}

// Get marvel character from user input
function getMarvelCharacter(userInput){
    fetch()
}

// Get API with more info on WIKI or something
function getMoreInfo(input){

}

// Get and fetch marvel character from API and whatever attributes
function displayMarvelCharacter(data){
    // Get data and append it to container
}

function handleSearchBtn(event){
    // Set local storage with click
}

function handleMoreInfoBtn(event){
    // Fetch more infor when clicked
}

function handleClearBtn(event){
    // Clear local storage and list if needed
}

search.addEventListener('click',handleSearchBtn);
document.body.append(newButton);