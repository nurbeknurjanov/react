import React, {useLayoutEffect} from 'react';
import {setTitle} from "pages/duck";
import {connect} from "react-redux";
import {withNamespaces} from "react-i18next";

let Home = ({dispatch, t})=>{
    const title = t('home');
    useLayoutEffect(()=>{
        dispatch(setTitle(title));
    },[dispatch, title]);

    return <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </div>
};

Home = connect()(Home);
Home = withNamespaces()(Home);
export default Home;