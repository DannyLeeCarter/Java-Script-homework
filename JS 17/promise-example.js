//let promise1 = new Promise((resolve) => {
//    setTimeout(() => resolve('Hello'), 2000);
//  });
  
//  let promise2 = new Promise((resolve) => {
//    setTimeout(() => {
//        fetch('https://jsonplaceholder.typicode.com/posts/1')
//       .then(response => response.json())
//        .then(data => console.log(data))
//        .catch(error => console.error(error))
//    }, 2000);
//  });
let postPromise1 = fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());
let postPromise2 = fetch('https://jsonplaceholder.typicode.com/posts/2').then(response => response.json());
let postPromise3 = fetch('https://jsonplaceholder.typicode.com/posts/3').then(response => response.json());

Promise.all([postPromise1, postPromise2, postPromise3])
  .then(data => console.log(data))
  .catch(error => console.error(error));
