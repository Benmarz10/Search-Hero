var userCharacter = $('#marvel-input');
var characterList = $('#character-list');
var searchBlock = $('#search-block');
var currentDisplay = $('#current-character');
var saveCharacterBtn = $('#save-character');
var moreInfoBtn = $('#more-info');
var submitButton = $('#search-modal');
var searchedCharactersName = $("#searched-character");
var charcterDiplayBox = $("#character-display")

var savedCharactersList = {};

submitButton.on('click', function () {
	var userInput = userCharacter.val();
	getMarvelCharacter(userInput);
	console.log(userInput);

});

// Get marvel character from user input
function getMarvelCharacter(userInput) {
	fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + userInput + "&ts=2020&apikey=daa60ec964f3d078d4b5113c45d2896d&hash=52fc47dbf8836a109cb6aba3f7d1d792")
	//&ts=2020&apikey=<API_KEY>&hash=35194bc0e16921b8664b670b6ea93832
		.then(function (response) {
			if (response.status === 404) {
				enterVaildCharacter();
			} else {
			return response.json();
			}
		})
		.then(function (data) {
			if (data.data.results.length === 0) {
				enterVaildCharacter();
			}
			console.log(data);
		})
}

//new var characterInfo created in here
submitButton.on('click', function () {
    var userInput = userCharacter.val();
  //   getMarvelCharacter(userInput);
    console.log(userInput);
  
    fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + userInput + "&apikey=daa60ec964f3d078d4b5113c45d2896d")
      .then(response => response.json())
      .then(characterInfo => {
        console.log(characterInfo)
  
        document.querySelector('#characterName').innerHTML = characterInfo.data.results[0].name;
        document.querySelector('#description').innerHTML = characterInfo.data.results[0].description;
        document.querySelector('#icon').innerHTML = characterInfo.data.results[0].thumbnail;
  
      });
  })


// Get API with more info on WIKI or something
function getWikiAPI(characterSearch){
    fetch("https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json"+
    "&prop=info|extracts&inprop=url&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch="+characterSearch)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (var i in data.query.pages) {
            console.log(data.query.pages[i].title);
        }
    });
}

getWikiAPI('Thor');
// Get and fetch marvel character from API and whatever attributes
// Get data and append it to container
//new var characterInfo created in here
function displayMarvelCharacter(userInput) {
  fetch ("https://gateway.marvel.com:443/v1/public/characters?name=" + userInput + "&apikey=daa60ec964f3d078d4b5113c45d2896d")
	.then(response => response.json())
  .then(characterInfo => {
console.log(characterInfo)

document.querySelector('#characterName').innerHTML = characterInfo.data.results[0].name;
  })
 
              

}

function handleSaveBtn(event) {
	// Set local storage with click
    var target = event.target;
    var savedCharacter = target.innerHTML;

    

}

function handleMoreInfoBtn(event) {
	// Fetch more infor when clicked
}

function handleClearBtn(event) {
	// Clear local storage and list if needed
}

//	//search.addEventListener('click', handleSearchBtn);
//	//document.body.append(newButton);


//Testing Modal functions
document.addEventListener('DOMContentLoaded', () => {
	// Functions to open and close a modal
	function openModal($el) {
		$el.classList.add('is-active');
	}

	function closeModal($el) {
		$el.classList.remove('is-active');
	}

	function closeAllModals() {
		(document.querySelectorAll('.modal') || []).forEach(($modal) => {
			closeModal($modal);
		});
	}

	// Add a click event on buttons to open a specific modal
	(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
		const modal = $trigger.dataset.target;
		const $target = document.getElementById(modal);

		$trigger.addEventListener('click', () => {
			openModal($target);
		});
	});

	// Add a click event on various child elements to close the parent modal
	(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
		const $target = $close.closest('.modal');

		$close.addEventListener('click', () => {
			closeModal($target);
		});
	});

	// Add a keyboard event to close all modals
	document.addEventListener('keydown', (event) => {
		const e = event || window.event;

		if (e.keyCode === 27) { // Escape key
			closeAllModals();
		}
	});
});

$(document).ready(function() {
	$('.filter-menu').on('click', '#dropdown', event => {
	  event.preventDefault();
	  console.log('dropdown menu option clicked!');
  
	  var value = $(this).val(); // Here to get value
	  if (value === 1){
		const bookmarks = STORE.list.filter(bookmark => bookmark.rating >= 1);
		return bookmarks;
	  }
	  renderStore();
	});
  });

  function enterVaildCharacter() {
	charcterDiplayBox.empty();
	userCharacter.empty();
	charcterDiplayBox.append($("<h1></h1>").text("Please enter a vailid Marval character"));

}