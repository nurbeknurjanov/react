import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUsersOperation} from "./duck";
import Link from "../../components/standard/link";
import { USER_STATUS_LABELS } from "constants/user";
import {withRouter} from "react-router";


let UsersView = ({users, getUsersOperation, history, location})=>{
    const getQuery = ()=> {
        return new URLSearchParams(location.search);
    }
    const page = getQuery().get('page') || 1;

    //const filterRef = useRef('');
    //const [filter, setFilter] = useState(getQuery().get('filter')||'');
    const [filter, setFilter] = useState('');
    //constructor
    useEffect(()=>{
        setFilter(getQuery().get('filter'))
    }, []);

    //подписка на обновление фильтра
    //иначе он будет работать как конструктор и не увидит фильтра
    useEffect(()=>{
        getUsersOperation(filter, page);
    }, [filter, page]);

    const setFilterHandler = (e)=>{
        const keyCode = e.keyCode || e.which;
        if(keyCode===13)
            submitForm();
    };
    const setFilterChangeHandler = (e)=>{
        const filterValue = e.target.value;
        setFilter(filterValue);
    };
    const submitForm = ()=>{
        history.push({
            pathname:'/users',
            search: new URLSearchParams({filter:filter,page:1}).toString()
        })
    }

    return <div>
        <h1>Users</h1>
        <Link to={'/users/create'} >Create Task</Link>
        <br/>
        {/*<input value={filter} onChange={setFilterHandler} placeholder='Filter'/>*/}
        <input value={filter} onChange={setFilterChangeHandler} onKeyPress={setFilterHandler} placeholder='Filter'/>
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


UsersView = withRouter(UsersView);

const UsersContainer = connect((state, ownProps)=>{
    const users = state.user.users;
    return {
        users: users,
    }
},
    (dispatch, ownProps)=>{
    return {
        getUsersOperation: (filter, page)=>{
            dispatch(getUsersOperation(filter, page));
        },
    };
} )(UsersView);



export default UsersContainer;