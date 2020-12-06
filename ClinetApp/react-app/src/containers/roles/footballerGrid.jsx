import React, {useEffect, useState} from "react";
import {Grid, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import * as actions from "../footballers/footballersActions";
import {fetchAll} from "./rolesActions";
import {connect, useDispatch, useSelector} from "react-redux";
import CollectionItem from "../footballers/footballerCollectionCardItem";
import Container from '@material-ui/core/Container';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title:{
        fontSize:"38px",
        margin:"0 auto 30px"
    },
    items: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '10px',
        collectionItem: {
            marginBottom:'30px'
        }
    }
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const RoleWithPlayersTabs= ({ classes, ...props }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const rolesDetails = useSelector((state) => state.roles);
    useEffect(() => {
        dispatch(fetchAll())
        return () => {
        };
    }, [])

    const { roles , loading, error } =rolesDetails ;
    return (
        <div className="RolesList">
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error} </div>
            ) : (
                <div className={classes.root}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                       
                            <>
                      
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Two" {...a11yProps(2)} />
                            </>
                     
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                </div>)}
            

        </div>
    );
};


const mapStateToProps = state => ({
    footballersList: state.footballers.footballers,
})

const mapDispatchToProp = {

}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(RoleWithPlayersTabs));
