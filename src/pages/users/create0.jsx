import React, {Fragment, useLayoutEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
//import Form from '../../components/tutorial/formik/depend';

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
    IconButton, Link as MuiLink,
    Typography, TextField,
    FormControl, InputLabel, Select,MenuItem,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

/* eslint-disable no-template-curly-in-string */

let options = [<option key={0}>Выбрать</option>];
for(let i=20; i<=80; i++)
    options = [...options, <option value={i} key={i}>{i}</option>];



const initialValues = {
    name: 'New guy',
    age: 20,
    status: UserStatus.ZERO_VALUE_REQUIRED,
    email:'new@mail.ru',
    password:'123456',
};

let UserCreate = ({t, dispatch, history})=>{

    useLayoutEffect(()=>{
        dispatch(setTitle('Create User'));
        dispatch(addButton(<BackButton/>));
        dispatch(setBreadcrumbs([
            {label:'Users', to:'/users'},
            'Create User'
        ]));
    },[dispatch]);

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
        //alert(JSON.stringify(values));
        //setSubmitting(false);
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

                    <fieldset>
                        <legend>{t('name')}</legend>
                        <Field name="name" />
                        <ErrorMessage name="name" />
                    </fieldset>

                    <fieldset>
                        <legend>{t('email')}</legend>
                        <Field name="email" />
                        <ErrorMessage name="email" />
                    </fieldset>

                    <fieldset>
                        <legend>{t('password')}</legend>
                        <Field name="password" />
                        <ErrorMessage name="password" />
                    </fieldset>





                    <fieldset>
                        <legend>{t('age')}</legend>
                        <Field name="age" as="select" >
                            {
                                /*Object.entries(USER_STATUS_LABELS).map(obj => {
                                    const key   = obj[0];
                                    const label = obj[1];
                                    return <option value={key} key={key}>{label}</option>
                                })*/
                                options
                            }
                        </Field>
                        <ErrorMessage component="div" name="age" />
                    </fieldset>

                    <fieldset>
                        <legend>{t('status')}</legend>
                        {
                            Object.entries(USER_STATUS_LABELS).map(obj => {
                                const key   = obj[0];
                                const label = obj[1];
                                return <Fragment  key={key}>
                                    <label>
                                        <Field type="radio"
                                               name="status"
                                               value={key}
                                               checked={key===String(values.status)}
                                        />
                                        {label}
                                    </label>
                                    <br/>
                                </Fragment>;
                            })
                        }
                        <ErrorMessage name="status" >{msg => <div>{msg}</div>}</ErrorMessage>
                        {/*<ErrorMessage render={message=><div>{message}</div>} name="status"/>*/}
                        {/*<ErrorMessage component={({children})=><div>{children}</div>} name="status"/>*/}
                    </fieldset>

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