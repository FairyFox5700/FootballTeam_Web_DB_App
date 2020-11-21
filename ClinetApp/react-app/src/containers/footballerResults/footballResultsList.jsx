import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actions from "./footballResultsActions";
import {connect} from "react-redux";
import {useToasts} from "react-toast-notifications";
import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const FootballResultTable = ({ classes, ...props }) => { 
    console.info("In table row")
    const [results] = useState([])


    useEffect(() => {
        props.fetchAllResults()
    }, [])

    //toast msg.
    const { addToast } = useToasts()

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <StyledTableCell>Result Id</StyledTableCell>
                                    <StyledTableCell align="right">ScoredGoals</StyledTableCell>
                                    <StyledTableCell align="right">MissedGoals</StyledTableCell>
                                    <StyledTableCell align="right">RedCardCount</StyledTableCell>
                                    <StyledTableCell align="right">YellowCardCount</StyledTableCell>
                                </TableRow>
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
                </Grid>
            </Grid>
        </Paper>
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
    fetchAllResults:actions.fetchAllWithPlayers,
    fetchByMatchId:id=>actions.fetchAllByMatchId(id),
}


export default connect(mapStateToProps, mapDispatchToProp)(withStyles(useStyles)(FootballResultTable))
