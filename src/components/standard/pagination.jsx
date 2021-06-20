import React from "react";
import PropTypes from "prop-types";
//import Link from "components/standard/link";
import {useLocation, withRouter} from "react-router";
import {makeStyles} from '@material-ui/core/styles';
import {Pagination as MuiPagination} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        /*'& > *': {
            marginTop: theme.spacing(4),
        },*/
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

    /*
    const pages = [];
    for(let i=1; i<=pageCount; i++){
        query.set('page',i);
        const location = Object.assign({}, currentLocation, {search: query.toString()});
        //location.search = query.toString();
        pages.push(<li key={i}>
            {
                currentPage===i ? i: <Link to={location} >{i}</Link>
            }
        </li>);
    }

    query.set('page',currentPage-1);
    const firstLocation = Object.assign({}, currentLocation, {search: query.toString()});
    pages.unshift(currentPage===1 ? 'Prev': <Link key={0} to={firstLocation} >prev</Link>)

    query.set('page',currentPage+1);
    const lastLocation = Object.assign({}, currentLocation, {search: query.toString()});
    pages.push(currentPage===pageCount ? 'Next': <Link key={pageCount+1} to={lastLocation} >Next</Link>)
*/

    function handleChange(event, page) {
        query.set('page',page);
        const location = Object.assign({}, currentLocation, {search: query.toString()});
        history.push(location);
    }

    return <>
        <MuiPagination
            classes={classes}
            count={pageCount}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
        />
        {/*<ul style={{display:'flex'}}>
            {pages}
        </ul>*/}
    </>
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
/*
const PaginationContainer = connect(state=>{
    const pagination = state.common.pagination;
    if(pagination)
        return pagination;
    return {
        currentPage:1,
        perPage:3,
        totalCount:0,
        pageCount:0,
    };
})(PaginationView);
export default PaginationContainer;*/
