# Car Search App

A MERN (MongoDB, Express, React, and Node.js) stack web application that allows users to search for cars, save their favorites, and compare car specifications. Users can also create accounts and manage their search history.

## Features

- \*earch functionality: Users can search for cars based on make, model, year, and other criteria.
- Favorites list: Users can save their favorite cars to a personal list.
- Compare functionality: Users can compare the technical specifications of their favorite cars side by side.
- User accounts: Users can create accounts, log in, and manage their search history.
- Integration with external car API: The backend fetches car data from an external API and stores it in a MongoDB database.

## Technologies Used

- Frontend: React, Redux, React Router, React Bootstrap, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, Passport.js, JWT
- External API: [CarMD](https://www.carmd.com/api/)

## Getting Started

1. Clone the repository and install dependencies:

```
git clone
cd car-search-app
npm install
```

2. Set up MongoDB database and update the connection string in the `server/app.js` file.
3. Start the backend server:

```
cd server
npm start
```

4. Start the frontend server:

```
cd client
npm start
```

5. Open the app at `localhost:3000`.
