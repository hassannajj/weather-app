# Weather App
![image](https://github.com/user-attachments/assets/2d0f09d8-2188-4b72-8750-4a0233ad0835)

![image](https://github.com/user-attachments/assets/49bf4e07-d73f-4bc8-8320-9dadd226e99d)

This is a weather app created using **React**. It integrates two different APIs to fetch city data and weather forecasts. The app displays a 7-day weather forecast with temperature and rain probabilities. When you click on a specific day, a chart is shown displaying temperature and rain chance throughout the day.

## How To Run

1. **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd weather-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend**:
    ```bash
    npm run build
    npm run dev
    ```

4. **Run the backend**:
    ```bash
    node backend/server.js
    ```

## API Integration

This app uses two different APIs to gather data:

### 1. City API - [API Ninjas](https://api-ninjas.com/api/city)
- Takes a **city name** and returns the **latitude** and **longitude**.
- Example: 
    - Input: "San Francisco"
    - Output: 
      ```json
      {
        "latitude": 37.7562,
        "longitude": -122.443
      }
      ```

### 2. Weather API - [Open-Meteo](https://open-meteo.com)
- Uses the **latitude** and **longitude** from the City API to fetch weather data for the next 7 days.
- Returns a list of temperatures and rain probabilities for each day.

### 3. Chart Display
- When you click on a specific day in the forecast, it displays a chart (using **Chart.js**) showing the **temperature** and **rain probability** throughout the day.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js
- **Charting**: Chart.js
- **APIs**: 
  - [API Ninjas (City)](https://api-ninjas.com/api/city)
  - [Open-Meteo (Weather)](https://open-meteo.com)
