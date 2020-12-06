import React, { useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from "./footballClubsAction";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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


const ClubList  = ({ clubs,classes, ...props }) => {
    console.info("In table row")
    const [currentId, setCurrentId] = useState(0)

    const dispatch = useDispatch();
    const clubDetails = useSelector((state) => state.clubs);
    const { loading, error } = clubDetails;
    useEffect(() => {
        if(clubs === undefined || clubs.length===0){
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
                        <Container maxWidth='lg'>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead className={classes.root}>
                                                    <TableRow>
                                                        <TableCell>Football Club Id</TableCell>
                                                        <TableCell>Football Club Name</TableCell>
                                                        <TableCell>Image</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        clubs.map((record) => {
                                                            const logosIsEmpty = (record.logos===undefined ||
                                                                record.logos===null||
                                                                record.logos.length ===0);

                                                            return (<TableRow key={record.footballClubId} hover>
                                                                    <TableCell>{record.footballClubId}</TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/clubs/${record.footballClubId}`}>
                                                                            {record.footballClubName}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {!logosIsEmpty?
                                                                            (<img
                                                                                style={{height: 'auto', maxWidth: '100px'}}
                                                                                alt={`${record.logos[0].imageName}`}
                                                                                src={`${atob(record.logos[0].image)}`}
                                                                            ></img>):(<p>No logos</p>)}
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
                        </Container>
                    </>
                )
            }
        </div>
    );
}

const mapStateToProps = state => ({
    clubs: state.clubs.clubs,
})

const mapDispatchToProp = {
    fetchAllFootBallClubs: actions.fetchAll,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(ClubList));



