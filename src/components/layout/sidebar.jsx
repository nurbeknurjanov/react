import React, {Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Link from 'components/standard/link';




const links = [
    {label:'Home', pathname:'/', exact:true },
    {label:'Users', pathname:'/users', /*search: new URLSearchParams({page:1}).toString(),*/ exact:false,
        items: [
            {label:'Create User', pathname:'/users/create'},
        ],
    },
    {label:'Simple', pathname:'/simple',  state: { fromDashboard: true }, exact:true},
    {label:'Test', pathname:'/test'},
    {label:'Mui', pathname:'/mui'},
]

const little = {
    a:()=>'Sidebar Component'
};
//const Comp = little;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Sidebar = ()=> {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = e => {
        e.preventDefault();
        setOpen(!open);
    };

    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                {links.map((el, index)=> {
                    if(!el.items)
                        return <ListItem button key={index} component={Link} to={{pathname: el.pathname, search: el.search, state: el.state}}>
                            <ListItemText primary={el.label} />
                        </ListItem>;

                    return <Fragment key={index}>
                        <ListItem button key={index} onClick={handleClick} >
                            <ListItemText primary={el.label} />  {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding >
                                <ListItem button key={index} component={Link} to={{pathname: el.pathname, search: el.search, state: el.state}}
                                          className={classes.nested}>
                                    <ListItemText primary={el.label} />
                                </ListItem>
                                {el.items.map((el, index)=>
                                    <ListItem button className={classes.nested} key={index}
                                              component={Link} to={{pathname: el.pathname, search: el.search, state: el.state}}
                                    >
                                        <ListItemText primary={el.label} />
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                    </Fragment>;
                })}



            </List>

            <Switch>
                <Route path="/sidebar" component={little.a} />
            </Switch>
        </>
    );
    //to={{...el}}  чтоб не было ссылки
}


/*function ActiveLink({ to, exact, ...rest }) {
    let match = useRouteMatch({
        path: to.pathname,
        exact: exact
    });

    //rest.children
    return <Link className={match ? "active" : ""}
                  to={to}
                  {...rest}
            />;
}*/

export default Sidebar;