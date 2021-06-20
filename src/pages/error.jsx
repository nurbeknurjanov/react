import React, {useLayoutEffect} from "react";
import {setTitle} from "pages/duck";
import {connect} from "react-redux";
import {withRouter} from "react-router";

let Error = ({dispatch, history, error:{message, name}})=> {

    useLayoutEffect(()=>{
        dispatch(setTitle(name || 'Error'));
    },[dispatch, name]);

    return  <div>
        {message}
    </div>;
};

Error = connect()(Error);
Error = withRouter(Error);

export default Error;