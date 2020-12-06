import App from './containers/App';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import  {ThemeProvider} from '@material-ui/core/styles';
import React from "react";
import theme from "./theme";
import './index.css';

ReactDOM.render(<React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'));