var userCharacter = $('#marvel-input');
var characterList = $('#character-list');
var searchBlock = $('#search-block');
var currentDisplay = $('#current-character');
var saveCharacterBtn = $('#save-character');
var moreInfoBtn = $('#more-info');
var submitButton = $('#search-modal');
var searchedCharactersName = $("#searched-character");
var characterName = $("#characterName");
var characterDescription = $("#description");
var wikiURLS = $('#wikiUrl-container');

var savedCharactersList = {};

// submit button for user input funs fetch on marval api
submitButton.on('click', function () {
  var userInput = userCharacter.val();
  getMarvelCharacter(userInput);
  console.log(userInput);
});

// Get marvel character from user input
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

moreInfoBtn.on("click", getMoreInfo)

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
}
// Get and fetch marvel character from API and whatever attributes
// Get data and append it to container
saveCharacterBtn.on('click', saveCharacter)
function saveCharacter() {
  var savelist = $("<li></li>").text(userCharacter.val())
  $('ul').append(savelist)
  console.log(saveCharacter);
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
  characterName.text("Please enter a vailid Marval character");
}