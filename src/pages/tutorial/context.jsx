import React, {useState, useContext} from 'react';

const mycontext = React.createContext('22');
mycontext.displayName = 'MyContext';

class Child extends React.Component
{
    componentDidMount() {
        this.context.count = 10;//не пашет
    }

    //static contextType = MyContext;
    render() {
        return <div>
            <button onClick={this.context.inc}>{this.context.count}</button>
        </div>;
    }
}
Child.contextType = mycontext;



const Middle = ()=>{
    const [count, setCount] = useState(0);
    const inc = ()=>setCount(count+1);
    //return <mycontext.Provider value={this.state}>
    return <mycontext.Provider value={{count, inc}}>
        count: {count}
        <br/>
        <Child />
        <Child2 />
        <Child3 />
    </mycontext.Provider>
}

const App = ()=>{
    return <Middle/>;
    //return <Child2/>;
};

const Child2 = ()=>{
    return <>
        <mycontext.Consumer>
            {(contextValue)=>contextValue.count}
        </mycontext.Consumer>
    </>;
}

const Child3 = ()=>{
    const context = useContext(mycontext);
    context.inc = 123;//doesnt work
    context.count = 20;//works

    return <div>
        {context.count}
    </div>
}

export default App;