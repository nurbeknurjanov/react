import React from "react";
import {connect} from "react-redux";
import {removeAlert} from "pages/duck";
import { makeStyles } from '@material-ui/core/styles';
import {Alert as MuiAlert} from '@material-ui/lab';



let Alert = ({el:{key, text}, dispatch})=>{
    const click = ()=>dispatch(removeAlert(key));
    return <MuiAlert severity={key} onClose={click}>
        {text}
    </MuiAlert>
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
let Alerts = ({alerts})=>{
    const classes = useStyles();

    return <div className={classes.root}>
        {alerts.map((el, index)=><Alert key={index} el={el} />)}
    </div>
};

Alerts = connect(state=>({alerts:state.common.alerts}))(Alerts);
Alert = connect()(Alert);
export default Alerts;