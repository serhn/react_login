import React, { Component } from 'react';
import Routes from './routes'
import { Provider } from 'react-redux'

import store,{persistor} from './store'
//import  from './store'

import { PersistGate } from 'redux-persist/integration/react'
import 'semantic-ui-css/semantic.min.css';
//import VideoPls from './components/videoPls'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
