import React from "react";
import {createMuiTheme, withStyles, makeStyles, styled} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
//import PropTypes from "prop-types";

export const HOCContainer = withStyles(theme=>({
    root: {
        maxWidth:'1024px',
        padding:theme.spacing(0, 3),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(0),
            //backgroundColor: theme.palette.secondary.main,
        },
    },
}))(Container);



const styledBy = (property, mapping) => props => mapping[props[property]];
const backgrounds = {
    default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
};

export const theme = createMuiTheme({
    palette: {
        /*primary: {
            main:'#009933'
        },*/
        /*secondary: {
            main: '#007bff'
        },*/
    },
    buttonStyles: {
        //red: {
        root: {
            background: ({color}) => color ? backgrounds[color]:backgrounds.default ,
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: styledBy('color', {
                default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }),
        },
        outlined:{

        },
        label: {
            textTransform: 'capitalize',
        },
    },
    typography: {
        //fontSize: 11,// works //'11px' wont work
        root:{
            //margin:10,//doesnt work
        },
        //body1 is default
        body2:{
            //color:'red'
        },
        body1:{
            //color:'orange !important',
        },
        //color:'red'//wont work
        //fontFamily:'Arial',//but this works, dont know why
        button: {
            //fontStyle: 'italic',
        },
    },


    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            root: {
                //fontSize: '0.8rem',
            },
            text: {
                // Some CSS
                //color: 'red',
            },
        },

        //https://material-ui.com/ru/customization/globals/
        //https://material-ui.com/ru/components/css-baseline/
        MuiCssBaseline: {
            '@global': {
                html: {
                    //WebkitFontSmoothing: 'auto',
                },
                '.MuiButton-root': {
                    //fontSize: '5rem',
                },
            },
        },
    },

    /*props: {
        // Название компоненты
        MuiButtonBase: {
            // Пример одного из стандартных свойств props
            disableRipple: true, // Скажи НЕТ эффекту расходящихся волн 💣!
        },
    },*/
});
theme.typography.h1 = {
    fontSize: '1.1rem',
    '@media (min-width:600px)': {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
        //color:'red',
        fontSize: '1.5rem',
    },
};



/*const useStyles = makeStyles({
    root: {
        color: 'red',
        '& p': {
            color: 'green',
            '& span': {
                color: 'blue'
            }
        }
    },
});*/


//https://material-ui.com/ru/customization/components/
/*export const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiButton-root': {
            fontSize: '10rem',
        },
    },
})(() => null);*/



export const HOCMuiButton = withStyles(theme=>theme.buttonStyles)(({ classes, color, ...other }) =>{
    return <Button classes={classes}  {...other} />;
});
/*const HOCMuiButton = withStyles(theme=>theme.buttonStyles)(Button);
HOCMuiButton.propTypes = {
    color: PropTypes.oneOf(['default', 'blue']),
}*/

// hook method
const useStyles = makeStyles(theme=>theme.buttonStyles);
export const HookMuiButton = ({color, ...other}) =>{
    const classes = useStyles({color});
    return <Button classes={classes} {...other} />;
    //return <Button classes={{root:classes.root, label: 'myLabel'}} {...other} />;
};



//const StyledMuiButton1 = styled(({color, ...other})=><Button {...other} />)(theme.buttonStyles.root);
export const StyledMuiButton = styled(({color, className, ...other})=>{
    return <Button classes={{root:className}} {...other} />;
})(
    ({theme, color, ...other})=>{
        const styles = theme.buttonStyles.root;
        const background = styles.background({color});
        const boxShadow = styles.boxShadow({color});
        return {...styles, background, boxShadow};
    }
);