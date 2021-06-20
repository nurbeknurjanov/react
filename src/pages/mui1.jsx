import React from "react";
import {Typography} from "@material-ui/core";
//import {  useTheme, withTheme} from '@material-ui/core/styles';
import {MuiButton} from 'styles/material_styles';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: (props) => ({
        backgroundColor: props.backgroundColor,
        color: theme.color,
    }),
}));

const Component = React.memo((props) => {
    const classes = useStyles(props);
    const theme = useTheme();

    const rendered = React.useRef(1);
    React.useEffect(() => {
        rendered.current ++;
    });

    return (
        <div className={classes.root}>
            rendered {rendered.current} times
            <br />
            color: {theme.color}
            <br />
            backgroundColor: {props.backgroundColor}
        </div>
    );
});

Component.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
};

export default function StressTest() {
    const [backgroundColor, setBackgroundColor] = React.useState('#2196f3');
    const handleBackgroundColorChange = (event) => {
        setBackgroundColor(event.target.value);
    };

    const [color, setColor] = React.useState('#ffffff');
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const theme = React.useMemo(() => ({ color }), [color]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <fieldset>
                    <div>
                        <label htmlFor="color">theme color: </label>
                        <input id="color" type="color" onChange={handleColorChange} value={color} />
                    </div>
                    <div>
                        <label htmlFor="background-color">background-color property: </label>
                        <input
                            id="background-color"
                            type="color"
                            onChange={handleBackgroundColorChange}
                            value={backgroundColor}
                        />
                    </div>
                </fieldset>
                <Component backgroundColor={backgroundColor} />
            </div>
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
