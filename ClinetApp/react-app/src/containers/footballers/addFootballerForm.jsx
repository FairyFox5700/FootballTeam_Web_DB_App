import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "../../components/useForm";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from "./footballersActions";
import  {fetchAll} from "../roles/rolesActions"
import { useToasts } from "react-toast-notifications";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import {fetchAllWithRoles} from "./footballersActions";
import {fetchByPlayerId} from "../clubs/footballClubsAction";
import api from "./api";

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
    firstName: 'I',
    middleName: '',
    roleId: 1,
    dataOfBirth: new Date('2014-08-18T21:11:54'),
    height: '',
    nationality: '',
    placeOfBirth: '',
    weight: ''
};

const FootballerForm = ({match, classes, ...props  }) => {
    const {
        params: { personId },
    } = match;
    //toast msg.
    const { addToast } = useToasts()
    const minValue = min => value =>
        value && value < min ? `Must be at least ${min}` : undefined

    const validateWeight = values => {
        if (!values.weight) {
            return 'Weight is required field'
        }
        if (values.weight < 19) {
            return 'Weight is too small...'
        }
        if (values.weight > 200) {
            return 'Weight is too high...'
        }
        if (!(/\d+(\.\d{1,2})?/).test(values.weight)) {
            return "Weight is  not valid."
        }
        else
            return "";
    }

    const validateHeight = values => {
        if (!values.height) {
            return 'Height is required field'
        }
        if (values.height < 100) {
            return 'Height is too small...'
        }
        if (values.height > 240) {
            return 'Height is too high...'
        }
        if (!(/\d+(\.\d{1,2})?/).test(values.height)) {
            return "Height is  not valid..."
        }
        else
            return "";
    }
        
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('middleName' in fieldValues)
            temp.middleName= fieldValues.middleName ? "" : "This field is required."
        if ('dataOfBirth' in fieldValues)
            temp.dataOfBirth = fieldValues.dataOfBirth ? "" : "This field is required."
        if ('height' in fieldValues)
            temp.height =validateHeight(fieldValues)
        if ('nationality' in fieldValues)
            temp.nationality = fieldValues.nationality ? "" : "This field is required."
        if ('placeOfBirth' in fieldValues)
            temp.placeOfBirth = fieldValues.placeOfBirth ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight =validateWeight(fieldValues) 
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId? "" : "This field is required."
        setErrors({
            ...temp
        })
    
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const dispatch = useDispatch();
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate)//, props.setCurrentId
    

    

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        console.log('personId')
        console.log(personId)
        props.fetchAllRoles();
        
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (personId===undefined)
                props.createFootballer(values,onSuccess)
            else
                props.updateFootballer(personId, values,onSuccess)
        }
    }
  
    const clubDetails = useSelector((state) => state.footballers);
    const { footballer , loading, error } = clubDetails;


    useEffect( () => {
        if (!(personId===undefined) ) {
            try {
                  dispatch(actions.fetchById(personId))
                console.log("adsasdasdasdasda")
                console.log(footballer )
              

                return () => {
                };
       
            } catch (err) {
                console.log(err.message)
            }
        }
    }, [personId])
    
    
    const handleDateChange = (date) => {
        const fieldValue = { ['dataOfBirth']: date }

        setValues({
            ...values,
            ...fieldValue
        })
    };
    
    useEffect(()=>{
        if(!loading){
            setValues(footballer)
        }
    },[loading])
    return (


                    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                        {props.rolesIsLoading ?
                            (<div>Loading...</div>) : (
                
                                <Grid container
                                      spacing={0}
                                      direction="column"
                                      alignItems="center"
                                      justify="center"
                                      style={{minHeight: '100vh'}}>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="firstName"
                                            variant="outlined"
                                            label="First Name"
                                            value={values.firstName}
                                            onChange={handleInputChange}
                                            {...(errors.firstName && {error: true, helperText: errors.firstName})}
                                           
                                        />
                                        <TextField
                                            name="middleName"
                                            variant="outlined"
                                            label="Middle Name"
                                            value={values.middleName}
                                            onChange={handleInputChange}
                                            {...(errors.middleName && {error: true, helperText: errors.middleName})}
                                        />
                                        <TextField
                                            name="nationality"
                                            variant="outlined"
                                            label="Nationality"
                                            value={values.nationality}
                                            onChange={handleInputChange}
                                            {...(errors.nationality && {error: true, helperText: errors.nationality})}
                                        />
                                        <TextField
                                            name="placeOfBirth"
                                            variant="outlined"
                                            label="Place Of Birth"
                                            value={values.placeOfBirth}
                                            onChange={handleInputChange}
                                            {...(errors.placeOfBirth && {error: true, helperText: errors.placeOfBirth})}
                                        />

                                        <FormControl variant="outlined"
                                                     className={classes.formControl}
                                                     {...(errors.roleId && {error: true})}
                                        >
                                            <InputLabel ref={inputLabel}>Role in comand</InputLabel>

                                            <Select
                                                name="roleId"
                                                value={values.roleId}
                                                onChange={handleInputChange}
                                                labelWidth={labelWidth}
                                            >
                                                {props.roles.map((r, index) =>
                                                    <MenuItem value={r.roleId} key={r.roleId}>{r.roleName}</MenuItem>
                                                )}
                                            </Select>
                                            {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
                                        </FormControl>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                name="dataOfBirth"
                                                value={values.dataOfBirth}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                           

                                            <TextField
                                                name="height"
                                                variant="outlined"
                                                type='number'
                                                label="height"
                                                value={values.height}
                                                onChange={handleInputChange}
                                                {...(errors.height && {error: true, helperText: errors.height})}
                                            />
                                            <TextField
                                                name="weight"
                                                variant="outlined"
                                                label="weight"
                                                type='number'
                                                value={values.weight}
                                                onChange={handleInputChange}
                                                {...(errors.weight && {error: true, helperText: errors.weight})}
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

                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </form>
    );
       
    }


const mapStateToProps = state => ({
    roles: state.roles.roles,
    footballers:state.footballers.footballers,
    rolesIsLoading: state.roles.loading,
    rolesError:state.roles.error,
    footballer: state.footballers.footballer
})

const mapActionToProps = {
    createFootballer: actions.addFootballer,
    updateFootballer: actions.updateFootballer,
    deleteFootballer:actions.deleteFootballer,
    fetchAllRoles: fetchAll,
    getFootballerById: actions.fetchById
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FootballerForm));