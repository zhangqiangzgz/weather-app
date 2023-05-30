# weather-app
node-based weather application

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) 

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd weaher-app
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://home.openweathermap.org/api_keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)