import { UserRequest, FilterParams,
    UserPost,
    UserPostUpdate,
    PaginationRequest, UsersRequest } from "./proto/generated/users_messages_pb";
import {UsersClient, UsersPromiseClient} from "./proto/generated/users_services_grpc_web_pb";
import {ENVOY_URL} from "constants/urls";
import { promisify } from 'es6-promisify';
import {getCookie} from "helper/cookie";
//import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
export { UserStatus } from "./proto/generated/users_messages_pb";

const UsersClientService  = new UsersClient(ENVOY_URL, {}, null);
const UsersClientServicePromise  = new UsersPromiseClient(ENVOY_URL, {}, null);

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
enableDevTools([
    UsersClientService,
    UsersClientServicePromise,
]);



export const createUser = ({name, age, status, email, password}) => {
    let token = getCookie('access-token');
    const request = new UserPost();
    request.setName(name);
    request.setEmail(email);
    request.setPassword(password);
    request.setAge(age);
    request.setStatus(status);

    const createUserMethod = promisify(UsersClientService.createUser.bind(UsersClientService));
    return createUserMethod(request, {authorization:token}).then(user=>user.toObject());
}

export const deleteUser = id => {
    let token = getCookie('access-token');
    const request = new UserRequest();
    request.setId(id);
    return UsersClientServicePromise.deleteUser(request, {authorization:token});
}
export const updateUser = (id, {name, age, status, email}) => {
    let token = getCookie('access-token');
    const request = new UserPostUpdate();
    request.setId(id);

    const post = new UserPost();
    post.setName(name);
    post.setEmail(email);
    post.setAge(age);
    post.setStatus(status);

    request.setPost(post);
    return UsersClientServicePromise.updateUser(request, {authorization:token});
}
export const getUser = id => {
    let token = getCookie('access-token');
    const request = new UserRequest();
    request.setId(id);

    /*return new Promise((resolve, reject)=>{
        UsersClientService.getUser(request, {}, (err, result)=>{
            if (err)
                return reject(err);
            resolve(result.toObject());
        });
    });*/

    const getUserPromiseMethod = promisify(UsersClientService.getUser.bind(UsersClientService));
    //return getUserPromise(request, {});//по идее вот так надо было
    return getUserPromiseMethod(request, {authorization:token}).then(result=>result.toObject());//then не сработает, если есть еррор
    //так как там есть колбек, первую он делает режект, а вторую ресолвит если
}


export const getUsers = ({filterName, page, perPage}) => {
    let token = getCookie('access-token');
    const request = new UsersRequest();
    const filterParams = new FilterParams();
    filterParams.setName(filterName || '');
    request.setFilterParams(filterParams);

    const paginationParams = new PaginationRequest();
    paginationParams.setPage(page || 1);
    paginationParams.setPerPage(perPage || 3);
    request.setPaginationParams(paginationParams);

    //token='';
    /*return new Promise((resolve, reject)=>{
        UsersClientService.getUsers(request, {authorization:token}, (err, result)=>{
            if(err)
                return reject(err);
            resolve(result.toObject());
        });
    });*/

    /*let getUsersMethod = promisify(UsersClientService.getUsers);
    getUsersMethod = getUsersMethod.bind(UsersClientService);
    return getUsersMethod(request, {authorization:token})
        .then(result=>result.toObject())
        .catch(err=>{
            throw new Error(err.message);
        });
    */

    const promise = UsersClientServicePromise.getUsers(request, {authorization:token})
        .then(result=>result.toObject())
        .catch(err=>{
            throw new Error(err.message);
        });
    return  promise;
    /*return new Promise(resolve=>{
        setTimeout(_=>resolve(promise), 1000);
    });*/


}

