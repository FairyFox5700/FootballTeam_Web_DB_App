﻿import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./matchActions";
import { Grid, Paper, TableContainer, 
    Table, TableHead, TableRow, TableCell, 
    TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const MatchesList  = ({ classes, ...props }) => {
    console.info("In table row")
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllMatches()
    }, [])

    const { addToast } = useToasts()

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Match Id</TableCell>
                                    <TableCell>Match Name</TableCell>
                                    <TableCell>Ticket Price ($)</TableCell>
                                    <TableCell>Match Date</TableCell>
                                    <TableCell>Stadium Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    //TODO check not null stadium
                                    props.matchesList.map((record) => {
                                        return (<TableRow key={record.matchId} hover>
                                                <TableCell>{record.matchId}</TableCell>
                                                <TableCell>{record.matchName}</TableCell>
                                                <TableCell>{record.ticketPrice}</TableCell>
                                                <TableCell >{(record.matchDate).format('D/MM/YYYY')}</TableCell>
                                                <TableCell>{record.stadium[0].stadiumName}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    matchesList: state.matches.matches,
})

const mapDispatchToProp = {
    fetchAllMatches: actions.fetchAll,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(MatchesList));



