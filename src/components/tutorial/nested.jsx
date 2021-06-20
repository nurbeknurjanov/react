import { useRouteMatch, useParams, Link, Route, Switch } from 'react-router-dom';


const Nested =  (props)=>{
    return <>
        <h1>Nested</h1>
        <div>
            <Topics/>
        </div>
    </>
};


function Topic() {

    let { topicId } = useParams();

    return (
        <div>
            <h3>Topic ID: {topicId}</h3>
        </div>
    );
}

function Topics() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${url}`}>Home</Link>
                </li>
                <li>
                    <Link to={`${url}/no-topic`}>No Topic</Link>
                </li>
                <li>
                    <Link to={`${url}/topic-1`}>Topic 1</Link>
                </li>
                <li>
                    <Link to={`${url}/topic-2`}>Topic 2</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>

                <Route path={`${path}/no-topic`}>
                    <Topic />
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic />
                </Route>
            </Switch>
        </div>
    );
}

export default Nested;