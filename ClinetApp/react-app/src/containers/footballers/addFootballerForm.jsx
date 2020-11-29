import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "../../components/useForm";
import { connect } from "react-redux";
import * as actions from "./footballersActions";
import  {fetchAll} from "../roles/rolesActions"
import { useToasts } from "react-toast-notifications";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    firstName:'',
    middleName:'',
    roleId:1,
    dataOfBirth: '',
    height: 180.0,
    nationality: 'Ukrainian',
    placeOfBirth: 'Ukraine',
    weight: 69.0
}

const FootballerForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()
   /* const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };*/

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('middleName' in fieldValues)
            temp.middleName= fieldValues.middleName ? "" : "This field is required."
        if ('dataOfBirth' in fieldValues)
            temp.dataOfBirth = fieldValues.dataOfBirth ? "" : "This field is required."
        if ('height' in fieldValues)
            temp.height = fieldValues.height ? "" : "This field is required."
        if ('nationality' in fieldValues)
            temp.nationality = fieldValues.nationality ? "" : "This field is required."
        if ('placeOfBirth' in fieldValues)
            temp.placeOfBirth = fieldValues.placeOfBirth ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight = fieldValues.weight? "" : "This field is required."    
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createFootballer(values, onSuccess)
            else
                props.updateFootballer(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.footballers.find(x => x.personId == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="FirstName"
                        variant="outlined"
                        label="First Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.firstName && { error: true, helperText: errors.firstName })}
                    />
                    <TextField
                        name="MiddleName"
                        variant="outlined"
                        label="Middle Name"
                        value={values.middleName}
                        onChange={handleInputChange}
                        {...(errors.middleName && { error: true, helperText: errors.middleName })}
                    />
                    <TextField
                        name="nationality"
                        variant="outlined"
                        label="nationality"
                        value={values.nationality}
                        onChange={handleInputChange}
                        {...(errors.nationality && { error: true, helperText: errors.nationality})}
                    />
                    <TextField
                        name="placeOfBirth"
                        variant="outlined"
                        label="Place Of Birth"
                        value={values.placeOfBirth}
                        onChange={handleInputChange}
                        {...(errors.placeOfBirth && { error: true, helperText: errors.placeOfBirth})}
                    />
                    
                    <FormControl variant="outlined"
                                 className={classes.formControl}
                                 {...(errors.roleId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Role in comand</InputLabel>

                        <Select
                            name="roleId"
                            value={values.roleId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            {props.roles.map((r,index)=>
                                <MenuItem value={r.roleId} >{r.roleName}</MenuItem>
                            )}
                        </Select>
                        {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
                    </FormControl>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={6}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        name="dataOfBirth"
                        label="Data Of Birth"
                        format="MM/dd/yyyy"
                        value={values.dataOfBirth}
                        onChange={handleInputChange}
                        {...(errors.dataOfBirth && { error: true, helperText: errors.dataOfBirth })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <TextField
                        name="height"
                        variant="outlined"
                        label="height"
                        value={values.height}
                        onChange={handleInputChange}
                        {...(errors.height && { error: true, helperText: errors.dataOfBirth })}
                    />
                    <TextField
                        name="weight"
                        variant="outlined"
                        label="weight"
                        value={values.weight}
                        onChange={handleInputChange}
                        {...(errors.weight && { error: true, helperText: errors.weight})}
                    />
                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    roles: state.roles.roles,
    footballers:state.footballers.footballers
})

const mapActionToProps = {
    createFootballer: actions.addFootballer,
    updateFootballer: actions.updateFootballer
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));