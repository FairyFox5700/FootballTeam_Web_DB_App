import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./sponsoresActions";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));
const SponsorsList  = ({ clubId,...props }) => {
   /* const {
        params: { clubId },
    } = match;*/
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.fetchSponsorsById(clubId)
    }, [])
    //toast msg.
    const { addToast } = useToasts()
    const classes = useStyles();
   
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Sponsor Id</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Nationality</TableCell>
                                    <TableCell>Data of birth</TableCell>
                                    <TableCell>Place of birth</TableCell>
                                    <TableCell>Sponsorship kind</TableCell>
                                    <TableCell>Sponsorship Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.sponsorsList.map((index,record) => {
                                        const roleExists = record.role !== undefined & record.role.length>0;
                                        return (<TableRow key={index} hover>
                                                <TableCell>{index}</TableCell>
                                                <TableCell>{record.firstName}</TableCell>
                                                <TableCell>{record.middleName}</TableCell>
                                                <TableCell>{record.nationality}</TableCell>
                                                <TableCell>{record.dataOfBirth}</TableCell>
                                                <TableCell>{record.placeOfBirth}</TableCell>
                                                <TableCell>{record.sponsorshipKind}</TableCell>
                                                <TableCell>{record.sponsorshipSum}</TableCell>
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
    sponsorsList: state.sponsores.sponsors,
})

const mapDispatchToProp = {
    fetchSponsorsById: actions.fetchAllByClubId,
}

export default connect(mapStateToProps, mapDispatchToProp)(SponsorsList);



