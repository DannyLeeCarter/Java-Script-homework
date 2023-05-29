

const redBox = document.getElementById("red");
const blueBox = document.getElementById("blue");
const switchButton = document.getElementById("switch-btn");

switchButton.addEventListener("click", () => {
  // Store the current background color of the red box
 const currentRedColor = redBox.style.backgroundColor;

  // Set the background color of the red box to the current background color of the blue box
redBox.style.backgroundColor = blueBox.style.backgroundColor;

  // Set the background color of the blue box to the stored current background color of the red box
blueBox.style.backgroundColor = currentRedColor;
});

// Change the background color of the clicked box
redBox.addEventListener("click", () => {
  const randomNum = Math.round(Math.random() * 255);
  const color = `rgb(${randomNum}, 0, 0)`;
  redBox.style.backgroundColor = color;
});

blueBox.addEventListener("click", () => {
  const randomNum = Math.round(Math.random() * 255);
  const color = `rgb(0, 0, ${randomNum})`;
  blueBox.style.backgroundColor = color;
});
