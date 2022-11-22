import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Components/LayoutArea/Routing/Routing';
import './index.css';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <Routing />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
