// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the input values from the form
    const noun = document.getElementById('noun').value;
    const verb = document.getElementById('verb').value;
    const adjective = document.getElementById('adjective').value;
  
    // Create the story using a template literal
    const story = `Once upon a time, there was an ${adjective} ${noun} who loved ${verb}.`;
  
    // Display the story on the page
    displayStory(story);
  }
  
  // Function to display the story in a modal
  function displayStory(story) {
    // Get the modal and story text elements
    const modal = document.getElementById('storyModal');
    const storyText = document.getElementById('storyText');
  
    // Set the story text
    storyText.textContent = story;
  
    // Display the modal
    modal.style.display = 'block';
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('storyModal');
    modal.style.display = 'none';
  }
  
  // Event listener for form submission
  const form = document.getElementById('madLibsForm');
  form.addEventListener('submit', handleSubmit);
  
  // Event listener for modal close button
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.addEventListener('click', closeModal);
  