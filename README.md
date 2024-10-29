# PetalPal: Your Plant Watering Tracker 🌱

## Project Overview
**PetalPal** is a plant care assistant application built with React to help track the watering schedules for various plants. Users can enter the name and planting date of each plant, and PetalPal will fetch watering frequency data from an external API and create a personalized calendar to highlight watering dates for the plants entered.

This project was created to solve the semi-regular problem of remembering when to water different plants, especially for users with multiple plant species that require varying care schedules.

## Features
- **User Input for Plants**: Add a plant by name and planting date to begin tracking.
- **API Integration**: PetalPal fetches plant information, including scientific name and watering frequency, from an external plant database.
- **Watering Schedule Calculation**: Based on the planting date and watering frequency, PetalPal calculates all the watering dates for a year and highlights them on a calendar.
- **Error Handling**: If no watering data is available for a plant, the app informs the user.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- An API key from [Perenual](https://perenual.com/) to access plant data (replace `REACT_APP_API_KEY` in `.env`).

### Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PetalPal.git
   ```
2. Navigate into the project directory:
   ```bash
   cd PetalPal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your API key:
   - Create a `.env` file in the root directory.
   - Add your API key as follows:
     ```plaintext
     REACT_APP_API_KEY=your_api_key_here
     ```
5. Run the application:
   ```bash
   npm start
   ```

## How to Use the Application
1. Enter the name of your plant in the **Plant Name** input field.
2. Select the **Planting Date** when you planted the plant.
3. Click **Add Plant**. The app will fetch the plant's scientific name, common name, and watering frequency from the Perenual API.
4. The calendar will display all calculated watering dates based on the watering frequency provided by the API, with dates highlighted to indicate when each plant needs watering.

## API Integration
PetalPal uses the [Perenual API](https://perenual.com/docs/api) to retrieve plant details based on the plant name entered by the user. This includes:
- **Scientific and Common Name**: Displayed on the UI for reference.
- **Watering Frequency**: Used to calculate a year-long schedule of watering dates for each plant. This frequency is mapped as follows:
  - **Frequent**: Every 2 days
  - **Average**: Every 5 days
  - **Minimum**: Every 10 days
  - **None**: No watering information is available or no watering is needed for the plant

## AI Assistance Credit
Throughout development, I used ChatGPT to assist with:
- Writing and explaining JavaScript functions, particularly the `calculateWateringDates` function for generating watering dates.
- Structuring components and organizing the code for readability.
- Handling date formatting for consistent highlighting on the calendar.
- Error handling when fetching data from the API and generating user feedback messages.
  
All AI-generated code snippets were reviewed, modified, and understood before incorporation.

## Future Enhancements
- Add notifications or reminders for upcoming watering dates.
- Allow users to customize the watering frequency if API data is unavailable.
- Expand functionality to track sunlight requirements, fertilizing schedules, and other plant care needs.

---

# PetalPal

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
