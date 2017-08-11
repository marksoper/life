import React from 'react';
import { Provider } from 'react-redux';
import LifeContainer from '../LifeContainer/LifeContainer';
import store from '../../store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <LifeContainer />
    </Provider>
  );
}

export default App;
