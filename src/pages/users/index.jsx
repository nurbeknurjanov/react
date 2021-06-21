import React, {useEffect, useRef, useLayoutEffect, useState, useCallback} from 'react';
import {connect} from "react-redux";
import {
    addButton, addFlash, endLoading,
    setBreadcrumbs, setError,
    setTitle, startLoading
} from "../duck";
import { USER_STATUS_LABELS, UserStatus } from "constants/user";
import {withRouter, Link as RouterLink} from "react-router-dom";
import Pagination from "components/standard/pagination";
import PropTypes from "prop-types";
import {getUsers as getUsersApi, deleteUser as deleteUserApi} from 'api/users';
import awaitToJs from "await-to-js";
import UserUpdate from "./update";
import {getVisibleUsersFilteredByNameSelector} from "./duck";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {Add as AddIcon, Edit as EditIcon} from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import {
    IconButton,
    Typography, TextField,
    FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { /*makeStyles,*/ withStyles } from '@material-ui/core/styles';
import Button from 'components/standard/button';
import MuiLink, {Link} from 'components/standard/link';
import Modal from 'components/standard/modal';
import DialogTitle from "@material-ui/core/DialogTitle";
import {green} from "@material-ui/core/colors";
import {withNamespaces} from "react-i18next";

const StyledIconButton = withStyles({
    root: {
        color: green[400],
    },
})(IconButton);

const Status = ({status})=>{
    let color = 'inherit';
    switch (status) {
        case UserStatus.BANNED_USER: {
            color='textSecondary';
            break;
        }
        case UserStatus.APPROVED_USER: {
            color='primary';
            break;
        }
        case UserStatus.ZERO_VALUE_REQUIRED: {
            color='secondary';
            break;
        }
        default:
    }
    return <Typography color={color}>
        {USER_STATUS_LABELS[status]}
    </Typography>;
}

/*const useStyles = makeStyles(theme=>({
    root:{
        margin: theme.spacing(2, 0),
        border:'1px solid red',
        display:'flex',
        justifyContent:'space-between',
    }
}));*/

let Filters = ({location, history, onStatusChange, classes})=>{
    //const classes = useStyles();
    const filterRef = useRef();
    const query = new URLSearchParams(location.search);
    const filterValue = query.get('filter');

    const [perPageValue] = useState( query.get('per-page') || 10 );

    const [statusValue, setStatus] = useState();
    useEffect(_=>{
        onStatusChange(statusValue);
    }, [statusValue, onStatusChange])


    const submitForm = e=>{
        e.preventDefault();
        history.push({
            pathname:'/users',
            search: new URLSearchParams({filter:filterRef.current.value}).toString()
        });
    }

    const onChangePerPage = e=>{
        const perPageValue = e.target.value;
        if(perPageValue)
            query.set('per-page', perPageValue);
        else
            query.delete('per-page');
        history.push({
            pathname:'/users',
            search: query.toString()
        });
    }

    return  <div className={classes.root} >
        <form onSubmit={submitForm} >
            <TextField inputRef={filterRef} defaultValue={filterValue} label='Filter'
                       variant="outlined" size="small"
            />

            <FormControl variant="outlined" size='small' className={classes.formControl} >
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={statusValue || ''}
                    label="Status"
                    onChange={e=>setStatus(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        Object.entries(USER_STATUS_LABELS).map(obj => {
                            const key   = obj[0];
                            const label = obj[1];
                            return <MenuItem value={key} key={key}>{label}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>


            <button type="submit" style={{display:'none'}}>submit</button>
        </form>


        <FormControl variant="outlined" size='small' className={classes.formControl} >
            <InputLabel id="per-page-label">Select per page</InputLabel>
            <Select
                labelId="per-page-label"
                value={perPageValue || ''}
                label="Select per page"
                onChange={onChangePerPage}
            >
                <MenuItem value="">
                    <em>Select per page</em>
                </MenuItem>
                <MenuItem value={1} >1</MenuItem>
                <MenuItem value={2} >2</MenuItem>
                <MenuItem value={3} >3</MenuItem>
                <MenuItem value={10} >10</MenuItem>
            </Select>
        </FormControl>

    </div>;
};
Filters = withStyles(theme=>({
    root:{
        margin: theme.spacing(2, 0),
        display:'flex',
        justifyContent:'space-between',
        '& > form > * + *':{
            marginLeft:10
        }
    },
    formControl:{
        width:120,
    }
}))(Filters);
Filters = withRouter(Filters);



let Users = ({users, status, filterName, dispatch, history})=> {
    //const visibleUsers = getVisibleUsers(users, status);

    const [selectedUser, selectUser] = useState(null);
    const [selectedUserToDelete, selectUserToDelete] = useState(null);

    const closeUpdateModal = ()=>selectUser(null);
    const closeDeleteModal = ()=>selectUserToDelete(null);

    const deleteUser = async id=>{
        const [err] = await awaitToJs(deleteUserApi(id));
        if(err)
            return dispatch(setError(err));
        dispatch(addFlash('success', 'You have successfully deleted the user'));
        closeDeleteModal();
        history.replace('/users');
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90,
            renderCell: params => <MuiLink to={'/users/'+params.value} children={params.value} component={RouterLink}/>,
        },
        { field: 'email', headerName: 'Email', width: 120 },
        { field: 'name', headerName: 'Name', width: 120 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
        },
        { field: 'status', headerName: 'Status', width: 120,
            renderCell: params => <Status status={params.value}/>,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 120,
            renderCell: params => {
                return <>
                    <StyledIconButton onClick={()=>selectUser(params.row)}><EditIcon/></StyledIconButton>
                    <IconButton color='secondary' onClick={()=>selectUserToDelete(params.row)}><DeleteOutlinedIcon/></IconButton>
                </>;
            }
        }
        /*{
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) => {
                return `${params.getValue(params.id,'firstName') || ''} ${params.getValue(params.id,'lastName') || ''}`;
            }
        },*/
    ];

    if(users.length>0){
        return <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection={false}  loading={false} />
            <Modal
                open={Boolean(selectedUser)}
                handleClose={closeUpdateModal}
                title={selectedUser && 'Update user #'+selectedUser.id}
                body={UserUpdate}
                okButton={<Button type='submit' variant="contained" color="success">Update</Button>}
            >{({title, body})=>{
                const UpdateUser = body;
                return <>
                    <DialogTitle>{title}</DialogTitle>
                    <UpdateUser user={selectedUser} handleClose={closeUpdateModal} />
                </>
            }}</Modal>
            <Modal
                open={Boolean(selectedUserToDelete)}
                handleClose={closeDeleteModal}
                title={selectedUserToDelete && 'Delete user '+selectedUserToDelete.id}
                body={'Are you sure you wanna delete this user ?'}
                okButton={selectedUserToDelete && <Button onClick={()=>deleteUser(selectedUserToDelete.id)} variant="contained" color="error">Delete</Button>}
            />
        </div>
    }
    return '';
};
Users = withRouter(Users);
Users = connect((state, ownProps)=>({users: getVisibleUsersFilteredByNameSelector(ownProps)}))(Users);
//Users = connect((state, ownProps)=>({users: getVisibleUsersSelector(ownProps)}))(Users);
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string,
        age: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    })),
    /*
    setPerPage: PropTypes.func.isRequired,
    filterRef: PropTypes.object.isRequired,
    filterRef: PropTypes.shape({
        current: PropTypes.oneOfType([
            PropTypes.any,
            PropTypes.element,
        ]),
    }),*/
}

let UsersContainer = ({location, d, t})=>{
    useLayoutEffect(()=>{
        d(setTitle(t('users')));
        d(addButton(<Button variant="contained"
                            color="success"
                            startIcon={<AddIcon/>}
                            component={
                                React.forwardRef((props, ref) => <Link {...props} ref={ref} to={'/users/create'} />)
                            }
        >{t('user.create')}</Button>));
        d(setBreadcrumbs([
            t('users')
        ]));
    },[d, t]);

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState();
    const [paginationParams, setPaginationParams] = useState();

    const query = new URLSearchParams(location.search);
    //page надо здесь писать, потому что если писать внутри эффектов,
    //page будет со старым значением, потому что он не реактивный
    //внутри эффектов надо писать другие реактивные стейты
    //или вызов хистори редиректы
    const pageValue = Number(query.get('page')) || 1;
    const perPageValue = Number(query.get('per-page')) || 10;
    const filterValue = query.get('filter');

    const fetchUsers = useCallback(
        async () => {
            d(startLoading());
            const [error, result] =  await awaitToJs(getUsersApi({filterName:filterValue, page:pageValue, perPage:perPageValue }));
            d(endLoading());
            if(error)
                return d(setError(error));
            setUsers(result.usersList);
            setPaginationParams(result.paginationParams);
        },
        [filterValue, pageValue, perPageValue, d],
    );

    useEffect(()=>{
        fetchUsers();
    }, [fetchUsers]);

    const handleStatusChange = useCallback(statusValue=>setStatus(statusValue), []);
    return <>
        <Filters onStatusChange={handleStatusChange} />
        <Users status={status} users={users} filterName={filterValue}/>
        {paginationParams && <Pagination {...paginationParams} />}
    </>
}
UsersContainer = withRouter(UsersContainer);
UsersContainer = connect(null, dispatch => ({d:dispatch}))(UsersContainer);
UsersContainer = withNamespaces()(UsersContainer);

export default UsersContainer;