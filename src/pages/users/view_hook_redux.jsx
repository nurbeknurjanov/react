import React, {useEffect} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {getUser} from "./duck";
import {useDispatch, useSelector} from "react-redux";



let User = ()=>{

    const {id} = useParams();
    const user = useSelector(state=>state.user.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const goBack = ()=>history.goBack();

    useEffect(()=>{
        dispatch(getUser(id));
    }, [id, dispatch]);

    return <div>
        <h1>User #{user && user.id}</h1>
        <button onClick={goBack}>
            Back
        </button>
        <br/>
        {user && <>
            {user.name}, {user.age} лет
        </>}
    </div>
}

User = withRouter(User);
export default User;