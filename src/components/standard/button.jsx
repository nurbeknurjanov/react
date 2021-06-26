import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import PropTypes from 'prop-types';
import {fade} from "@material-ui/core/styles/colorManipulator";
import {theme} from "styles/material_styles";
import {withRouter} from "react-router";
import {withNamespaces} from "react-i18next";
import {useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

//eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const colors = ['info', 'success', 'warning', 'error', 'danger', 'neutral'];

const containedStyle = ({color})=>{
    if(color && colors.includes(color))
        return {
            color: theme.palette[color].contrastText,
            backgroundColor: theme.palette[color].main,
            '&:hover': {
                backgroundColor: theme.palette[color].dark,
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: theme.palette[color].main
                }
            },
        };
    return {};
};
const outlinedStyle = ({color})=>{
    if(color && colors.includes(color))
        return {
            color: theme.palette[color].main,
            border: `1px solid ${fade(theme.palette[color].main, 0.5)}`,
            "&:hover": {
                border: `1px solid ${theme.palette[color].main}`,
                backgroundColor: fade(
                    theme.palette[color].main,
                    theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: "transparent"
                }
            }
        };
    return {};
};
const textStyle = ({color})=>{
    if(color && colors.includes(color))
        return {
            color: theme.palette[color].main,
            "&:hover": {
                backgroundColor: fade(
                    theme.palette[color].main,
                    theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: "transparent"
                }
            }
        };
    return {};
};

theme.buttonStyles = {};
colors.forEach(color=>{
    theme.buttonStyles['contained'+ color.capitalize()] = containedStyle;
    theme.buttonStyles['outlined'+ color.capitalize()] = outlinedStyle;
    theme.buttonStyles['text'+ color.capitalize()] = textStyle;
});


const ColoredMuiButton = withStyles(theme=>theme.buttonStyles)(({ classes, color, buttonRef, ...props }) =>{
    if(['primary', 'secondary', 'default'].includes(color))
        return <Button {...props} color={color} ref={buttonRef}/>;

    const classNames = {};
    if(props.variant && color){
        const className = classes?.[`${props.variant}${color.capitalize()}`];
        if(className)
            classNames[props.variant] = className;
    }
    return <Button classes={classNames} {...props} ref={buttonRef} />;
});

ColoredMuiButton.propTypes = {
    color: PropTypes.oneOf(['success', 'danger', 'error', 'warning', 'info', 'neutral',
        'primary', 'secondary', 'default']),
}
const ColoredMuiButtonForwardRef = React.forwardRef((props, ref)=><ColoredMuiButton {...props} buttonRef={ref}/>)
export default ColoredMuiButtonForwardRef;


export let BackButton = ({history, t})=><ColoredMuiButton onClick={()=>history.goBack()} variant='outlined' color='info'>{t('Back')}</ColoredMuiButton>;
BackButton = withRouter(BackButton);
BackButton = withNamespaces()(BackButton);

export const SubmitButton = props=>{
    const loading = useSelector(state => state.common.loading);
    return <ColoredMuiButton type='submit'  startIcon={loading && <CircularProgress size={20} color='inherit' />} {...props} />;
};








// hook method
/*const useStyles = makeStyles(theme=>theme.buttonStyles);
export const HookMuiButton = ({color, ...other}) =>{
    const classes = useStyles({color});
    return <Button classes={classes} {...other} />;
    //return <Button classes={{root:classes.root, label: 'myLabel'}} {...other} />;
};*/

// styled method
//const StyledMuiButton1 = styled(({color, ...other})=><Button {...other} />)(theme.buttonStyles.root);
/*export const StyledMuiButton = styled(({color, className, ...other})=>{
    return <Button classes={{root:className}} {...other} />;
})(
    ({theme, color, ...other})=>{
        const styles = theme.buttonStyles.root;
        const background = styles.background({color});
        const boxShadow = styles.boxShadow({color});
        return {...styles, background, boxShadow};
    }
);*/
