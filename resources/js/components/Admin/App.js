import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import Menu from "./Menu";
import Content from "./Content";
import Modal from "./Modal";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {

    return (
        <div className="container">
            <Menu/>
            <Modal/>
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
