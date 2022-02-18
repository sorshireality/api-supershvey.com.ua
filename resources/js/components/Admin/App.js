import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import Menu from "./Menu";
import Content from "./Content";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {

    return (
        <div className="container">
            <Menu/>
            <Content/>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    if (document.getElementById('root')) {
        ReactDOM.render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>,
            document.getElementById('root')
        )
    }
}
