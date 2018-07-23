const $ = require('jquery');
const {getMovies} = require('./api.js');
let selectID = '';
runMovie();

function runMovie() {
    $('#movieList').html('');
    selectID = '';

    /* This generate the content of the movie list */
    getMovies().then( (movies) => {
        loading();
        movies.forEach(({title, rating, id}) => {
            $('#movieList').append(`<div id = ${id}><p><strong>Title #${id}:</strong> ${title} </p><strong>Rating:</strong> ${rating}<br>`);
            selectID += `<option value = ${id}> ${id}: ${title} </option>`;
        });

        $('#addMovie').html(`<form id="addMovie" method="post" action="/api/movies">Movie Title: <br><input type="text" id="movieTitle" name="title"><br>Movie Rating: <br><input id="rates" type="number" name="rating" min="1" max="5" value="1"></form><button id="submit">Submit</button>`);

        $('#editMovie').html(`Select the movie ID to edit: <br> <select id="editID"> ${selectID} </select> <br>Edit the Movie Title: <input type="text" id="editTitle" name="title"> <br>Edit the Movie Rating:<input id="editRating" type="number" name="rating" min="1" max="5" value="1"><br><button id="editBtn">Edit</button>`);

        $('#deleteMovie').html(`Select Movie to Delete(By Number)<br><select id="deleteID"> ${selectID} </select><br><button id="deleteBtn">Delete</button>`);

    })
    /* This adds the functionality of the forms after the forms are generated. */
        .then( ()=>{
            $('#editBtn').click(e => {
                loading();
                e.preventDefault();
                let editTitle = $('#editTitle').val();
                let editRating = $('#editRating').val();
                let selectedID = $('#editID').val();

                let editMovie ={ "title": editTitle, "rating": editRating};

                const edit = {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(editMovie),
                };
                fetch(`/api/movies/${selectedID}`,edit)
                    .then(runMovie)
                    .catch();
            });

            $('#submit').click( e => {
                loading();
                e.preventDefault();

                let title = $('#movieTitle').val();
                let rating = $('#rates').val();

                $.post("./api/movies", {
                    title: title,
                    rating: rating
                });
                runMovie();
            });

            $('#deleteBtn').click(e => {
                loading();
                e.preventDefault();
                let selectedID = $('#deleteID').val();

                const edit = {
                    method: 'Delete',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(editMovie),
                };
                fetch(`/api/movies/${selectedID}`,edit)
                    .then(runMovie)
                    .catch();
            });

        })
        .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);

    });
}

function loading(){
    $('.container').toggleClass('invisible');
}