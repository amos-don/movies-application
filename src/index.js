// /**
//  * es6 modules and imports
//  */
// import sayHello from './hello';
// sayHello('World');
// /**
//  * require style imports
//  */
// const $ = require('jquery');
// const {getMovies} = require('./api.js');
// let moviesID = [];
//
// function runMovie() {
//
//
//     getMovies().then((movies) => {
//         $('#loading').hide();
//         console.log('Here are all the movies:');
//         $('#movieList').html("");
//         movies.forEach(({title, rating, id}) => {
//             console.log(`id#${id} - ${title} - rating: ${rating}`);
//             let catchID = id;
//             moviesID += id +' ';
//             console.log(moviesID);
//
//                 $('#movieList').append(`<div id = ${id}><p><strong>Title #${id}:</strong> ${title} </p>
//       <strong>Rating:</strong> ${rating}<br>
// `);
//         },
//         $('#editMovie').html(`Select Movie Number to Edit <br>
//         <input id="inputID" type="number" min="1" max="${movies.length}" value="1">
//         <br>Title<br><input type="text" id="editTitle" name="title">
//         <br>Rating<br><input id="editRating" type="number" name="rating" min="1" max="5" value="1">
//         <br><button id="editBtn">Edit</button><br><br>
// `),
//             $('#deleteMovie').html(`Select Movie to Delete(By Number)<br>
//         <input id="deleteID" type="number" min="1" max="${movies.length}" value="1">
//         <br><button id="deleteBtn">Delete</button>
// `),
//             $('#editBtn').click(e => {
//                 e.preventDefault();
//                 let editTitle = $('#editTitle').val();
//                 let editRating = $('#editRating').val();
//                 let selectedID = $('#inputID').val();
//
//                 let editMovie ={ "title": editTitle, "rating": editRating};
//
//                 const edit = {
//                     method: 'PUT',
//                     headers: {
//                         'Content-type': 'application/json',
//                     },
//                     body: JSON.stringify(editMovie),
//                 };
//                 fetch(`/api/movies/${selectedID}`,edit)
//                     .then(runMovie)
//                     .catch();
//             }),
//
//         $('#deleteBtn').click(e => {
//             e.preventDefault();
//             let selectedID = $('#deleteID').val();
//
//             const edit = {
//                 method: 'Delete',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify(editMovie),
//             };
//             fetch(`/api/movies/${selectedID}`,edit)
//                 .then(runMovie)
//                 .catch();
//         })
//
//         );
//     }).catch((error) => {
//         alert('Oh no! Something went wrong.\nCheck the console for details.');
//          console.log(error);
//
//
//     });
// }
// runMovie();
//
// $('#submit').click( e => {
//   e.preventDefault();
//
//   let title = $('#movieTitle').val();
//   let rating = $('#rates').val();
//
//   $.post("./api/movies", {
//     title: title,
//     rating: rating
//   });
//     runMovie();
//
// });
//


const $ = require('jquery');
const {getMovies} = require('./api.js');
let moviesID = [];
let selectID = '';

function runMovie() {
    getMovies().then( (movies) => {
        movies.forEach(({title, rating, id}) => {
            $('#movieList').append(`<div id = ${id}><p><strong>Title #${id}:</strong> ${title} </p><strong>Rating:</strong> ${rating}<br>`);
            moviesID += id +' ';
            selectID += `<option value = ${id}> ${id} </option>`;
        });

        console.log(selectID);

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);


    });
}

runMovie();