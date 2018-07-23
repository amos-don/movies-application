const $ = require('jquery');
const {getMovies} = require('./api.js');
let moviesID = [];
let selectID = '';

function runMovie() {
    getMovies().then( (movies) => {
        movies.forEach(({title, rating, id}) => {
            $('#movieList').append(`<div id = ${id}><p><strong>Title #${id}:</strong> ${title} </p><strong>Rating:</strong> ${rating}<br>`);
            selectID += `<option value = ${id}> ${id} </option>`;
            moviesID += id +' ';
        });
        console.log(selectID);

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);


    });
}