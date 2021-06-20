import React  from 'react';
import Content from "./content";
import Breadcrumbs from "components/standard/breadcrumbs";
import Alerts from "components/standard/alerts";
import Flashes from "components/standard/flashes";
import Title from "components/standard/title";
import Buttons from "components/standard/buttons";

import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        //color: theme.palette.text.secondary,
    },
}));

const Main = ()=>{
    const classes = useStyles();

    return <main className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Paper className={classes.paper}>


                    <Breadcrumbs/>
                    <Alerts/>
                    <Flashes/>
                    <div className='content-header'>
                        <Title/>
                        <Buttons/>
                    </div>
                    <Content/>

                </Paper>
            </Grid>
        </Grid>
    </main>;
}

export default Main;