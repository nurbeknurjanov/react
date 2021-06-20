import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {getUserClean} from "./duck";


let User = ({history})=>{

    const {id} = useParams();
    const [user, setUser] = useState(null);
    const goBack = ()=>history.goBack();

    useEffect(()=>{
        getUserClean(id).then(result=>{
            setUser(result);
        });

        /*getUserApi(id).then(result=>{
            setUser(result);
        }).catch(error=>{
            console.log('error', error.message);
        });*/

        /*async function fetchData() {
            try{
                const result = await getUserApi(id);
                setUser(result);
            }catch(e){
                console.log(e.message);
            }
        }
        fetchData();*/

        /*async function fetchData() {
            const [, result] = await awaitToJs(getUserApi(id));
            setUser(result);
        }
        fetchData();*/

        return ()=>{
            setUser(null);
        }
    }, [id]);

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