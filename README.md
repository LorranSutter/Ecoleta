# Ecoleta - Next Level Week

Project provided by [Rocket Seat](https://rocketseat.com.br/week/inscricao/11.0) to learn backend, frontend and mobile development employing React JS, React Native and Express.

<div align="center">

<img src="https://res.cloudinary.com/lorransutter/image/upload/v1591489742/ecoleta_site_preview.gif" alt="Site preview" height="300"/>
<img src="https://res.cloudinary.com/lorransutter/image/upload/v1591491000/ecoleta_mobile_preview.gif" alt="Mobile preview" height="300"/>

</div>

This project aims to create a web application and mobile web app to help people find places that contribute to **recycling**.

The web application is intended for the use of collection points, where is possible to:

- Register yourself as a collection point with name, email, whatsapp number, city, province/state, location, image and items that you collect.
- It is possible to upload and image of the place and user a interactive map to mark the place location.

The mobile web app is indended for users that want to find collection points, where is possible to:

- Find places by location and collected items.
- Browse for collection points using a map.
- Choose and read details about the collection point.
- Get in touch with the place, either registered email or whatsapp.

## :runner: How to run

Open your terminal in the folder you want to clone the project

```sh
# Clone this repo
git clone https://github.com/LorranSutter/Ecoleta.git

# Go to the project
cd Ecoleta

# Go to each folder and install dependencies
cd backend
yarn

cd ../frontend
yarn

cd ../mobile
yarn
```

Now you will need two opened terminals to run the project. One for the backend and another one for the frontend or mobile.

Backend will run on http://localhost:5000/

Frontend will run on http://localhost:3000/

Mobile will run on http://localhost:19002/

```sh
# Go to backend
cd backend

# Run the project
yarn start

## In the another terminal ##

# Go to frontend
cd frontend

# Run the project
yarn start
```

For the mobile web app keep backend running and do the following:

```sh
# Go to mobile
cd mobile

# Run the project
expo start
```

This will start expo CLI on your browser. A QR code will appear on your screen and in terminal. You can scan this QR code with [Expo app](https://expo.io/tools#client) to see the application running in your phone.

## :book: Resources and technologies :computer:

- [Typescript](https://www.typescriptlang.org/) - superset of JS programming language static typed
- [Node.js](https://nodejs.org/en/) - executes JS scripts in server side
- [Express.js](http://expressjs.com/) - web application framework
- [Multer](https://www.npmjs.com/package/multer) - middleware for uploading files
- [ReactJS](https://reactjs.org/) - frontend library
- [React Navigation](https://reactnavigation.org/) - routing and navigation for react apps
- [React Leaflet](https://react-leaflet.js.org/) - map component based on Leaflet
- [React dropzone](https://react-dropzone.js.org/) - create zone to drop files
- [React Native](https://reactnative.dev/) - framework for mobile development
- [Expo](https://expo.io/) - tool for helping mobile development with react native
- [React Native Maps](https://github.com/react-native-community/react-native-maps) - map component for iOS and Android
- [Knex](http://knexjs.org/) - query builder
- [Sqlite](https://www.sqlite.org/index.html) - simple SQL database engine
- [Celebrate](https://github.com/arb/celebrate) - middleware to validate data
