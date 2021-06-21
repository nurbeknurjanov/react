import React from 'react';
import '../../css/index.css';
import Main from "./main";
import Main2 from "./main2";
import Header from "./header";
import {connect} from "react-redux";
import {globalContext} from "constants/contexts";
import {deleteCookie, getCookie, setCookie} from "helper/cookie";
import {setAuthorizedUserAction, initApplication as initApplicationAction, addFlash} from "pages/duck";
import ErrorHandler from "components/standard/error_handler";
import {auth, getAccessToken as getAccessTokenApi} from "api/common";
import awaitToJs from "await-to-js";
import "@fontsource/roboto";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme, HOCContainer} from "styles/material_styles";


class Base extends React.PureComponent
{
    constructor(props) {
        super(props);
        this.state = {
            layout: 'main',
        }
        this.changeLayout = this.changeLayout.bind(this);
        this.setAuthorizedUser = this.setAuthorizedUser.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.contextData = {
            changeLayout:this.changeLayout,
            setAuthorizedUser:this.setAuthorizedUser,
            getAccessToken:this.getAccessToken,
        }
    }
    changeLayout(layout){
        this.setState({
            layout: layout
        });
    }

    async getAccessToken(refreshToken){
        const {dispatch} = this.props;
        const [err, accessToken] = await awaitToJs(getAccessTokenApi(refreshToken));
        if(err){
            deleteCookie('refresh-token');//we delete not need old refresh-token
            dispatch(addFlash('error', err.message));
            return false;
        }
        if(accessToken){
            setCookie('access-token', accessToken);
            return accessToken;
        }
    }


    async setAuthorizedUser(accessToken){
        const {dispatch} = this.props;
        const [err, user] = await awaitToJs(auth(accessToken));
        if(err){
            deleteCookie('access-token');//we delete not need old access-token
            dispatch(addFlash('error', err.message));
            return dispatch(setAuthorizedUserAction(false));;
        }
        dispatch(setAuthorizedUserAction(user));
    }

    async initApplication(){
        const {dispatch} = this.props;

        dispatch(initApplicationAction(true));

        let refreshToken = getCookie('refresh-token');
        if(refreshToken){
            const accessToken = await this.getAccessToken(refreshToken);
            if(accessToken){
                /* eslint-disable no-unused-vars */
                const forRefreshAccessToken = setInterval(()=>this.getAccessToken(refreshToken), 4.5*60*1000);
                /* eslint-enable no-unused-vars */
                return await this.setAuthorizedUser(accessToken);
            }
            return dispatch(setAuthorizedUserAction(false));
        }
        return dispatch(setAuthorizedUserAction(false));
    }
    componentDidMount() {
        const {init} = this.props;
        if(!init)
            this.initApplication();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {layout} = this.state;
        const {authorizedUser} = this.props;

        //force wait authorization
        //else protected routers makes redirect
        if(authorizedUser===null)
            return '';

        return <>
            <globalContext.Provider value={this.contextData}>
                <ErrorHandler>
                    <ThemeProvider theme={theme}>
                        <ThemeProvider theme={theme=>  ({...theme}) }>
                            <HOCContainer>
                                <Header/>
                                {layout==='main' && <Main/>}
                                {layout==='main2' && <Main2/>}
                            </HOCContainer>
                        </ThemeProvider>
                    </ThemeProvider>
                </ErrorHandler>
            </globalContext.Provider>
        </>
    }
}

Base = connect((state)=>{
    return {
        authorizedUser:state.common.authorizedUser,
        init:state.common.init,
    }
})(Base);

export default Base;