const getDataButton = document.getElementById("get-data-button");
const dataContainer = document.getElementById("data-container");

getDataButton.addEventListener("click", () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        let postData = document.createElement('div');
        postData.innerHTML = `<h2>${post.title}</h2> <p>${post.body}</p>`;
        dataContainer.appendChild(postData);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
