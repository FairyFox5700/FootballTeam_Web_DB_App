import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./seasonesAction";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import makeStyles from "@material-ui/core/styles/makeStyles";

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


const SeasonsList  = (props) => {
  
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyles();
    
    useEffect(() => {
        props.fetchAllSeasones(props.clubId)
        if(!Array.isArray(props.seasonsList))
        {
            props.seasonsList = [props.seasonsList]
        }
    }, [props.clubId])

    
    return (
        
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Season Id</TableCell>
                                    <TableCell>league Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                   
                                    props.seasonsList.map((index,record) => {
                                        const roleExists = record.role !== undefined & record.role.length>0;
                                        return (<TableRow key={index} hover>
                                                <TableCell>{index}</TableCell>
                                                <TableCell>{record.leagueName}</TableCell>
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
    seasonsList: state.seasones.seasons,
})

const mapDispatchToProp = {
    fetchAllSeasones: actions.fetchAllByClubId,
}

export default connect(mapStateToProps, mapDispatchToProp)(SeasonsList);



