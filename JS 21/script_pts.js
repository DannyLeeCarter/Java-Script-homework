// Vehicle class
class Vehicle {
    constructor(number, capacity, route, type) {
        this.number = number;
        this.capacity = capacity;
        this.route = route;
        this.type = type;
    }

    display() {
        console.log(`Type: ${this.type}, Number: ${this.number}, Capacity: ${this.capacity}`);
    }
}

// Subclasses for specific vehicle types
class Bus extends Vehicle {
    constructor(number, capacity, route) {
        super(number, capacity, route, 'Bus');
    }
}

class Train extends Vehicle {
    constructor(number, capacity, route) {
        super(number, capacity, route, 'Train');
    }
}

class Subway extends Vehicle {
    constructor(number, capacity, route) {
        super(number, capacity, route, 'Subway');
    }
}

class Tram extends Vehicle {
    constructor(number, capacity, route) {
        super(number, capacity, route, 'Tram');
    }
}

// Passenger class
class Passenger {
    constructor(name, age, destination) {
        this.name = name;
        this.age = age;
        this.destination = destination;
        this.onVehicle = false;
    }

    display() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Destination: ${this.destination}`);
    }
}

// Initialize an array to store vehicles and passengers
const vehicles = [];
const passengers = [];

// Utility functions
function addPassengerToVehicle(passenger, vehicle) {
    if (passenger.onVehicle) {
        console.log(`${passenger.name} is already on a vehicle.`);
    } else {
        passenger.onVehicle = true;
        vehicle.passengers.push(passenger);
        console.log(`${passenger.name} added to ${vehicle.type} ${vehicle.number}.`);
    }
}

function removePassengerFromVehicle(passenger, vehicle) {
    const index = vehicle.passengers.findIndex(p => p.name === passenger.name);
    if (index === -1) {
        console.log(`${passenger.name} is not found on ${vehicle.type} ${vehicle.number}.`);
    } else {
        passenger.onVehicle = false;
        vehicle.passengers.splice(index, 1);
        console.log(`${passenger.name} removed from ${vehicle.type} ${vehicle.number}.`);
    }
}

function listPassengers() {
    passengers.forEach(passenger => {
        passenger.display();
    });
}

function listVehicles() {
    vehicles.forEach(vehicle => {
        vehicle.display();
    });
}

// Event listeners
document.getElementById('add-passenger').addEventListener('click', () => {
    const name = document.getElementById('passenger-name').value;
    const age = document.getElementById('passenger-age').value;
    const destination = document.getElementById('passenger-destination').value;

    if (name && age && destination) {
        const passenger = new Passenger(name, age, destination);
        passengers.push(passenger);
        const passengerListItem = document.createElement('li');
        passengerListItem.textContent = passenger.name;
        passengerListItem.dataset.name = passenger.name;
        document.getElementById('passenger-list').appendChild(passengerListItem);
    } else {
        console.log('Please fill in all the passenger details.');
    }
});

document.getElementById('remove-passenger').addEventListener('click', () => {
    const name = document.getElementById('remove-passenger-name').value;

    if (name) {
        const index = passengers.findIndex(p => p.name === name);
        if (index === -1) {
            console.log(`Passenger with name ${name} does not exist.`);
        } else {
            const passenger = passengers[index];
            passengers.splice(index, 1);
            const passengerListItem = document.querySelector(`#passenger-list li[data-name="${passenger.name}"]`);
            document.getElementById('passenger-list').removeChild(passengerListItem);
            console.log(`Passenger ${passenger.name} removed.`);
        }
    } else {
        console.log('Please enter the name of the passenger to be removed.');
    }
});



// Create vehicles
const bus1 = new Bus('B123', 50, 'Route A');
const train1 = new Train('T789', 200, 'Route X');
const subway1 = new Subway('S456', 100, 'Route C');
const tram1 = new Tram('T789', 80, 'Route Z');

// Add vehicles to the array
vehicles.push(bus1, train1, subway1, tram1);

// Display vehicles
listVehicles();
