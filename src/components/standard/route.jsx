import React from "react";
import {Route} from "react-router-dom";
import PropTypes from 'prop-types';
import {useLocation, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export const GuestRoute = (props)=>{
    const {authorizedUser} = useSelector(state => state.common);
    if(authorizedUser)
        return <Redirect to='/' />;
    return <Route {...props} />;
}

export const ProtectedRoute = ({roles, ...props})=>{
    const location = useLocation();
    const loginUrl = {pathname: '/login',  state:{ fromLocation: location}};

    const {authorizedUser} = useSelector(state => state.common);

    //I get there the role of authenticated user
    //then will check
    //if(roles.includes(authorizedUser.role))
    if(authorizedUser)
        return <Route {...props} />;
    return <Redirect to={loginUrl} />;
    //return <div>You are forbidden</div>;
}

ProtectedRoute.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.oneOf(['admin'])),
};
