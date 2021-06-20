import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getUsers} from "./duck";
import { Link } from "react-router-dom";


let Users = ()=>{

    const users = useSelector(state=>state.user.users);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('');

    const getVisibleUsers = ()=>{
        if(filter)
            return users.filter(el=>el.name.includes(filter));
        return users;
    };

    useEffect(()=>{
        dispatch(getUsers());
    }, [dispatch]);


    const setFilterHandler = (e)=>{
        setFilter(e.target.value);
    };

    return <div>
        <h1>Users</h1>
        <Link to={'/users/create'} >Create Task</Link>
        <br/>
        <input value={filter} onChange={setFilterHandler} placeholder='Filter'/>
        <br/>
        <ul>
            {getVisibleUsers().map((el, index)=>{
                return <li key={index}>
                    <Link to={'/users/'+el.id} >{el.id}. {el.name}</Link>, {el.age} лет
                </li>
            })}
        </ul>
    </div>
}

export default Users;