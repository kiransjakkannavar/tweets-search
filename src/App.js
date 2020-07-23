import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import SearchBar from './components/searchBar'
import Display from './components/Display'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route exact path="/search" component={Display} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
