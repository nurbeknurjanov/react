import React from "react";
import PropTypes from "prop-types";
import {useLocation, withRouter} from "react-router";
import {makeStyles} from '@material-ui/core/styles';
import {Pagination as MuiPagination} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4),
    },
}));


let Pagination = ({currentPage, pageCount, perPage, totalCount, history})=>{
    //pageCount = Math.ceil(totalCount/perPage);

    const classes = useStyles();

    const currentLocation = useLocation();
    const query =  new URLSearchParams(currentLocation.search);


    if(!(pageCount > 1))
        return '';

    function handleChange(event, page) {
        query.set('page',page);
        const location = Object.assign({}, currentLocation, {search: query.toString()});
        history.push(location);
    }

    return <MuiPagination
        classes={classes}
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
    />;
}

Pagination.propTypes = {
    currentPage:PropTypes.number.isRequired,
    pageCount:PropTypes.number.isRequired,
    perPage:PropTypes.number.isRequired,
    totalCount:PropTypes.number.isRequired,
}
Pagination.defaultProps = {
    currentPage:1,
    pageCount:0,
    perPage:3,
    totalCount:0,
}

Pagination = withRouter(Pagination);

export default Pagination;
