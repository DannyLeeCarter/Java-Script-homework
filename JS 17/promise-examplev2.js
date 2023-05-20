// check first if the necessary fetch-related classes are available in the browser, If any of them are missing, an error message is logged to the console.
if (window.Headers && window.Request && window.Response && window.fetch) {
    let postPromise1 = fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => console.error(error));
    // for each fetch request, added error handling
    let postPromise2 = fetch('https://jsonplaceholder.typicode.com/posts/2')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => console.error(error));
  
    let postPromise3 = fetch('https://jsonplaceholder.typicode.com/posts/3')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => console.error(error));
  
    Promise.all([postPromise1, postPromise2, postPromise3])
      .then(data => {
        // display the data in HTML page
        const resultContainer = document.getElementById('result-container');
        data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.textContent = `Post ${post.id}: ${post.title}`;
          resultContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error(error));
  } else {
    console.error('Fetch is not supported in this browser');
  }
  