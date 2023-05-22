// Function to convert the entered string to uppercase
function convertToUppercase() {
    let input = document.getElementById('inputString').value;
    let result = input.toUpperCase();
    document.getElementById('result').value = result;
  }
  
  // Function to convert the entered string to lowercase
  function convertToLowercase() {
    let input = document.getElementById('inputString').value;
    let result = input.toLowerCase();
    document.getElementById('result').value = result;
  }
  
  // Function to remove whitespace from both ends of the entered string
  function trimString() {
    let input = document.getElementById('inputString').value;
    let result = input.trim();
    document.getElementById('result').value = result;
  }
  
  // Function to reverse the entered string
  function reverseString() {
    let input = document.getElementById('inputString').value;
    let result = input.split('').reverse().join('');
    document.getElementById('result').value = result;
  }
  
  // Function to count the number of characters in the entered string
  function countCharacters() {
    let input = document.getElementById('inputString').value;
    let result = input.length;
    document.getElementById('result').value = result;
  }
  
  // Function to reset the input and result fields
  function resetFields() {
    document.getElementById('inputString').value = '';
    document.getElementById('result').value = '';
  }
  