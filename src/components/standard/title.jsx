import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";

let Title = ({title})=><Typography variant='h1'>{title}</Typography>;
Title.propTypes = {
    title: PropTypes.string
};
Title = connect(state=>({title: state.common.title}))(Title);

export default Title;