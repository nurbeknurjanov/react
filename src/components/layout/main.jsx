import React  from 'react';
import Sidebar from "./sidebar";
import Content from "./content";
import Title from "../standard/title";
import Breadcrumbs from "../standard/breadcrumbs";
import Alerts from "../standard/alerts";
import Flashes from "components/standard/flashes";
import Buttons from "../standard/buttons";

import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Card, CardContent} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
    },
    paper: {
        padding: theme.spacing(1),
    },
    cardContainer: {
        padding: theme.spacing(1),
    },
}));

const Main = ()=>{
    const classes = useStyles();

    return <Grid container spacing={3} component={'main'} className={classes.root}>
        <Grid item sm={3} xs={12} component='section' >
            <Card>
                <CardContent className={classes.cardContainer}>
                    <Sidebar/>
                </CardContent>
            </Card>
        </Grid>
        <Grid item sm={9} xs={12} component='section' >
            <Paper className={classes.paper}  >

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
    </Grid>;

}

export default Main;