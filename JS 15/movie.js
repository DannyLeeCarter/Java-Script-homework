let moviesList = document.getElementById('movies-list');
let searchInput = document.getElementById('search-input');

fetch('movies.json')
  .then(response => response.json())
  .then(movies => {
    //a listener for the search bar
    searchInput.addEventListener('input', event => {
      //extract the value of the search input field,convert the value to lowercase so that the search is case-insensitive
      const searchString = event.target.value.toLowerCase();
      //filter the movie data based on the search input
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchString)
      //call for the filtered movie data
      );
      displayMovies(filteredMovies, searchString);
    });
  })
  .catch(error => console.error(error));
    //takes an array of movie objects to create a new list
function displayMovies(movies, searchString) {
  moviesList.innerHTML = '';
    //display the movies if the searchString has a length greater than zero
  if (searchString && searchString.length > 0) {
    //iterate over the array of movies and create a new list
    movies.forEach(movie => {
      let movieElement = document.createElement('li');
      movieElement.innerHTML = `<strong>${movie.title}</strong><br>
        Director: ${movie.director}<br>
        Release date: ${movie.release_date}<br>`;
        //append the list to the moviesList
      moviesList.appendChild(movieElement);
    });
  }
}

