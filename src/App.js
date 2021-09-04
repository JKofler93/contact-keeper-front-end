import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import {Switch, Route } from "react-router-dom";
import Home from "./pages/Home"
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/addContact" component={AddContact}/>
        <Route exact path="/editContact/:id" component={EditContact}/>
      </Switch>

    </div>
  );
}

export default App;