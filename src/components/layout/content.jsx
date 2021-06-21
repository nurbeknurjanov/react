import React, {Suspense, useContext} from 'react';
import {Switch, Route} from "react-router-dom";

import Error from "../../pages/error";
import Home from "../../pages/home";

import Context from "../../pages/tutorial/context";
import Login from "../../pages/login";
import Simple from "../../pages/simple";
import Test from "../../pages/test";
import {Loading, LoadingContainer} from "../standard/loading";
import Users from "../../pages/users";
import UserView from "../../pages/users/view";
import {ProtectedRoute, GuestRoute} from "components/standard/route";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {globalContext} from "constants/contexts";
import Mui from 'pages/mui';
//const UserCreate = React.lazy(() => import("../../pages/users/create"));
const UserCreate = React.lazy( () => {
    return new Promise(r=>{
        setTimeout(()=>{
            r(import("../../pages/users/create"))
        }, 0)
    })
});

let Content = ({dispatch, commonError, location, history})=>{

    const {hasError, error} = useContext(globalContext);
    if(hasError)
        return <Error error={error} />

    if(commonError)
        return <Error error={commonError} />

    //всегда работает, потому что идет как ЧИСТЫЙ компонент в ЧИЛДРЕНЕ
    //совпадает или не совпадает без разницы
    /*<Route path="/simple" children={({history, location, match, })=>{
        if(match)
            return <Simple/>;
    }} />*/
    //если засунуть внутри Switch, то свитч жестко проверяет, и не исполняет
    //при этом если есть совпадения, можно и чистым компонентом ставить в чилдрене,
    //хотя лучше не стоит чтоб не было путаницы

    //Хотя Switch сам по себе странный, если в него засунуть div, а не Route, тогда он будет работать в любом случае,с ошибками в консоли
    return <>
        <Suspense fallback={<Loading/>}>
            <Switch>
                {/*<Switch location={{pathname:'/another'}} >*/}
                <Route path="/another" component={({history, location, match})=> {
                    return 'Another Component'
                }} />

                <Route path="/sidebar" children={'Sidebar Component'} />{/*можно, потому что как рендер*/}
                <Route path="/context" component={Context} />

                <GuestRoute path="/login" component={Login} />


                <Route path="/Test" children={<Test/>} />
                <Route path="/simple" children={<Simple/>} />
                <Route path="/simple" component={Simple} />
                <Route path="/simple" render={({history, location, match, staticContext})=>{
                    return <Simple/>;
                }} />
                <Route path="/mui" component={Mui} />


                <ProtectedRoute path="/users/create" component={UserCreate} />
                <ProtectedRoute path="/users/:id" component={UserView} />
                <ProtectedRoute path="/users" component={Users} exact roles={['admin']} />

                <Route path="/" component={Home} exact />

                <Route path="*" render={({location})=>{
                    const error = {
                        message: 'No Match for '+location.pathname,
                    };
                    return <Error error={error}/>
                }} />
            </Switch>
        </Suspense>
        <LoadingContainer/>
    </>;


}

Content = withRouter(Content);
Content = connect(state=>({commonError:state.common.error}))(Content);
export default Content;