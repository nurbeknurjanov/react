import React, {useContext} from 'react';
import {languageContext} from "constants/contexts";
import {connect} from "react-redux";
import {withRouter, Link as RouterLink} from "react-router-dom";
import {deleteCookie} from "helper/cookie";
import {setAuthorizedUserAction} from "pages/duck";
import {Menu, MenuItem, Paper, Link as MuiLink} from '@material-ui/core';
import {styled} from '@material-ui/core/styles';
import {withNamespaces} from "react-i18next";
import Button from 'components/standard/button';

let LanguageSwitcher = (  {location, history} )=>{
    const currentLanguage = useContext(languageContext);
    function changeLanguage(language){
        const loc = {...location, language};
        history.push(loc);
    }

    function renderButton() {
        return <Button
            color='success'
            variant='outlined'
            onClick={() => changeLanguage(currentLanguage==='en' ? 'ru':'en')}>
            {currentLanguage==='en' ? 'RU':'EN'}
        </Button>;
    }

    return renderButton();
}

let LoginButton = ({t})=><Button to='/login' component={RouterLink} variant='contained' color='success' children={t('login')}/>;
LoginButton = withNamespaces()(LoginButton);

let ProfileMenuButton = ({name, dispatch}) => {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => setOpen(true);

    const handleClose = () => setOpen(false);

    function logout(){
        deleteCookie('access-token');
        deleteCookie('refresh-token');
        dispatch(setAuthorizedUserAction(false));
    }

    return (
        <>
            <Button  ref={inputRef} onClick={handleClick} variant='outlined' color='primary'>
                {name}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={inputRef.current}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
}

const headerStyle = theme=>({
    buttonsContainer:{
        '& > * + *':{
            marginLeft: theme.spacing(1)
        }
    }
});







//hook method
/*
const useStyles = makeStyles(theme=>({
    root:{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));
const StyledPaper  = (props)=>{
    const classes = useStyles(props);
    return <Paper classes={classes} {...props}/>
};
*/

//HOC method
/*const StyledPaper  = withStyles(theme=>({
    root:{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}))(Paper);*/
//styled method
const StyledPaper  = styled(props=>'no matter')(({theme})=>({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));
let Header = ({authorizedUser, className})=>{
    return <StyledPaper component={({className, ...props})=><Paper classes={{root:className}} {...props} component='header' />} >
        <MuiLink component={RouterLink} to='/'>
            LOGO
        </MuiLink>
        <div className={className}>
            {!authorizedUser && <LoginButton>Login</LoginButton>}
            {authorizedUser && <ProfileMenuButton name={authorizedUser.name} />}
            <LanguageSwitcher/>
        </div>
    </StyledPaper>;
}
Header = connect(state=>({authorizedUser: state.common.authorizedUser}))(Header);
Header = styled(Header)(({theme})=>{
    return headerStyle(theme).buttonsContainer;
});


ProfileMenuButton = connect()(ProfileMenuButton);
LanguageSwitcher = withRouter(LanguageSwitcher);

export default Header;