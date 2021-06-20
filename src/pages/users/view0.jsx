import React from 'react';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addButton, setBreadcrumbs, setError, setTitle} from '../duck'
import {Link} from "components/standard/link";
import Button from "components/standard/button";
import {getUser} from "api/users";
import awaitToJs from "await-to-js";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories) {
    return { name, calories };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
];

function DenseTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="left">Calories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


class UserClass extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }
    async fetchData(id){
        const {dispatch} = this.props;
        const [error, user] = await awaitToJs(getUser(id));
        if(error)
            return  dispatch(setError(error));
        this.setState({
            user
        });
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const id = this.props.match.params.id;

        dispatch(setTitle('User #'+id));
        dispatch(addButton(<Button color='info' variant='outlined' to='/users' component={Link}>Back</Button>))
        dispatch(setBreadcrumbs([
            {label:'Users', to:'/users'},
            'User #'+id
        ]));


        this.fetchData(id);
        //this.props.dispatch({type: 'USER_FETCH_REQUESTED', payload: id});
    }


    render() {
        const {user}  = this.state;
        return <DenseTable/>;

        return <div>
            {user && <>
                {user.name}, {user.age} лет
            </>}
        </div>
    }
}

UserClass.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string,
        age: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    })
}

UserClass = withRouter(UserClass);

UserClass = connect()(UserClass);

export default UserClass;