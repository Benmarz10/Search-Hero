// const encodedParams = new URLSearchParams();
// encodedParams.append("privateKey", "e0be486578d748d3413bbde846a19265cc745c2a");
// encodedParams.append("nameStartsWith", "Spider-Man");
// encodedParams.append("publicKey", "daa60ec964f3d078d4b5113c45d2896d");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '95ca73bdfamshb3559b4cafeb6c0p1be87ajsnd385a82867f4',
// 		'X-RapidAPI-Host': 'Marvelstefan-skliarovV1.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://marvelstefan-skliarovv1.p.rapidapi.com/getCharacters', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
	

var newButton = document.createElement("button");
newButton.textContent = "Hey!"
newButton.onclick = function() {
	fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=daa60ec964f3d078d4b5113c45d2896d")
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log("UGH FINALLY YAYY", data);
		})
}

document.body.append(newButton);