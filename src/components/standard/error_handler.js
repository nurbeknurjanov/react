import React from "react";
import {globalContext} from "constants/contexts";

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error:null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
    }

    render() {
        return <globalContext.Consumer>
            {data=>{
                data.hasError = this.state.hasError;
                data.error = this.state.error;
                return <globalContext.Provider value={data}>
                    {this.props.children}
                </globalContext.Provider>
            }}
        </globalContext.Consumer>
    }
}

export default ErrorHandler;