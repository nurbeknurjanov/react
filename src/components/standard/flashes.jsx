import React from "react";
import {connect} from "react-redux";
import {removeFlash} from "pages/duck";
import {Alert as MuiAlert} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";

let Flash = ({el:{key, text}, dispatch})=>{
    const click = ()=>dispatch(removeFlash(key));
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

let Flashes = ({flashes})=>{
    const classes = useStyles();
    return <div className={classes.root}>
        {flashes.map((el, index)=><Flash key={index} el={el} />)}
    </div>
};

Flashes = connect(state=>({flashes:state.common.flashes}))(Flashes);
Flash = connect()(Flash);
export default Flashes;