import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../clubs/footballClubsAction";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
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


const TrainingsList  = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllTrainings()
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
                                    <TableCell>Training id</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Stadium name</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Surface</TableCell>
                                    <TableCell>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.trainings.map((record) => {
                                        return (<TableRow key={record.trainingId} hover>
                                                <TableCell>{record.trainingId}</TableCell>
                                                <TableCell>{record.trainingData}</TableCell>
                                                <TableCell>{record.stadiumName}</TableCell>
                                                <TableCell>{record.capacity}</TableCell>
                                                <TableCell>{record.yearOfBuild}</TableCell>
                                                <TableCell>{record.surface}</TableCell>
                                                <TableCell>{record.streetAddress},
                                                    {record.postalCode},
                                                    {record.country},
                                                    {record.stateProvince}
                                                </TableCell>
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
    trainings: state.trainings.training
})

const mapDispatchToProp = {
    fetchAllTrainings: actions.fetchAll,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(TrainingsList));



