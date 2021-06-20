import React from "react";
import {Typography} from "@material-ui/core";
//import {  useTheme, withTheme} from '@material-ui/core/styles';
import {MuiButton} from 'styles/material_styles';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return ({
        root: props => ({
            color: theme.color,
            backgroundColor: props.backgroundColor,
        }),
    });
});

const Component = props => {
    const classes = useStyles(props);
    const theme = useTheme();

    return (
        <div className={classes.root}>
            Theme color: {theme.color}
            <br />
            backgroundColor from props: {props.backgroundColor}
        </div>
    );
};
Component.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
};

export default function F() {
    const [backgroundColor, setBackgroundColor] = React.useState('#2196f3');
    const handleBackgroundColorChange = e => setBackgroundColor(e.target.value);

    const [color, setColor] = React.useState('#ffffff');
    const handleColorChange = e => setColor(e.target.value);


    return (
        <ThemeProvider theme={{ color:color }}>
            <fieldset>
                <div>
                    <label>theme color: </label>
                    <input type="color" onChange={handleColorChange} value={color} />
                </div>
                <div>
                    <label>background-color property: </label>
                    <input
                        type="color"
                        onChange={handleBackgroundColorChange}
                        value={backgroundColor}
                    />
                </div>
            </fieldset>
            <Component backgroundColor={backgroundColor} />
        </ThemeProvider>
    );
}


/*
let Mui = ({theme})=>{
    //const theme = useTheme();
    return <div>
        Mui
        <Typography>Typography</Typography>
        <MuiButton color='blue'>button</MuiButton>
    </div>
}

//Mui = withTheme(Mui);
export default Mui;*/
