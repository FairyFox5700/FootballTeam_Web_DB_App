
import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {BrowserRouter} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import Routing from "../../routes/route";
import {Provider} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "rgba(60,3,76,0.95)"
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        fontFamily: 'Goldman',
        color: `white`
    },
  
}));

const navLinks = [
    { title: `about`, path: `/about` },
    { title: `clubs`, path: `/clubs` },
    { title: `players`, path: `/footballers` },
    { title: `results`, path: `/results` },
];

const Header = () => {
    const classes = useStyles();
    return (
        <div className={"App"}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Container maxWidth="lg" className={classes.navDisplayFlex}>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="large" />
                        </IconButton>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            
                            {navLinks.map(({ title, path }) => (
                                <a href={path} key={title} className={classes.linkText}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                    </Container>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <ToastProvider autoDismiss={true}>

                    <Routing />

                </ToastProvider>
            </BrowserRouter>
        </div>
    );
};
export default Header;