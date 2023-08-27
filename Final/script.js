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
function createButton(text, clickHandler, parentElement) {
  if (typeof text !== 'string' || typeof clickHandler !== 'function') {
    throw new Error('Invalid arguments: text must be a string and clickHandler must be a function');
  }
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  if (parentElement) {
    parentElement.appendChild(button);
  }
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
    return {
      lat: coordinates[1],
      lng: coordinates[0],
      address: data.features[0].place_name
    };
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
    // Geocode the event location to retrieve latitude, longitude, and address
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

// Function to create event markers on the map
function createEventMarker(event) {
  const marker = L.marker([event.location.lat, event.location.lng]).addTo(map);
  marker.bindPopup(event.name).openPopup(); // Add a popup with the event name and open it by default
}

// Function to display the events
async function displayEvents() {
  // Retrieve events from local storage
  const events = JSON.parse(localStorage.getItem('events')) || [];

  // Clear the events container
  eventsContainer.innerHTML = '';

  // Iterate over the events and create HTML elements for each
  for (const event of events) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    // Create and append elements for event details
    const eventName = document.createElement('h2');
    eventName.textContent = event.name;
    eventCard.appendChild(eventName);

    const eventDate = document.createElement('p');
    eventDate.textContent = `Date: ${event.date}`;
    eventCard.appendChild(eventDate);

   
    // Convert time to AM/PM format
    const eventTime = document.createElement('p');
    const timeParts = event.time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    eventTime.textContent = `Time: ${formattedHours}:${minutes} ${amPm}`;
    eventCard.appendChild(eventTime);

    // Geocode the event location to retrieve the address
    try {
      const address = await getAddressFromCoordinates(event.location.lat, event.location.lng);
      const eventLocation = document.createElement('p');
      eventLocation.textContent = `Location: ${address}`;
      eventCard.appendChild(eventLocation);
    } catch (error) {
      console.error('Error occurred during reverse geocoding:', error);
    }

    const eventNotes = document.createElement('p');
    eventNotes.textContent = `Notes: ${event.notes}`;
    eventCard.appendChild(eventNotes);

    // Create edit and delete buttons
    const editButton = createButton('Edit', () => editEvent(event, eventCard), eventCard);
    const deleteButton = createButton('Delete', () => deleteEvent(event), eventCard);

    // Append the event card to the events container
    eventsContainer.appendChild(eventCard);

    // Create markers on the map for each event
    createEventMarker(event);
  }
}

// Function to get address from coordinates using geocodeAddress function
async function getAddressFromCoordinates(lat, lng) {
  try {
    const response = await geocodeAddress(`${lng},${lat}`);
    return response.address;
  } catch (error) {
    throw new Error(`Error occurred during reverse geocoding: ${error.message}`);
  }
}

// Function to edit an event
async function editEvent(event, eventCard) {
  // Retrieve the input fields from the form
  const eventNameField = document.getElementById('eventName');
  const eventDateField = document.getElementById('eventDate');
  const eventTimeField = document.getElementById('eventTime');
  const eventLocationField = document.getElementById('eventLocation');
  const eventNotesField = document.getElementById('eventNotes');

  // Set the form fields with the event details for editing
  eventLocationField.value = event.location.address;
  eventNameField.value = event.name;
  eventDateField.value = event.date;
  eventTimeField.value = event.time;
  eventNotesField.value = event.notes;
  
  try {
    const address = await getAddressFromCoordinates(event.location.lat, event.location.lng);
    eventLocationField.value = address;
  } catch (error) {
    console.error('Error occurred during reverse geocoding:', error);
    eventLocationField.value = ''; // Set to empty string if reverse geocoding fails
  }
   
    const saveButton = createButton('Save', () => saveEvent(event, eventCard), eventCard);
    saveButton.setAttribute('data-action', 'save');
    eventCard.appendChild(saveButton);
   
}

// Retrieve the input fields from the form
const eventNameField = document.getElementById('eventName');
const eventDateField = document.getElementById('eventDate');
const eventTimeField = document.getElementById('eventTime');
const eventLocationField = document.getElementById('eventLocation');
const eventNotesField = document.getElementById('eventNotes');

// Function to save an edited event
async function saveEvent(event, eventCard) {
  // Update the event object with the edited values
  event.name = eventNameField.value;
  event.date = eventDateField.value;
  event.time = eventTimeField.value;
  event.notes = eventNotesField.value;
  event.location.address = eventLocationField.value;


  // Geocode the new location to get lat/lng
  const newLocationAddress = eventLocationField.value;
  try {
    const coordinates = await geocodeAddress(newLocationAddress);
    if (coordinates && coordinates.lat && coordinates.lng) {
        if (coordinates.lat !== event.location.lat || coordinates.lng !== event.location.lng) {
            event.location.lat = coordinates.lat;
            event.location.lng = coordinates.lng;
            event.location.address = newLocationAddress;
        }
    } else {
        console.error('Invalid coordinates returned for address:', newLocationAddress);
    }
  } catch (error) {
    console.error('Error occurred during geocoding:', error);
  }
  event.location = {
    lat: coordinates.lat,
    lng: coordinates.lng,
    address: newLocationAddress
};
console.log("Newly assigned event location:", event.location);
console.log("New location address:", newLocationAddress);

  // Retrieve the updated events from local storage
  let events = JSON.parse(localStorage.getItem('events')) || [];

  // Update the event in the Map or Object
events[event.id] = event;

  // Store the updated events array in local storage
  localStorage.setItem('events', JSON.stringify(events));

  // Clear the form fields
  eventForm.reset();

  // Re-enable the form fields and add the edit button back
  eventNameField.disabled = false;
  eventDateField.disabled = false;
  eventTimeField.disabled = false;
  eventLocationField.disabled = false;
  eventNotesField.disabled = false;

  // Remove the save button and create the edit button again
  eventCard.removeChild(eventCard.lastChild);
  const editButton = createButton('Edit', () => editEvent(event, eventCard), eventCard);

  // Refresh the displayed events
  displayEvents();
}

// Function to delete an event
function deleteEvent(event) {
  // Retrieve the events from local storage
  let events = JSON.parse(localStorage.getItem('events')) || [];

  // Find the index of the event in the array
  const eventIndex = events.findIndex(e => e.id === event.id);

  // Remove the event from the array
  events.splice(eventIndex, 1);

  // Store the updated events array in local storage
  localStorage.setItem('events', JSON.stringify(events));

  // Refresh the displayed events
  displayEvents();
}

// Function to search for events
function searchEvents() {
  const searchTerm = searchInput.value.toLowerCase();
  const events = JSON.parse(localStorage.getItem('events')) || [];

  // Filter events based on the search term
  const filteredEvents = events.filter(event => {
    const eventName = event.name.toLowerCase();
    return eventName.includes(searchTerm);
  });

  // Clear the events container
  eventsContainer.innerHTML = '';

  // Display the filtered events
  filteredEvents.forEach(event => {
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

    // Geocode the event location to retrieve the address
    try {
      const address = getAddressFromCoordinates(event.location.lat, event.location.lng);
      const eventLocation = document.createElement('p');
      eventLocation.textContent = `Location: ${address}`;
      eventCard.appendChild(eventLocation);
    } catch (error) {
      console.error('Error occurred during reverse geocoding:', error);
    }

    const eventNotes = document.createElement('p');
    eventNotes.textContent = `Notes: ${event.notes}`;
    eventCard.appendChild(eventNotes);

    // Create edit and delete buttons
    const editButton = createButton('Edit', () => editEvent(event, eventCard), eventCard);
    const deleteButton = createButton('Delete', () => deleteEvent(event), eventCard);

    // Append the event card to the events container
    eventsContainer.appendChild(eventCard);

    // Create markers on the map for each event
    createEventMarker(event);
  });
}

// Add event listener for form submission
eventForm.addEventListener('submit', addEvent);

// Add event listener for search button
searchButton.addEventListener('click', searchEvents);

// Call the displayEvents function to show the initial events
displayEvents();
