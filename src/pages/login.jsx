import React, {useContext, useLayoutEffect} from "react";
import {withRouter} from "react-router";
import { Form, Formik} from "formik";
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
import {TextField} from "@material-ui/core";
import Button from 'components/standard/button';

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
    const title = t('login');
    useLayoutEffect(()=>{
        const d = dispatch;
        d(setTitle(title));
        d(setBreadcrumbs([title]));
        return ()=>{
            d(clearTitle());
            d(clearBreadcrumbs());
        }
    },[dispatch, history,title ]);

    return <div>

        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values,
                  handleChange, handleBlur }) => {
                return   <Form>

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
                    />

                    <br/>

                    <TextField
                        type='password'
                        name='password'
                        label={t('password')}
                        value={values.password}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}

                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="dense"
                        variant="outlined"
                    />
                    <br/>
                    <Button type="submit" color='success' variant='outlined'>{t('submit')}</Button>
                </Form>;
            }}
        </Formik>

    </div>
}

Login = connect()(Login);
Login = withRouter(Login);
Login = withNamespaces()(Login);
export default Login;