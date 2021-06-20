import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";

let Title = ({title})=>{
    return <>
        <Typography variant='h1'>{title}</Typography>
        {/*<Typography color={'secondary'}>{title}</Typography>*/}
        {/*<Typography variant='body2'>{title}</Typography>*/}
    </>;
};
Title.propTypes = {
    title: PropTypes.string
};
Title = connect(state=>({title: state.common.title}))(Title);

export default Title;