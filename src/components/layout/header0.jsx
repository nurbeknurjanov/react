import React, {useContext} from 'react';
import {languageContext} from "constants/contexts";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {deleteCookie} from "helper/cookie";
import {setAuthorizedUserAction} from "pages/duck";
import {Menu, MenuItem, Button} from '@material-ui/core';
import {makeStyles, withStyles, styled} from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';


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

const backgrounds = {
    default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
};
const headerStyle = theme=>({
    root:{
        background: ({color}) => color ? backgrounds[color]:backgrounds.default ,
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
            <div className={classes.root}>
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
        <div className={classes.root}>
            {!authorizedUser && <LoginButton>Login</LoginButton>}
            {authorizedUser && <ProfileMenuButton name={authorizedUser.name} />}
            <LanguageSwitcher/>
        </div>
    </header>;
}*/





let Header = ({authorizedUser, className})=>{
    return <header>
        <div>
            HEADER
        </div>
        <div className={className}>
            {!authorizedUser && <LoginButton>Login</LoginButton>}
            {authorizedUser && <ProfileMenuButton name={authorizedUser.name} />}
            <LanguageSwitcher/>
        </div>
    </header>;
}
Header = connect(state=>({authorizedUser: state.common.authorizedUser}))(Header);
Header = styled(Header)(({theme, color})=>{
    const styles = headerStyle(theme).root;
    styles.background = styles.background({color});
    return styles;
});
const Header1 = props=> <Header {...props} color='blue'/>


ProfileMenuButton = connect()(ProfileMenuButton);
LanguageSwitcher = withRouter(LanguageSwitcher);

export default Header1;