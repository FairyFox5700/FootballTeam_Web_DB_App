import React, { useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from "./matchActions";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import {Link} from "react-router-dom";
import moment from "moment";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.3rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})


const MatchesTable  = ({ matches,classes, ...props }) => {
    console.info("In table row")
    const [currentId, setCurrentId] = useState(0)

    const dispatch = useDispatch();
    const matchesDetails = useSelector((state) => state.matches);
    const { loading, error } = matchesDetails;
    useEffect(() => {
        if(matches === undefined || matches.length===0){
            dispatch(actions.fetchAll())
            return () => {
            };
        }
    }, [])


    const { addToast } = useToasts()
    return (
        <div>
            {
                loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error} </div>
                ) : (
                    <>
                        <Paper className={classes.paper} elevation={3}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>MatchId</TableCell>
                                                    <TableCell>Match Name</TableCell>
                                                    <TableCell>Ticket Price ($)</TableCell>
                                                    <TableCell>Match Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    matches.map((record, index) => {
                                                        return (<TableRow key={index} hover>
                                                                <TableCell>{index+1}</TableCell>
                                                                <TableCell>{record.matchName}</TableCell>
                                                                <TableCell>{record.ticketPrice}</TableCell>
                                                                <TableCell>{moment(record.matchDate).format("DD/MM/YYYY")}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                )
            }
        </div>
    );
}

const mapStateToProps = state => ({
    matches: state.matches.matches,
})

const mapDispatchToProp = {
    fetchAllMatches: actions.fetchAll,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(MatchesTable));



