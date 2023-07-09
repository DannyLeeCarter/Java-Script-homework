// Retrieve the form and events container elements
const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Create a Leaflet map instance
const map = L.map('mapContainer').setView([0, 0], 2); // Set initial view coordinates and zoom level

// Add a tile layer to the map using your map provider's tile URL and API key
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'dannycarter/cljqgsdym005001r99gnc0qyd',
  accessToken: 'pk.eyJ1IjoiZGFubnljYXJ0ZXIiLCJhIjoiY2xqYnMyY3ZqMTU1ODNsdGh3Mmowb3NrciJ9.OIjBKO87tS3zmJx8sRlVBQ'
}).addTo(map);

// Function to create and append a button element
function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

// Function to geocode an address using Mapbox Geocoding API
async function geocodeAddress(address) {
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFubnljYXJ0ZXIiLCJhIjoiY2xqYnMyY3ZqMTU1ODNsdGh3Mmowb3NrciJ9.OIjBKO87tS3zmJx8sRlVBQ`;
  try {
    const response = await fetch(geocodingUrl);
    if (!response.ok) {
      throw new Error('Failed to retrieve coordinates for the provided address');
    }
    const data = await response.json();
    if (data.features.length === 0) {
      throw new Error('No results found for the provided address');
    }
    const coordinates = data.features[0].center;
    return { lat: coordinates[1], lng: coordinates[0] };
  } catch (error) {
    throw new Error(`Error occurred during geocoding: ${error.message}`);
  }
}

// Function to add a new event
async function addEvent(e) {
  e.preventDefault();

  // Retrieve the input values from the form
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventLocation = document.getElementById('eventLocation').value;
  const eventNotes = document.getElementById('eventNotes').value;

  try {
    // Geocode the event location to retrieve latitude and longitude
    const coordinates = await geocodeAddress(eventLocation);
    const event = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      notes: eventNotes,
      location: {
        lat: coordinates.lat,
        lng: coordinates.lng
      }
    };

    // Retrieve existing events from local storage
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Add the new event to the array
    events.push(event);

    // Store the updated events array in local storage
    localStorage.setItem('events', JSON.stringify(events));

    // Reset the form fields
    eventForm.reset();

    // Refresh the displayed events
    displayEvents();
  } catch (error) {
    console.error('Error occurred during geocoding:', error);
  }
}

// Function to display the events
function displayEvents() {
  // Retrieve events from local storage
  const events = JSON.parse(localStorage.getItem('events')) || [];

  // Clear the events container
  eventsContainer.innerHTML = '';

  // Iterate over the events and create HTML elements for each
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    // Create and append elements for event details
    const eventName = document.createElement('h2');
    eventName.textContent = event.name;
    eventCard.appendChild(eventName);

    const eventDate = document.createElement('p');
    eventDate.textContent = `Date: ${event.date}`;
    eventCard.appendChild(eventDate);

    const eventTime = document.createElement('p');
    eventTime.textContent = `Time: ${event.time}`;
    eventCard.appendChild(eventTime);

    const eventLocation = document.createElement('p');
    eventLocation.textContent = `Location: ${event.location.lat}, ${event.location.lng}`;
    eventCard.appendChild(eventLocation);

    const eventNotes = document.createElement('p');
    eventNotes.textContent = `Notes: ${event.notes}`;
    eventCard.appendChild(eventNotes);

    // Append the event card to the events container
    eventsContainer.appendChild(eventCard);
  });
}

// Function to edit an event
function editEvent(event) {
}

// Function to delete an event
function deleteEvent(event) {
}

// Function to search for events
function searchEvents() {
}

// Add event listener for form submission
eventForm.addEventListener('submit', addEvent);

// Add event listener for search button
searchButton.addEventListener('click', searchEvents);

// Call the displayEvents function to show the initial events
displayEvents();

