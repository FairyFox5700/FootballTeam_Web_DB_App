import React, {useEffect, useState} from "react";
import {Grid, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import * as actions from "./footballersActions";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import imageName from  '../../images/png-clipart-soccer-bal.png';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CollectionItem from "./footballerCollectionCardItem";
import Container from '@material-ui/core/Container';

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

const FootballersCardList= ({ classes, ...props }) => {

    useEffect(() => {
        props.fetchAllFootBalers()
    }, [])

    return (
        <Container maxWidth="lg" className={classes.root}>
            <h2 className={classes.title}>Footballers</h2>
            <div className={classes.items}>
                {
                    props.footballersList.map((item ,index)=> <CollectionItem key={index} item={item} />)
                }
            </div>
        </Container>
    );
};


const mapStateToProps = state => ({
    footballersList: state.footballers.footballers,
})

const mapDispatchToProp = {
    fetchAllFootBalers: actions.fetchAllWithRoles,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(FootballersCardList));








