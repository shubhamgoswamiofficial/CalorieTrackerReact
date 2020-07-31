import React, { Component } from 'react';
import Routers from './Routers';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure()

class App extends Component {

  render() {

    return (
      <Routers />
    )
  }
}

export default App;
