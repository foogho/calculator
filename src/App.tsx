import { Provider } from 'react-redux';

import './App.scss';
import Calculator from './components/calculator';
import { store } from './redux/main';

function App() {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}

export default App;
