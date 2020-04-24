import React from 'react';
import ReactDOM from 'react-dom';
import './firebase.js';
import './index.css';
import App from './App';
import Play from './Play';
import * as serviceWorker from './serviceWorker';
import ExplorePage from './ExploreMode.js';
import Create from './Create.js';
import Homepage from './Homepage.js';
import Grid from "./grid_generator";
import FirestoreManualTests from './services/firestoreManualTests.js';

ReactDOM.render(
  <React.StrictMode>
    <ExplorePage />
    <Play/>
    <App />
    <FirestoreManualTests />
    <Homepage />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
