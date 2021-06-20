import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import {green, orange, blue} from '@material-ui/core/colors';



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



export const theme = createMuiTheme({
    palette: {
        success: {
            main:green[500],
            contrastText:'#fff'
        },
        warning: {
            main:orange[500],
            contrastText:'#fff'
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
            },
            contained:{
            },
            label: {
                textTransform: 'capitalize',
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
theme.palette.neutral =  theme.palette.augmentColor({
    main: blue.A400
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

