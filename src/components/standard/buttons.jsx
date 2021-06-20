import React, {Fragment} from "react";
import {useSelector} from "react-redux";


const Buttons = ()=>{
    const {buttons} = useSelector(state => state.common);
    return <div>
        {buttons.map((el, index)=><Fragment key={index}>{el}</Fragment>)}
    </div>
};

export default Buttons;