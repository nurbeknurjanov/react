import React, {useEffect, useLayoutEffect} from "react";
import {globalContext} from "constants/contexts";
import {addButton, clearAll, setBreadcrumbs, setTitle} from "pages/duck";
import {useDispatch} from "react-redux";
import {BackButton} from 'components/standard/button';
//import axios from "axios";


let Simple = ()=>{
    const dispatch = useDispatch();
    const {changeLayout} = React.useContext(globalContext);

    useLayoutEffect(()=>{
        dispatch(setTitle('Simple'));
        dispatch(addButton(<BackButton/>));
        dispatch(setBreadcrumbs([
            'Simple'
        ]));
        return ()=>dispatch(clearAll());
    },[dispatch]);


    useEffect(()=>{
        changeLayout('main2');
        return ()=>changeLayout('main');
    },[changeLayout]);

    useEffect(()=>{


        /*const p = fetch('https://demo.sakuracommerce.com/site/test-api?name=Nurbek',{
            method:'POST',
            headers:{
                Authorization:'Bearer 123123',
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': 'application/json'
                //mode: 'cors',
            },
            body:"surname=Nurjanov",
            //body:JSON.stringify({surname:'Nurjanov'}),
        });

        p.then(response=>{
            //console.log('first response', response);
            return response.json();
            //return response.text();
        })
        .then(response=>{
            console.log('second response', response)
        });*/


        /*const p = axios.post('https://demo.sakuracommerce.com/site/test-api?name=Nurbek', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }).then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });*/

        /*axios.interceptors.request.use(function (config) {
            config.headers.Authorization = 'Bearer 123123';
            return config;
        });

        const params = new URLSearchParams();
        params.append('param1', 'value1');
        params.append('param2', 'value2');
        const p = axios.post('https://demo.sakuracommerce.com/site/test-api?name=Nurbek', params).then(function (response) {
            console.log(response.data);
        });*/


    },[]);
    return <div>
        simple text
    </div>
}


export default Simple;