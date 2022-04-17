import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
 <React.StrictMode>
    <SpeechProvider appId="266ebadb-39f5-4720-88fe-a0b0c5a1877a">
    <App />
  </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
