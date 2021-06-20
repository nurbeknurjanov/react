import React from "react";
import {Typography, Chip, Box} from "@material-ui/core";
//import {  useTheme, withTheme} from '@material-ui/core/styles';
//import { compose, spacing, palette, style } from '@material-ui/system';
//import PropTypes from 'prop-types';
import { /*useTheme, */styled } from '@material-ui/core/styles';


/*const borderColorStyle = style({
    prop: 'bc',
    cssProperty: 'borderColor',
    themeKey: 'palette',
    transform: value => `${value} !important`,
});
const Colored = styled('div')(compose(borderColorStyle));*/
//const Colored = styled.div`${borderColorStyle}`;


/*const Text = styled('div')({
    color:'red'
});*/
const Text = styled(Typography)({
    color:'red'
});
//const Text = styled('div')(compose(spacing, palette));

let Mui = ({theme})=>{
    //const theme = useTheme();

    return <div>

        <Text>Text</Text>
        {/*<Text mx={2} component='div' color="white" bgcolor="red" >Text</Text>
        <Text mx={2} component='div'
            color="secondary.main"
            bgcolor="background.paper"

            fontFamily="h6.fontFamily"
            fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
            p={{ xs: 2, sm: 3, md: 4 }}
        >Text</Text>*/}

        {/*<Box color="success.main">Box color=success.main</Box>*/}
        {/*<Colored bc="primary.main" style={{border:'1px solid'}}>Colored</Colored>*/}
        <Typography color='primary'>Typography color='primary'</Typography>
        <Typography>Clean Typography</Typography>
        <Typography variant="body2" component='span'>subtitle</Typography>

        <Box textAlign="right" mr={2}>Box</Box>

        <br/>
        <Chip label='Chip' component="a" href="/" />
    </div>
}

//Mui = withTheme(Mui);
export default Mui;
