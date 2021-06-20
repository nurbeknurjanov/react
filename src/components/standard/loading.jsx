import React from "react";
import {connect} from "react-redux";

export const Loading = ()=>{
    return <div className='loading'>
        <img src={require('../../images/loading.gif').default} alt={'Loading...'}/>
    </div>
}
let LoadingContainer = ({loading})=>{
    return loading ? <Loading/>:null;
}
LoadingContainer = connect((state, ownProps)=>({
    loading:state.common.loading
})
)(LoadingContainer);

export {LoadingContainer};