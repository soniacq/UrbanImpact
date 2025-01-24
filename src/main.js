import L from 'leaflet';
import 'leaflet.heat';

// Create a map centered on New York
const map = L.map('map').setView([40.7128, -74.0060], 12);  // New York coordinates

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example heatmap data (latitude, longitude, intensity)
const heatData = [
    [40.7128, -74.0060, 0.8],    // New York
    [40.730610, -73.935242, 0.6], // Brooklyn
    // [40.748817, -73.985428, 0.9], // Midtown Manhattan
    // [40.7580, -73.9855, 0.7],    // Times Square
    // [40.7831, -73.9712, 0.5],    // Upper West Side
    // [40.7328, -73.9973, 0.4],    // Greenwich Village
    // [40.7369, -73.9911, 0.6],    // SoHo
    // [40.7498, -73.9877, 0.8],    // Flatiron District
];

// Add the heatmap layer to the map
L.heatLayer(heatData, {
    radius: 25,           // Radius of the heatmap points
    blur: 15,             // Blur effect to make heatmap more smooth
    maxZoom: 15,          // Maximum zoom level for heatmap intensity
}).addTo(map);


