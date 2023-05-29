const apiKey = '7fee790c';
    const form = document.getElementById('search-form');
    const moviesList = document.getElementById('movies-list');
    const loadingIndicator = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const movieTitle = document.getElementById('movie-title').value;
      moviesList.innerHTML = '';
      loadingIndicator.style.display = 'block';

        try {
            // Make an API request to retrieve movie search results
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            // Display movie search results
          data.Search.forEach(movie => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>IMDb Rating: ${movie.imdbRating}</p>
            </div>
              <img src="${movie.Poster}" alt="Poster">
            `;
            moviesList.appendChild(li);
          });
        } else {
            // Throw an error if API response fails
            throw new Error(data.Error);
          }
        } catch (error) {
          console.error(error.message);
           // Display error message in the moviesList
          moviesList.innerHTML = `<li>${error.message}</li>`;
        } finally {
            // Hide the loading indicator
          loadingIndicator.style.display = 'none';
        }
      });