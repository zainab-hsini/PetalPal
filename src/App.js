import React, { useState } from 'react';
import Calendar from 'react-calendar';
//necessary css files 
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  //defining all needed variables
  const [plantName, setPlantName] = useState(''); //name of plant entered by the user
  const [plantingDate, setPlantingDate] = useState(''); //date entered by the user 
  const [plantData, setPlantData] = useState(null); //plant data retrieved from API
  const [plants, setPlants] = useState([]); //array of plants added
  const [value, setValue] = useState(new Date()); 
  const [wateringMessage, setWateringMessage] = useState(''); //watering message displayed 

  const handleSearchPlant = async (e) => {
    e.preventDefault(); //prevent app from refreshing after input (from ChatGPT)
    try {
      const response = await fetch(`https://perenual.com/api/species-list?key=${process.env.REACT_APP_API_KEY}&q=${plantName}`); //fetching info about the plant from the API
  
      //error handling
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      //get the data from the API
      const data = await response.json();
      
      //check if plant data is available
      if (!data.data || data.data.length === 0) {
        setWateringMessage("We don't have information for this plant yet.");
        setPlantData(null); 
        return;
      }
      
      //using the first result for the rest
      let plant = data.data[0];
      
      //check for unwanted watering text
      if (plant.watering && plant.watering.includes("Upgrade Plans")) {
        plant.watering = null; // Clear watering info if it contains the unwanted text
      }
      
      setPlantData(plant);
  
      const wateringFrequency = getWateringFrequency(plant.watering);
      //creating a new object newPlant with info from the API
      const newPlant = {
        name: plant.common_name,
        wateringFrequency,
        plantingDate: new Date(plantingDate),
        scientificName: plant.scientific_name
      };
      setPlants([...plants, newPlant]); //add the plant to the list of plants 
  
      //displaying the watering message depending on the watering info we get from the api
      if (wateringFrequency === null) {
        setWateringMessage("We don't have watering information for this plant.");
      } else {
        setWateringMessage(`You should water your plant every ${wateringFrequency} days.`);
      }
    } catch (error) { //general error handling
      console.error("Error fetching plant data:", error);
      setWateringMessage("An error occurred while fetching plant information.");
    }
  };   

  const getWateringFrequency = (watering) => {
    //mapping each watering frequency from the API to a numerical value 
    const wateringFrequencyMap = {
      'Frequent': 2,
      'Average': 5,
      'Minimum': 10,
      'None': null
    };
  
    //return either the numerical equivalent or null if watering data is not in the expected values
    return wateringFrequencyMap[watering] || null;
  };  

  const calculateWateringDates = (plant) => {
    //generate all watering dates for a year
    const wateringDates = [];
    const startDate = new Date(plant.plantingDate); //convert planting date string to a date object (from ChatGPT)
    const frequency = plant.wateringFrequency;
  
    if (frequency) {
      for (let i = 0; i <= 365; i += frequency) {
        const wateringDate = new Date(startDate); //convert each date to a date object (from ChatGPT)
        wateringDate.setDate(startDate.getDate() + i + 1); //set the watering date (current start date plus i days + 1 for indexing) (from ChatGPT)
        wateringDates.push(wateringDate);
      }
    }
  
    return wateringDates;
  };   

  const handleDateChange = (date) => { //updates date to new start date (helper function from ChatGPT)
    setValue(date);
  };

  return (
    <div className="App">
      {/* Title of the app */}
      <h1>PetalPal: Your Plant Watering Tracker</h1> 

      {/* Input from the user, plant name + planting date, display message */}
      {/* hinder from submitting if user doesn't input anything and call handleSearchPlant when user submits*/}
      <form onSubmit={handleSearchPlant}>
        <label>
          Plant Name:
          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)} 
            required 
          />
        </label>

        <label>
          Planting Date:
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add Plant</button>
      </form>

      {/* Text output, scientific name + common name + watering frequency from API (from ChatGPT) */}
      {plantData && (
        <div>
          <h2>Plant Information</h2>
          <p><strong>Scientific Name:</strong> {plantData.scientific_name}</p>
          <p><strong>Common Name:</strong> {plantData.common_name}</p>
          <p><strong>Watering Frequency:</strong> {plantData.watering || 'Information not available'}</p>
        </div>
      )}

      {wateringMessage && <p>{wateringMessage}</p>} {/* displays watering message only if it has a value to avoid printing errors (from ChatGPT) */}

      {/* displaying the calendar (formatting from ChatGPT), change the date using handleDateChange when calling */}
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={({ date }) => {
          //generate the array of watering dates
          const wateringDates = plants.flatMap(plant => calculateWateringDates(plant));
          
          //normalize date to midnight to avoid time mismatch (from ChatGPT)
          const currentDate = new Date(date);
          currentDate.setHours(0, 0, 0, 0);

          //check if the date is in the list of watering dates and highlight accordingly 
          return wateringDates.some(wateringDate => wateringDate.toDateString() === currentDate.toDateString())
            ? 'highlight'
            : null;
        }}
      />
    </div>
  );
}

export default App;
