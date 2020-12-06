import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actions from "./footballResultsActions";
import {connect, useDispatch, useSelector} from "react-redux";
import {useToasts} from "react-toast-notifications";
import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = {
    table: {
        minWidth: 700,
    },
};

const FootballResultTable = ({ classes, ...props }) => {
    console.info("In table row")
    const dispatch = useDispatch();
    const footballDetails = useSelector((state) => state.footballResults);
    const { results , loading, error } = footballDetails
    useEffect(() => {
        dispatch(actions.fetchAllWithPlayers())
        return () => {
        };
    }, []);
;
console.log(200)
    console.log(results)

    //toast msg.
    const { addToast } = useToasts()

    return (
        <div>

            {loading ? (
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
                                        <TableHead className={classes.root}>
                                            <TableRow>
                                                <StyledTableCell>Result Id</StyledTableCell>
                                                <StyledTableCell >ScoredGoals</StyledTableCell>
                                                <StyledTableCell>MissedGoals</StyledTableCell>
                                                <StyledTableCell >RedCardCount</StyledTableCell>
                                                <StyledTableCell >YellowCardCount</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                results.map((record,index) => {
                                                    return (<TableRow key={index} hover>
                                                            <TableCell>{index}</TableCell>
                                                            <TableCell>{record.scoredGoals}</TableCell>
                                                            <TableCell>{record.missedGoals}</TableCell>
                                                            <TableCell>{record.redCardCount}</TableCell>
                                                            <TableCell>{record.yellowCardCount}</TableCell>
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
                </>)
            }
        </div>
    );
}
/* return (
     <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="customized table">
             <TableHead>
                 <StyledTableRow>
                     <StyledTableCell>Result Id</StyledTableCell>
                     <StyledTableCell align="right">ScoredGoals</StyledTableCell>
                     <StyledTableCell align="right">MissedGoals</StyledTableCell>
                     <StyledTableCell align="right">RedCardCount</StyledTableCell>
                     <StyledTableCell align="right">YellowCardCount</StyledTableCell>
                 </StyledTableRow>
             </TableHead>
                 <TableBody>
                     {
                   props.results.map((record) => {
                             return (<StyledTableRow key={record.resultId} hover>
                                     <StyledTableCell>{record.resultId}</StyledTableCell>
                                     <StyledTableCell>{record.scoredGoals}</StyledTableCell>
                                     <StyledTableCell>{record.missedGoals}</StyledTableCell>
                                     <StyledTableCell>{record.redCardCount}</StyledTableCell>
                                     <StyledTableCell>{record.yellowCardCount}</StyledTableCell>
                                 </StyledTableRow>
                             )
                         })
                     }
             </TableBody>
         </Table>
     </TableContainer>
 );
}*/

const mapStateToProps = state => ({
    results: state.footballResults.results
})

const mapDispatchToProp = {
    fetchAllResults:actions.fetchAllWithPlayers
}


export default connect(mapStateToProps, mapDispatchToProp)(withStyles(useStyles)(FootballResultTable))
