import React, {useContext, useLayoutEffect} from "react";
import {withRouter} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import i18n from "../i18n";
import {withNamespaces} from "react-i18next";
import {
    clearBreadcrumbs,
    clearTitle, setAlert,
    setBreadcrumbs,
    setTitle
} from "pages/duck";
import {setCookie} from "helper/cookie";
import {globalContext} from "constants/contexts";
import {connect} from "react-redux";
import {login} from "api/common";
import awaitToJs from "await-to-js";

let Login = ({t, dispatch, history, location})=>{
    const fromLocation = location.state && location.state.fromLocation;
    const {setAuthorizedUser, getAccessToken} = useContext(globalContext);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .label(i18n.t('email'))
            .required(),
        password: Yup.string()
            .label(i18n.t('password'))
            .required(),
    });
    const initialValues = {
        email: 'alan@mail.ru',
        password: '123123',
    };
    const onSubmit = async (values, {setSubmitting}) => {
        //alert(JSON.stringify(values));
        //setSubmitting(false);
        const [err, refreshToken] = await awaitToJs(login(values));
        if(err){
            dispatch(setAlert('error', err.message));
        }
        if(refreshToken){
            setCookie('refresh-token', refreshToken);
            const accessToken = await getAccessToken(refreshToken);
            if(accessToken){
                await setAuthorizedUser(accessToken);
                history.push( fromLocation ? fromLocation: '/');
            }
        }
    }

    useLayoutEffect(()=>{
        dispatch(setTitle('Login'));
        dispatch(setBreadcrumbs(['Login']));
        return ()=>{
            dispatch(clearTitle());
            dispatch(clearBreadcrumbs());
        }
    },[dispatch, history]);

    return <div>

        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values:{status} }) => {
                return   <Form>
                    <fieldset>
                        <legend>{t('email')}</legend>
                        <Field name="email" />
                        <ErrorMessage name="email" component='div' />
                    </fieldset>

                    <fieldset>
                        <legend>{t('password')}</legend>
                        <Field name="password" type='password' />
                        <ErrorMessage name="password" component='div' />
                    </fieldset>
                    <br/>
                    <button type="submit">{t('submit')}</button>
                </Form>;
            }}
        </Formik>

    </div>
}

Login = connect()(Login);
Login = withRouter(Login);
Login = withNamespaces()(Login);
export default Login;