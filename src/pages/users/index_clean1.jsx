import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getUsersOperation, setFilterAction} from "./duck";
import Link from "../../components/standard/link";
import { useLocation} from "react-router-dom";
import { USER_STATUS_LABELS } from "constants/user";


const UsersView = ({users, getUsersOperation, filter,setFilterAction})=>{

    const location = useLocation();
    const getQuery = ()=> {
        return new URLSearchParams(location.search);
    }
    const page = getQuery().get('page');

    useEffect(()=>{
        getUsersOperation(filter, page);
    }, [page, filter, getUsersOperation]);

    const setFilterHandler = (e)=>{
        const keyCode = e.keyCode || e.which;
        if(keyCode===13){
            const filterValue = e.target.value;
            setFilterAction(filterValue);
        }
    };
    /*const setFilterHandler = (e)=>{
        const filterValue = e.target.value;
        setFilterAction(filterValue);
    };*/

    return <div>
        <h1>Users</h1>
        <Link to={'/users/create'} >Create Task</Link>
        <br/>
        {/*<input value={filter} onChange={setFilterHandler} placeholder='Filter'/>*/}
        <input  onKeyPress={setFilterHandler} placeholder='Filter'/>
        <br/>
        <ul>
            {users.map((el, index)=>{
                return <li key={index}>
                    <Link secondary to={'/users/'+el.id} >{el.id}. {el.name}</Link>,
                    {el.age} лет, {USER_STATUS_LABELS[el.status]}
                </li>
            })}
        </ul>
    </div>
}



const UsersContainer = connect((state, ownProps)=>{
    const users = state.user.users;
    const filter = state.user.filter;
    return {
        users: users,
        //users: users.filter(el=> filter ? el.name.includes(filter):true),
        filter:filter,
    }
},
    (dispatch, ownProps)=>{
    return {
        getUsersOperation: (filter, page)=>{
            dispatch(getUsersOperation(filter, page));
        },
        setFilterAction: (value)=>{
            dispatch(setFilterAction(value));
        }
    };
} )(UsersView);

export default UsersContainer;