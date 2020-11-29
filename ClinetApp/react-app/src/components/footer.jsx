import React, {Component} from 'react';

import {Footer} from 'react-materialize/lib';
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
 footer:{
        'marginTop': '1rem',
        'padding': '1rem',
        'backgroundColor': 'rgb(230,221,239)',
        'bottom': 0,
        'left': 0,
        'width': '100%',
        'fontSize':'1.2rem'
 }
}));
const ReactFooter =(...props)=>{
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            {props.children}
            <Footer  copyrights="&copy; 2015 Copyright Text"
                    links={
                        <List >
                            <ListItem><Link to="/About Us" className="grey-text text-lighten-3">About Us</Link></ListItem>
                            <ListItem><Link to="/Terms & Conditions" className="grey-text text-lighten-3">Terms & Conditions</Link></ListItem>
                            <ListItem><Link to="/Help" className="grey-text text-lighten-3">Help</Link></ListItem>
                            <ListItem><Link to="/Contact Us" className="grey-text text-lighten-3">Contact Us</Link> </ListItem>
                        </List >
                    }
                    className='example'
            >
                <h5 className="white-text">Contact us</h5>
            </Footer>
        </div>
    );
}
export default ReactFooter;