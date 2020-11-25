import React from 'react';
import './App.css';
import { store } from "../store/configureStore";
import { Provider } from "react-redux";
import ClubList from '../containers/clubs/footballClubsList';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Header from "./header/header";
import Routing from "../routes/route";
import {BrowserRouter} from "react-router-dom";
import Layout from "../components/latout";
import ReactFooter from "../components/footer";

function App() {
    return (
            <Provider store={store}>
                <Header/>
               
                <ReactFooter />
            </Provider>
    );
}

export default App;


/*import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Header from './header/header.jsx';
import ClubList from "./clubs/footballClubsList.jsx";
import About from './about/about.jsx';
import Routing from "../routes/route";
import { Provider } from 'react-redux';
//import Footballer from './footballer/footballer.jsx';<Header />
import configureStore from '../store/configureStore.jsx'

const store = configureStore();
const StoreContext = React.createContext(null);

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <BrowserRouter>
                    <div className="App">
                        <Routing />
                    </div>
                    </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
*/