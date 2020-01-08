import React from 'react';
import Calculator from './components/Calculator'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import CalculatorReducer from './redux/CalculatorReducer';
import thunk from 'redux-thunk';

const store = createStore(CalculatorReducer, applyMiddleware(thunk));

function App() {
  return (
      <Provider store={store}>
        <div className="App">
            <Calculator />
        </div>
      </Provider>
  );
}

export default App;
