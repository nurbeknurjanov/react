import React, {useRef} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import {withNamespaces} from "react-i18next";
import i18n from "../../i18n";
import {USER_STATUS_LABELS} from 'constants/user';
import {updateUser} from "api/users";
import {
    setAlert,
    addFlash,
} from "pages/duck";
import {connect} from "react-redux";
import awaitToJs from "await-to-js";
import {withRouter} from "react-router-dom";
import {FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField,
    InputLabel, FormHelperText, OutlinedInput} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import Button from "components/standard/button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

/* eslint-disable no-template-curly-in-string */

let ageOptions = [];
for(let i=18; i<=90; i++)
    ageOptions.push(i);

const GreenFormLabel = withStyles({
    root:{
        /*'&.Mui-focused': {
            color: green[600],
        },*/
        '&$focused':{
            color: green[600],
        }
    },
    focused: {},
})(FormLabel);
const GreenRadio = withStyles({
    root: {
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(Radio);


let UserUpdate = ({t, dispatch, user, handleClose, history})=>{

    const formRef = useRef();
    const initialValues = {...user};
    delete initialValues.id;
    delete initialValues.password;

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(10, 'Too Long!')
            //.required('Name is required'),
            .label(i18n.t('name'))
            .required(),
        email: Yup.string()
            .email()
            .label(i18n.t('email'))
            .required(),
        age: Yup.number()
            .label(i18n.t('age'))
            .required(),
        status: Yup.string().label(i18n.t('status')).required(),
    });

    async function onSubmit(values, {setSubmitting}){
        const [err] = await awaitToJs(updateUser(user.id, values));
        if(err)
            return dispatch(setAlert('error', err.message));
        dispatch(addFlash('success', 'You have successfully updated the user'));
        handleClose();
        history.replace('/users');
    }

    return (<>
        <DialogContent>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {
                    ({ errors, touched,
                      values, handleChange,handleBlur, handleSubmit }) =>{
                        formRef.current = handleSubmit;
                        return <Form>

                            <TextField
                                name='name'
                                label={t('name')}
                                value={values.name}
                                helperText={touched.name ? errors.name : ""}
                                error={touched.name && Boolean(errors.name)}

                                onChange={handleChange}
                                onBlur={handleBlur}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                /*FormHelperTextProps={}
                                InputProps={}
                                InputLabelProps={}*/
                            />

                            <FormControl variant="outlined" fullWidth  margin="dense" error={touched.email && Boolean(errors.email)}>
                                <InputLabel>{t('email')}</InputLabel>
                                <OutlinedInput name='email' value={values.email}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               label={t('email')} />
                                <FormHelperText>
                                    {touched.email ? errors.email : ""}
                                </FormHelperText>
                            </FormControl>


                            <TextField
                                select
                                name='age'
                                label={t('age')}
                                value={values.age}
                                onChange={handleChange}
                                helperText={touched.age ? errors.age : ""}
                                error={touched.age && Boolean(errors.age)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem key={0} value=''>Select</MenuItem>
                                {ageOptions.map(el => (
                                    <MenuItem key={el} value={el}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </TextField>


                            <FormControl component="fieldset" margin='dense'>
                                <GreenFormLabel component="legend" >{t('status')}</GreenFormLabel>
                                <RadioGroup name="status" value={values.status} onChange={handleChange}>
                                    {
                                        Object.entries(USER_STATUS_LABELS).map(obj => {
                                            const key   = obj[0];
                                            const label = obj[1];
                                            return <FormControlLabel  checked={key===String(values.status)}
                                                                      key={key} value={key}
                                                                      label={label}
                                                                      control={<GreenRadio />}  />;
                                        })
                                    }

                                </RadioGroup>
                            </FormControl>

                        </Form>
                    }
                }
            </Formik>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='contained'>
                Cancel
            </Button>
            <Button variant="contained" color='success' onClick={()=>formRef.current()}>{t('Update')}</Button>
        </DialogActions>
    </>);
}

UserUpdate = withRouter(UserUpdate);
UserUpdate = withNamespaces()(UserUpdate);
UserUpdate = connect()(UserUpdate);

export default UserUpdate;