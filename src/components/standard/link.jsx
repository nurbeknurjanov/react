import React, {useContext} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Link as MuiLink} from "@material-ui/core";
import {languageContext} from "constants/contexts";

export const addLanguageToUrl = (to, language)=>{
    let url = '/';
    if(typeof to === 'object' && to !== null){
        url = to.pathname;
    }else
        url = to;

    if(language && language!=='en'){
        if (!url.includes('/'+language))//чтоб не повторяло
        {
            if(url==='/')
                url = '';
            url = '/'+language+url;
        }
    }

    if(typeof to === 'object' && to !== null){
        to.pathname = url;
    }else
        to = url;
    return to;
}
export const useLanguageToUrl = (to)=>{
    const language = useContext(languageContext);
    return addLanguageToUrl(to, language);
}



/*
LinkCleanNotNeededProps.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        //PropTypes.object,
        PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        })
    ]),
    //element:PropTypes.element //<input />, or <ReactComponent/>
    //element:PropTypes.elementType //ReactComponent
};
*/


export const Link = React.forwardRef(({to, ...other}, ref) => {
    const url = useLanguageToUrl(to ? to: '');
    return <RouterLink {...other} to={url} ref={ref} />;
});

const MuiLinkExtended = React.forwardRef((props, ref) => {
    return <MuiLink {...props}  component={Link} ref={ref} />;
});

export default MuiLinkExtended;