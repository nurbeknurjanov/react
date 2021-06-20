import React from "react";
import {connect} from "react-redux";
import Link from "components/standard/link";
import {getBreadcrumbsSelector} from 'pages/duck';
import {Typography, Breadcrumbs as MuiBreadcrumbs} from '@material-ui/core';


const Li = ({el:{label, to}, el})=>{
    if(typeof el === 'string')
        return <Typography color="textPrimary">{el}</Typography>;
    return   <Link to={to} color="inherit" >{label}</Link>
}
let Breadcrumbs = ({breadcrumbs})=>{

    if(breadcrumbs.length===0)
        return '';

    return <MuiBreadcrumbs separator="›">
        <Link to='/' color="inherit" >Home</Link>
        {breadcrumbs.map((el, index)=><Li key={index} el={el} />)}
    </MuiBreadcrumbs>
};

Breadcrumbs = connect(state=>({breadcrumbs: getBreadcrumbsSelector(state)}))(Breadcrumbs);

export default Breadcrumbs;