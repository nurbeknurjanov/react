import React, {useLayoutEffect} from "react";
import {addButton, setBreadcrumbs, setTitle} from "pages/duck";
import {connect} from "react-redux";
import {BackButton} from "components/standard/button";
//import {getUsersSagaAsync} from "pages/users/duck";


let Test = ({dispatch})=>{


    useLayoutEffect(()=>{
        dispatch(setTitle('Test'));
        dispatch(setBreadcrumbs(['Test']));
        dispatch(addButton(<BackButton/>));
    },[dispatch]);


    return <div>
        Test

    </div>
}

Test = connect()(Test);
export default Test;