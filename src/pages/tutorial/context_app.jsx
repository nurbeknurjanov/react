import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";



const context = createContext();

export default function Example() {
    const funks = useFunks();
    return (
        <context.Provider value={funks}>
            <Router>
                <div>
                    <SignOutButton />

                    <ul>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/public">
                            public
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute path="/protected">
                            Protected
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </context.Provider>
    );
}

const authObject = {
    isAuthenticated: false,
    signin(callback) {
        this.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback) {
        authObject.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

function useFunks() {
    const [user, setUser] = useState(null);

    const signin = anotherCallback => {
        authObject.signin(() => {
            setUser("user");
            anotherCallback();
        });
    };

    const signout = anotherCallback => {
        authObject.signout(() => {
            setUser(null);
            anotherCallback();
        });
    };

    return {
        user,
        signin,
        signout
    };
}





function SignOutButton() {
    let history = useHistory();
    let {user, signout} = useContext(context);

    return  user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => signout(_ => history.push("/"))}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let {user} = useContext(context);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return user ?   children :
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { fromLocation: location }
                        }}
                    />
            }
            }
        />
    );
}





function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let {signin} = useContext(context);

    let { fromLocation } = location.state || { fromLocation: { pathname: "/" } };

    return (
        <div>
            <p>You must log in to view the page at {fromLocation.pathname}</p>
            <button onClick={()=>signin(_ =>  history.replace(fromLocation))}>Log in</button>
        </div>
    );
}
