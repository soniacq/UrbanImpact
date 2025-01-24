import L from 'leaflet';
import 'leaflet.heat';
import Papa from 'papaparse';

// Create a map centered on New York
const map = L.map('map').setView([40.7128, -74.0060], 12);  // New York coordinates

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// CSV file path (adjust if necessary)
const csvFilePath = '/Motor_Vehicle_Collisions_Crashes.csv'; // Path should be relative to public

// Store parsed data globally
let crashData = [];

// Parse CSV file using PapaParse
Papa.parse(csvFilePath, {
    download: true,
    header: true, // Use the first row as header
    complete: function(results) {
        crashData = results.data.slice(0, 4000);
        // Parse the heatmap data after the CSV is loaded
        const heatData = crashData.map(row => {
        // // Extract latitude, longitude, and number of persons injured
        // const heatData = results.data.map(row => {
        // const heatData = results.data.slice(0, 200).map(row => {
            const latitude = parseFloat(row.LATITUDE);
            const longitude = parseFloat(row.LONGITUDE);
            const personsInjured = parseInt(row['NUMBER OF PERSONS INJURED'], 10);
            if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(personsInjured)) {
                return [latitude, longitude, personsInjured]; // Format: [lat, lon, intensity]
            }
        }).filter(Boolean); // Remove any invalid entries

        // Add the heatmap layer to the map
        L.heatLayer(heatData, {
            radius: 10,           // Radius of the heatmap points
            blur: 15,             // Blur effect to make heatmap more smooth
            maxZoom: 15,          // Maximum zoom level for heatmap intensity
        }).addTo(map);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});