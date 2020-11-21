import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./footballersActions";
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


const FootballersList  = ({ classes, ...props }) => {
    console.info("In table row")
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllFootBalers()
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
                                    <TableCell>Footballer Id</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Nationality</TableCell>
                                    <TableCell>Data of birth</TableCell>
                                    <TableCell>Height</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell>RoleName</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.footballersList.map((record) => {
                                        const roleExists = record.role !== undefined & record.role.length>0;
                                        return (<TableRow key={record.personId} hover>
                                                <TableCell>{record.personId}</TableCell>
                                                <TableCell>{record.firstName}</TableCell>
                                                <TableCell>{record.middleName}</TableCell>
                                                <TableCell>{record.nationality}</TableCell>
                                                <TableCell>{record.dataOfBirth}</TableCell>
                                                <TableCell>{record.placeOfBirth}</TableCell>
                                                <TableCell>{record.height}</TableCell>
                                                <TableCell>{record.weight}</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        { roleExists &&
                                                        <li>{record.role[0].roleName}</li>
                                                        }
                                                    </ul>
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
    footballersList: state.footballers.footballers,
})

const mapDispatchToProp = {
    fetchAllFootBalers: actions.fetchAllWithRoles,
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(FootballersList));



