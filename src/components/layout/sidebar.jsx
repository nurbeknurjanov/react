import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Link from 'components/standard/link';




const links = [
    {label:'Home', pathname:'/' },
    {label:'Users', pathname:'/users',
        items: [
            {label:'Create User', pathname:'/users/create'},
        ],
    },
]

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
    );
}

export default Sidebar;