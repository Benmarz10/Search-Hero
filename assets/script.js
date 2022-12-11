var userCharacter = $('#marvel-input');
var savedContainer = $('#saved-container');
var searchBlock = $('#search-block');
var currentDisplay = $('#current-character');
var saveCharacterBtn = $('#save-character');
var moreInfoBtn = $('#more-info');
var submitButton = $('#search-modal');
var searchedCharactersName = $("#searched-character");
var characterName = $("#characterName");
var characterDescription = $("#description");
var wikiURLS = $('#wikiUrl-container');
var backButton = $('#back');

var savedCharactersList = [];

// submit button for user input funs fetch on marval api
submitButton.on('click', loadInfo);

// Get marvel character from user input
function loadInfo(){
  backButton.attr("class", "is-hidden");
  var userInput = userCharacter.val();
  getMarvelCharacter(userInput);
}

// Get and fetch marvel character from API and whatever attributes
function getMarvelCharacter(userInput) {
  fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + userInput + "&ts=2020&apikey=daa60ec964f3d078d4b5113c45d2896d&hash=52fc47dbf8836a109cb6aba3f7d1d792")
  .then(function (response) {
    return response.json();
  })
  .then(function (characterInfo) {
    //Checks to see if Marvel has this character if not prompts user
      if (characterInfo.data.total === 0) {
        enterVaildCharacter();
      } else {
        // Sets content in character display modal
        $("#hide").removeClass("is-hidden");
        backButton.attr("class", "is-hidden");
        characterName.text(characterInfo.data.results[0].name);
        characterDescription.text(characterInfo.data.results[0].description);
        $("#icon").attr("src", characterInfo.data.results[0].thumbnail.path + "/portrait_xlarge.jpg");

      }
      console.log(characterInfo);
    })
}

// Get API with more info on WIKI or something
function getWikiAPI(characterSearch){
    var limit = 5;
    fetch("https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json"+
    "&prop=info|extracts&inprop=url&generator=search&gsrnamespace=0&gsrlimit="+limit+"&gsrsearch="+characterSearch)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (var i in data.query.pages) {
            console.log(data.query.pages[i].canonicalurl);
        }
        displayWikiURLS(data);
    });
}

// Button for more information
moreInfoBtn.on("click", getMoreInfo)

// Takes user input to search Wiki API
function getMoreInfo() {
  var search = userCharacter.val();
  console.log(search);
  getWikiAPI(search);
}

// Display urls and titles based on searched character data
function displayWikiURLS(data){
  $("#hide").attr("class", "is-hidden");
  characterName.text("");
  
    for(i in data.query.pages){
        // Create a div for the url info
        var wikiUrl = $('<div>');
        // console.log(data.query.pages[i].canonicalurl);

        var title = $('<h3>');
        title.text(data.query.pages[i].title);

        var urlLink = $('<a>');
        urlLink.text(data.query.pages[i].canonicalurl);
        urlLink.attr('href', data.query.pages[i].canonicalurl);
        urlLink.attr('target', "_blank");

        wikiUrl.append(title,urlLink);
        // Append the div for the url info to containe
        //wikiURLS.append(wikiUrl);
        characterName.append(wikiUrl);
      }
      backButton.removeClass("is-hidden").addClass("button is-info");;
}


function handleSaveBtn() {

    var savedCharacter = characterName.text();
    // Check to see if this character is already saved
    if(savedCharactersList.includes(savedCharacter) || !characterName.text()){

        return;
    }

    console.log(savedCharacter);
    savedCharactersList.push(savedCharacter);

    localStorage.setItem("savedList", JSON.stringify(savedCharactersList));




    // Empty out the container then render it again
    savedContainer.empty();
    renderSavedCharacters();
}

saveCharacterBtn.on('click',handleSaveBtn);
console.log(localStorage.getItem("savedList"));


function handleClearBtn(event) {
  // Clear local storage and list if needed
}

// This function is being called below and will render saved characters when the page loads.
function init() {
    // Get stored City from localStorage
    var storedCharacters = JSON.parse(localStorage.getItem("savedList"));
    console.log(storedCharacters);
  
    // If there are savedCharacters in localStorage, update the savedCharacterList array
    if (storedCharacters !== null) {
      savedCharactersList = storedCharacters;
    }
  
    // This is a helper function that will render City to the DOM
    renderSavedCharacters();
}
init();

// The following function renders items in a saved list as elements
function renderSavedCharacters() {

    savedContainer.innerHTML = "";
  
    // Render a new button for each saved character on init
    for (var i = 0; i < savedCharactersList.length; i++) {
      var character = savedCharactersList[i];
  
      var characterName = $('<p>');
      characterName.text(character); 
  
      
      savedContainer.append(characterName);
    }
  }

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
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .is-success') || []).forEach(($close) => {
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

$(document).ready(function () {
  $('.filter-menu').on('click', '#dropdown', event => {
    event.preventDefault();
    console.log('dropdown menu option clicked!');

    var value = $(this).val(); // Here to get value
    if (value === 1) {
      const bookmarks = STORE.list.filter(bookmark => bookmark.rating >= 1);
      return bookmarks;
    }
    renderStore();
  });
});

// If an invalid character is entered prompt to enter a valid one.
function enterVaildCharacter() {
  $("#hide").attr("class", "is-hidden");
  characterName.text("Please enter a valid Marvel character");
}

backButton.on("click", loadInfo);