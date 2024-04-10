# Weather Assignment Application

This project is a weather application built using Vite, providing users with weather information, air quality data, and various features.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
git clone <repository-url>

2. Navigate to the project directory:
cd weather-assignment

4. Install dependencies:
npm install

6. Start the development server:
npm run dev

## Features

1. **User Authentication**
- Implement user authentication using Firebase Authentication.
- Only authenticated users can save and manage their favorite cities.

2. **Air Quality Information**
- Fetch and display the current air quality index (AQI) and main pollutants for the selected city using a public air quality API.
- Provide a visualization to represent AQI levels.

3. **Interactive Weather and Pollution Maps**
- Integrate an interactive map using Leaflet or Google Maps API.
- Display weather and air quality of multiple cities at once.
- Allow users to click on a city marker to view detailed data.

4. **Advanced Forecasting and Historical Data**
- 5-day forecast.

5. **Internationalization (i18n)**
- Support multiple languages in the UI using react-i18next.

6. **Performance Optimization**
- Implemented lazy loading for components.
- Optimized rendering performance using React's memo and useCallback.

7. **Advanced State Management**
- Introduced Redux for efficient state management, especially for authenticated user data and favorites.

8. **Responsiveness**
- Application is responsive to different screen sizes.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is licensed under the [MIT License](LICENSE).
