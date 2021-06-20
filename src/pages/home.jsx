import React, {useLayoutEffect} from 'react';
import {setTitle} from "pages/duck";
import {connect} from "react-redux";

let Home = ({dispatch})=>{
    useLayoutEffect(()=>{
        dispatch(setTitle('Home'));
    },[dispatch]);

    return <div>

    </div>
};

Home = connect()(Home);
export default Home;