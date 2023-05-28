// Define the RockBand class
class RockBand {
    constructor(name, members, genre) {
      this.name = name;
      this.members = members;
      this.genre = genre;
    }
  
    // Add the display method to the class
    display() {
      console.log(`${this.name} is a ${this.genre} band, with members ${this.members}`);
    }
  }
  
  // Create instances of the RockBand class and call methods
  let metallica = new RockBand("Metallica", ["James Hetfield", "Lars Ulrich", "Kirk Hammett", "Robert Trujillo"], "Heavy Metal");
  metallica.display(); // Metallica is a Heavy Metal band, with members James Hetfield, Lars Ulrich, Kirk Hammett, Robert Trujillo.
  
  let pinkFloyd = new RockBand("Pink Floyd", ["David Gilmour", "Roger Waters", "Nick Mason", "Richard Wright"], "Progressive Rock");
  let ledZeppelin = new RockBand("Led Zeppelin", ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"], "Hard Rock");
  let theCure = new RockBand("The Cure", ["Robert Smith", "Simon Gallup", "Roger O'Donnell", "Jason Cooper", "Reeves Gabrels"], "Gothic Rock");
  let flockOfSeagulls = new RockBand("A Flock Of Seagulls", ["Mike Score", "Paul Reynolds", "Frank Maudsley", "Ali Score"], "New Wave");
  let tearsForFears = new RockBand("Tears for Fears", ["Roland Orzabal", "Curt Smith"], "New Wave");
  let aliceInChains = new RockBand("Alice in Chains", ["Jerry Cantrell", "Sean Kinney", "Mike Inez", "William DuVall"], "Grunge");
  let tool = new RockBand("Tool", ["Maynard James Keenan", "Adam Jones", "Justin Chancellor", "Danny Carey"], "Progressive Metal");
  
  pinkFloyd.display();
  ledZeppelin.display();
  theCure.display();
  flockOfSeagulls.display();
  tearsForFears.display();
  aliceInChains.display();
  tool.display();
  
  // Display the bands on the webpage
  function displayBands() {
    let bandsDiv = document.getElementById("bands");
  
    // Create band info elements and append them to the bandsDiv
    function createBandInfo(name, members, genre) {
      let bandInfo = document.createElement("div");
      bandInfo.classList.add("band-info");
      bandInfo.innerHTML = `<h2>${name}</h2>
                            <p><strong>Genre:</strong> ${genre}</p>
                            <p><strong>Members:</strong> ${members.join(", ")}</p>`;
      bandsDiv.appendChild(bandInfo);
    }
  
    // Call createBandInfo for each rock band
    createBandInfo(metallica.name, metallica.members, metallica.genre);
    createBandInfo(pinkFloyd.name, pinkFloyd.members, pinkFloyd.genre);
    createBandInfo(ledZeppelin.name, ledZeppelin.members, ledZeppelin.genre);
    createBandInfo(theCure.name, theCure.members, theCure.genre);
    createBandInfo(flockOfSeagulls.name, flockOfSeagulls.members, flockOfSeagulls.genre);
    createBandInfo(tearsForFears.name, tearsForFears.members, tearsForFears.genre);
    createBandInfo(aliceInChains.name, aliceInChains.members, aliceInChains.genre);
    createBandInfo(tool.name, tool.members, tool.genre);
  }
  
  displayBands();
  