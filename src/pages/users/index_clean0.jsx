import React, {useEffect, useRef, useLayoutEffect} from 'react';
import {connect} from "react-redux";
import {getUsersOperation} from "./duck";
import {
    addButton,
    setBreadcrumbs,
    setTitle
} from "../duck";
import Link from "components/standard/link";
import { USER_STATUS_LABELS } from "constants/user";
import {withRouter} from "react-router-dom";
import Pagination from "components/standard/pagination";
import PropTypes from "prop-types";

const UsersView = ({users, filterRef, filterValue, setFilterHandler, perPage, setPerPage})=>{
    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <input ref={filterRef} defaultValue={filterValue} onKeyPress={setFilterHandler} placeholder='Filter'/>


                <select onChange={setPerPage} defaultValue={perPage}>
                    <option value="">Select per page</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="10">10</option>
                </select>

            </div>
            <br/>
            <ul>
                {users.map((el, index)=><li key={index}>
                        <Link secondary to={'/users/'+el.id} >{el.id}. {el.name}</Link>,
                        {el.age} лет, {USER_STATUS_LABELS[el.status]}
                    </li>
                )}
            </ul>
            <Pagination/>
        </div>
    );
};
UsersView.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string,
        age: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    })),
    filterValue: PropTypes.string,
    setFilterHandler: PropTypes.func.isRequired,
    perPage: PropTypes.number,
    setPerPage: PropTypes.func.isRequired,
    //filterRef: PropTypes.object.isRequired,
    filterRef: PropTypes.shape({
        current: PropTypes.oneOfType([
            PropTypes.any,
            PropTypes.element,
        ]),
    }),
}

let UsersContainer = ({users, getUsersOperation, history, location, dispatch})=>{
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page')) || 1;
    const perPage = Number(query.get('per-page')) || 3;
    const filterRef = useRef();
    //constructor
    let filter = query.get('filter');

    //подписка на обновление фильтра
    //иначе он будет работать как конструктор и не увидит фильтра
    useEffect(()=>{
        getUsersOperation({filter, page, perPage});
    }, [filter, page, perPage, getUsersOperation]);
    useLayoutEffect(()=>{
        dispatch(setTitle('Users'));
        dispatch(addButton(<Link to={'/users/create'} >Create Task</Link>));
        dispatch(setBreadcrumbs([
            'Users'
        ]));
    },[dispatch]);


    const setFilterHandler = e=>{
        const keyCode = e.keyCode || e.which;
        if(keyCode===13)
            submitForm();
    };
    const submitForm = ()=>{
        history.push({
            pathname:'/users',
            search: new URLSearchParams({filter:filterRef.current.value}).toString()
        });
    }
    const setPerPage = (e)=>{
        const perPage = e.target.value;
        if(perPage)
            query.set('per-page', perPage);
        else
            query.delete('per-page');
        history.push({
            pathname:'/users',
            search: query.toString()
        });
    };

    return <UsersView users={users}
                      filterValue={filter}
                      filterRef={filterRef}
                      setFilterHandler={setFilterHandler}
                      perPage={perPage}
                      setPerPage={setPerPage}
    />
}
UsersContainer.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string,
        age: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    })),
    getUsersOperation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

UsersContainer = withRouter(UsersContainer);
const UsersContainerRedux = connect((state, ownProps)=>{
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
        dispatch
    };
} )(UsersContainer);



export default UsersContainerRedux;