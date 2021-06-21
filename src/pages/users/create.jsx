import React, {useLayoutEffect} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import {withNamespaces} from "react-i18next";
import i18n from "../../i18n";
import {USER_STATUS_LABELS} from 'constants/user';
import { UserStatus } from "api/users";
import {
    setAlert,
    addButton, addFlash,
    setBreadcrumbs,
    setTitle
} from "pages/duck";
import {connect} from "react-redux";
import {createUser} from "api/users";
import awaitToJs from "await-to-js";
import {withRouter} from "react-router-dom";
import Button,{BackButton} from "components/standard/button";
import {
    /*Typography, */TextField,
    FormControl, MenuItem,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

/* eslint-disable no-template-curly-in-string */

const GreenRadio = withStyles({
    root: {
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(Radio);
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

let ageOptions = [];
for(let i=18; i<=90; i++)
    ageOptions.push(i);


const initialValues = {
    /*email:'new@mail.ru',
    password:'123456',
    name: 'New guy',
    age: 20,*/
    status: UserStatus.ZERO_VALUE_REQUIRED,
};

let UserCreate = ({t, dispatch, history})=>{
    const title = t('user.create');
    useLayoutEffect(()=>{
        dispatch(setTitle(title));
        dispatch(addButton(<BackButton/>));
        dispatch(setBreadcrumbs([
            {label:t('users'), to:'/users'},
            title
        ]));
    },[dispatch, title]);

    const schema = Yup.object().shape({
        /*name: Yup.string()
            .min(3)
            .max(10, 'Too Long!')
            //.required('Name is required'),
            .label(i18n.t('name'))
            .required(),*/
        email: Yup.string()
            .email()
            .label(i18n.t('email'))
            .required(),
        password: Yup.string()
            .min(6)
            .label(i18n.t('password'))
            .required(),
        age: Yup.number()
            .label(i18n.t('age'))
            .required(),
        status: Yup.string().label(i18n.t('status')).required(),
    });

    async function onSubmit(values, {setSubmitting}){
        const [err, user] = await awaitToJs(createUser(values));
        if(err)
            return dispatch(setAlert('error', err.message));
        dispatch(addFlash('success', 'You have successfully created the user'));
        history.push('/users/'+user.id);
    }

    return <div>


        <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
        >
            {({ errors, touched, values, handleChange, handleBlur }) => {
                return   <Form>

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
                    />

                    <TextField
                        name='email'
                        label={t('email')}
                        value={values.email}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}

                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        name='password'
                        label={t('password')}
                        value={values.password}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}

                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />


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
                        <GreenFormLabel component="legend">{t('status')}</GreenFormLabel>
                        <RadioGroup name="status" value={values.status} onChange={handleChange}>
                            {
                                Object.entries(USER_STATUS_LABELS).map(obj => {
                                    const key   = obj[0];
                                    const label = obj[1];
                                    return <FormControlLabel  checked={key===String(values.status)}  key={key} value={key} control={<GreenRadio />} label={label} />;
                                })
                            }
                        </RadioGroup>
                    </FormControl>

                    <br/>
                    <Button type="submit" variant="contained" color='success'>{t('create')}</Button>
                </Form>;
            }}
        </Formik>
    </div>
}

UserCreate = withRouter(UserCreate);
UserCreate = withNamespaces()(UserCreate);
UserCreate = connect()(UserCreate);

export default UserCreate;