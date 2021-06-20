import React, {useContext} from 'react';
import {languageContext} from "constants/contexts";
import {connect} from "react-redux";
import {withRouter, Link as RouterLink} from "react-router-dom";
import {deleteCookie} from "helper/cookie";
import {setAuthorizedUserAction} from "pages/duck";
import {Menu, MenuItem, Button, Paper, Link as MuiLink} from '@material-ui/core';
import {/*makeStyles, withStyles, */styled} from '@material-ui/core/styles';


let LanguageSwitcher = (  {location, history} )=>{
    const currentLanguage = useContext(languageContext);
    function changeLanguage(language){
        const loc = {...location, language};
        history.push(loc);
        /*this.setState({
            count:this.state.count+1
        })*/
        /*this.setState((oldState, oldProps) => {
            return {count: oldState.count+1};
        });*/
    }

    function renderButton() {
        return <Button
            variant='outlined'
            onClick={() => changeLanguage(currentLanguage==='en' ? 'ru':'en')}>
            {currentLanguage==='en' ? 'RU':'EN'}
        </Button>;
    }

    return renderButton();
}

let LoginButton = ()=><Button to='/login' component={RouterLink} variant='outlined' color='primary' children={'Login'}/>;

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
        '& > button + button':{
            marginLeft: theme.spacing(1)
        }
    }
});


/*class Header extends React.Component
{
    render() {
        const {authorizedUser, classes} = this.props;
        return <header>
            <div>
                HEADER
            </div>
            <div className={classes.buttonsContainer}>
                {!authorizedUser && <LoginButton>Login</LoginButton>}
                {authorizedUser && <ProfileMenuButton name={authorizedUser.name} />}
                <LanguageSwitcher/>
            </div>
        </header>;
    }
}
Header = connect(state=>({authorizedUser: state.common.authorizedUser})
)(Header);
let StyledHeader = withStyles(headerStyle)(Header);
let StyledHeader1 = props => <StyledHeader {...props} color='blue'/>*/




/*const useStyles = makeStyles(headerStyle);
let Header = ({authorizedUser})=>{
    const classes = useStyles({color:'blue'});
    return <header>
        <div>
            HEADER
        </div>
        <div className={classes.buttonsContainer}>
            {!authorizedUser && <LoginButton>Login</LoginButton>}
            {authorizedUser && <ProfileMenuButton name={authorizedUser.name} />}
            <LanguageSwitcher/>
        </div>
    </header>;
}*/







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
/*const StyledPaper  = withStyles(theme=>({
    root:{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}))(Paper);*/
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