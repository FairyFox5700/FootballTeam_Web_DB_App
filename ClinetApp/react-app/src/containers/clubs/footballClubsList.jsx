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


    const ClubList  = ({ classes, ...props }) => {
        console.info("In table row")
        const [currentId, setCurrentId] = useState(0)

        useEffect(() => {
            props.fetchAllFootBallClubs()
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
                                        <TableCell>FootballClubId</TableCell>
                                        <TableCell>FootballClubName</TableCell>
                                        <TableCell>Image</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.clubs.map((record) => {
                                            const base64String =atob(record.logos[0].image);
                                            return (<TableRow key={record.footballClubId} hover>
                                                    <TableCell>{record.footballClubId}</TableCell>
                                                    <TableCell>{record.footballClubName}</TableCell>
                                                    <TableCell>
                                                        <img
                                                            style={{ height: 'auto', maxWidth: '100px' }}
                                                            alt={`${record.logos[0].imageName}`}
                                                            src={`${base64String}`}
                                                        ></img>
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
    clubs: state.clubs.clubs,
})

const mapDispatchToProp = {
    fetchAllFootBallClubs: actions.fetchAll,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(ClubList));



