import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { store, StoreContext } from './app/stores/store';
import 'react-toastify/dist/ReactToastify.min.css';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

export const history = createBrowserHistory();

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StoreContext.Provider value={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </StoreContext.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
