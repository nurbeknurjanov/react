import {LoginPost} from "api/proto/generated/common_messages_pb";
import {CommonClient, CommonPromiseClient} from "api/proto/generated/common_services_grpc_web_pb";
import {ENVOY_URL} from "../constants/urls";
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { promisify } from 'es6-promisify';


const CommonClientService  = new CommonClient(ENVOY_URL, {}, null);
const CommonPromiseClientService  = new CommonPromiseClient(ENVOY_URL, {}, null);
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
enableDevTools([
    CommonClientService,
    CommonPromiseClientService,
]);

export const auth = (token) => {
    return CommonPromiseClientService.auth(new Empty(), {authorization:token})
        .then(userResponse=>userResponse.toObject());

    /*const authPromised = promisify(CommonClientService.auth.bind(CommonClientService));
    return authPromised(new Empty(), {authorization:token}).then(result=>result.toObject());*/
    /*return new Promise((resolve, reject)=>{
        CommonClientService.auth(new Empty(), {authorization:token}, (err, result)=>{
            if (err)
                return reject(err);
            resolve(result.toObject());
        });
    });*/
}

export const getAccessToken = (refreshToken) => {
    return CommonPromiseClientService.getAccessToken(new Empty(), {authorization:refreshToken})
        .then(tokenResponse=>tokenResponse.toObject().token);
}

export const login = ({email, password}) => {
    const request = new LoginPost();
    request.setEmail(email);
    request.setPassword(password);

    const loginMethodPromise = promisify(CommonClientService.login.bind(CommonClientService));
    return loginMethodPromise(request, {}).then(tokenResponse=>tokenResponse.toObject().token);
    /*return new Promise((resolve, reject)=>{
        CommonClientService.login(request, {}, (err, tokenResponse)=>{
            if (err)
                return reject(err);
            resolve(tokenResponse.toObject().token);
        });
    });*/
}
