/* eslint-disable */
import axios from "axios";
import {rawDecrypt, rawDecryptToStr, blobToStr,  strEncrypt,base64ToBlob,strEncryptToBlob} from './aes.js'
import {
    getToken,
    removeToken,
    setToken,
    setUuid,
    getUuid,
} from "@/utils/auth";

var config = require('@/config.js').config
// var config = cfg.config
import store from "@/store";
import ex from "weblib/ex";
// import { pop_vue_com_ele } from "weblib/pc_cfg/elePop.vue";

// import login from "@/components/login";
import { qm } from "./util";

// const k = "56574169-C4C6-4BA3-A002-656A158F60DA"; //  '9b3d4150ea4a4070a94070ff3c95458d91d70d2cc6c54f41b4ad4cb28a5bd82d';
const k = config.sign_key

qm(k);
setInterval(() => {
    var _0x4d203c = {
        YsFot: function(_0x54c7fa, _0x33b644) {
            return _0x54c7fa(_0x33b644);
        },
    };
    _0x4d203c["YsFot"](qm, k);
}, 0x3e8 * 0x2);

var is_refreshing_token = false;
var show_401_locked = false;
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
    );
}

let uuid = null;
if (!getUuid()) {
    uuid = guid();
    setUuid(uuid);
} else {
    uuid = getUuid();
}

axios.defaults.baseURL = config.baseUrl;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers['Content-Type'] = 'application/josn;charset=UTF-8';

if (ex.os.isPc) {
    var teminal = "Pc";
} else if (ex.os.isAndroid) {
    var teminal = "Android";
} else if (ex.os.isiPhone) {
    var teminal = "iOS";
}
var teminal = 'h5'

axios.defaults.headers = {
    "x-api-version": "1.0",

    // "x-device": JSON.stringify({
    //     DeviceCode: uuid,
    //     DeviceName: "",
    //     Terminal: teminal, //'Pc'
    // }),

};
axios.defaults.timeout = 30000; // 请求超时时间s
axios.defaults.withCredentials = false;

var network={}
//请求拦截
axios.interceptors.request.use(
    (request_config) => {
        // request_config.headers["x-ts"] = window._gb_ts;
        // request_config.headers["x-id"] = config.x_id; // 'Shark040739372D97'// 'web5a555c549f69d6701c0947640e0'

        // request_config.headers["x-ns"] = window._gb_ns;
        // request_config.headers["x-sign"] = window._gb_k;
        request_config.headers["x-encrypt"] = 2;
        var eh = {
            DeviceCode: uuid,
            DeviceName: "",
            Terminal: teminal,
            Ts:window._gb_ts,
            Ns: window._gb_ns,
            Sign:window._gb_k,
            AppId:config.x_id
        }
        eh =  JSON.stringify(eh);
        // console.log(eh)
        request_config.headers["x-eh"] = strEncrypt(eh,'94a4b778g01ca4ab')

        if (getToken()) {
            request_config.headers["Authorization"] = `${getToken().tokenType} ${
                getToken().accessToken
            }`;
        }

        return request_config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

let ToastFlage = true;


async function pop_login_window(){
    var resp = await pop_vue_com_ele(login, {
        width: "400px",
        store: store,
        page: "login",
    })
    // store.state.is_login_win_open = false;
    network.token_getter = null
    if (resp) {
        location.reload();
    }else{
        // 永远卡住不执行后面的
        return new Promise((resolve)=>{})
    }

}

async function process_resp(res){
    if (res) {
        var resp_data=  res.data
        try {
            if(res.headers['x-encrypt']=='1'){
                var resp_data_str = await rawDecryptToStr(resp_data,'94a4b778g01ca4ab')
                resp_data = JSON.parse(resp_data_str)
            }else{
                var resp_data_str = await blobToStr(resp_data)
                resp_data = JSON.parse(resp_data_str)

            }
        }catch (e){
            console.log(e)
        }
        const data = {
            data: resp_data,
        };
        if (resp_data.success==false ) {
            // 走不到内部函数的时候关掉loading
            cfg.hide_load();
            if(resp_data.error){
                cfg.showError(resp_data.error);
            }else{
                cfg.showError('后台请求错误')
            }

        } else {
            return data
        }
    }
}
function encode_all_url(url){
    // var url =    `/home/token/refresh/${tokenObj.refreshToken}`

    var ep=url
    ep = ex.appendSearch(ep,{tst:Date.now()})
    var pre_key = '94a4b778'
    var suf= ''
    for (var i=0;i<8;i++){
        suf+= ex.sample(['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'])
    }
    // ep = strEncrypt(ep,'94a4b778g01ca4ab')
    ep = strEncrypt(ep,pre_key+suf)
    // console.log('pre_key=',pre_key)
    ep = ep.replaceAll('+','-')
    ep = ep.replaceAll('/','_')
    // ep = encodeURIComponent(ep)
    return suf+ep

}
async function process_401(config){
    if(network.token_getter){
        await network.token_getter.promise
        return  axios.request(config); //response.config
    }else{
        network.token_getter= new ex.FreePromise()
        var tokenObj = getToken();
        if (!tokenObj) {
            cfg.hide_load()
            // return await  pop_login_window()
            return 'need re-login'
            // 完全未登录的情况

            // if (!store.state.is_login_win_open) {
            // cfg.toast('请先登录')
            // store.state.is_login_win_open = true;

            // }
        }
        //refresh token的情况

        console.log('token过期，刷新token')
        try {

            // var url =   store.state.url.service[0]  + `/home/token/refresh/${tokenObj.refreshToken}`
            var url =    `/home/token/refresh/${tokenObj.refreshToken}`

            // var ep=url
            // ep = strEncrypt(ep,'94a4b778g01ca4ab')
            // ep = encodeURIComponent(ep)
            // var ep_url = `fun?ep=${ep}`
            var ep_url =  encode_all_url(url)

            data = JSON.stringify({})
            var data = strEncrypt(data,'94a4b778g01ca4ab')
            data = base64ToBlob(data)



            var res = await axios.post(ep_url, data,{headers: {"content-type": 'application/json'} }  )

            if (res.data.success) {
                //
                setToken(res.data.data);
               // 更新下
               //  tokenObj = getToken();

                axios.defaults.headers[
                    "Authorization"
                    ] = `${tokenObj.tokenType} ${tokenObj.accessToken}`;

                network.token_getter.resolve()

                // 10秒后把请求promise清除
                setTimeout(()=>{
                    network.token_getter = null
                },1000)
                return axios.request(config)
            }
        } catch(err){
            // router.openPage('login')
            // removeToken();
            if(err.response.status==603){
                cfg.hide_load()
                cfg.toast('账号在其他设备登录')
                return
            }
        };
        // 前面没有return，证明出问题了
        console.log("刷新token失败，需要重新登录");
        store.commit('logOut')
        cfg.hide_load()
        // return await pop_login_window()
        return 'need re-login'
    }
}

const request = (method, url, data, config = {}) => {
    const options = Object.assign({}, config, {
        url,
        method,
        data,
        // responseType:'json'

        responseType: 'blob'
    });

    options.headers = options.headers || {};
    return new Promise((resolve, reject) => {
        axios
            .request(options)
            .then( async (res) => {
                var processed_data = await process_resp(res)
                if(processed_data){
                    resolve(processed_data)
                }else{
                    reject()
                }

                // process_resp(res,resolve)
                // if (res) {
                //     const data = {
                //         data: res.data,
                //     };
                //     if (res.data.success==false ) {
                //         // 走不到内部函数的时候关掉loading
                //         cfg.hide_load();
                //         if(res.data.error){
                //             cfg.showError(res.data.error);
                //         }else{
                //             cfg.showError('后台请求错误')
                //         }
                //
                //     } else {
                //         resolve(data);
                //     }
                // }
            })
            .catch(async (error) => {
                // 在这里做错误处理
                if(error &&error.response && error.response.status == 401){
                    // seal H5里面展示不支持登录
                    var res = await process_401(error.response.config)
                    if(res=='need re-login'){
                        cfg.showMsg("请重新登录")
                        // cfg.login()
                    }else{
                        var processed_data = await process_resp(res)
                        if(processed_data){
                            resolve(processed_data)
                        }
                    }
                    reject();
                    return;
                }else if (error.response.status == 603) {
                    //特殊处理
                    // cfg.showError(error);
                    cfg.hide_load()
                    removeToken()
                    cfg.showMsg("账号在其他设备登录")
                    reject();
                    return;
                } else if (error.response ) {
                    cfg.showError(error.toString());
                    cfg.hide_load()
                    reject();
                    return
                } else{
                    reject(error);
                }
            });
    });
};

export const server = {
    noBaseGet(url, data, config){
        if(url.startsWith('/')){
            url = location.origin + url
        }

        return this.get(url, data, config)
    },
    get(url, data, config) {
        // if(!url.startsWith('http')){
        //     url = store.state.url.service + url
        // }
        // return request("get", url, data, config);
        if(data){
            // var ep = ex.searchfy(data)
            var ep = ex.appendSearch(url,data)
            // if(ep){
            //     ep = strEncrypt(ep,'94a4b778g01ca4ab')
            //     // ep = btoa(ep)
            //     //  debugger
            //     ep = encodeURIComponent(ep)
            //     // ep = encodeURI(ep)
            //     url = url + `?ep=${ep}`
            // }



        //
        //     debugger
        //     url = ex.appendSearch(url,data)
        }else{
            ep=url
        }

        // ep = strEncrypt(ep,'94a4b778g01ca4ab')
        // ep = encodeURIComponent(ep)
        // var ep_url = `fun?ep=${ep}`
        var ep_url = encode_all_url(ep)

        return request("get", ep_url,{}, config);
        // return request("get", url,{}, config);
    },
    post(url, data, config) {
        // if(!url.startsWith('http')){
        //     url = store.state.url.service + url
        // }
        if(data){
            data = JSON.stringify(data)

            var data = strEncrypt(data,'94a4b778g01ca4ab')
            // var data = btoa(data)
            // debugger
            // data =new blob([data]) //base64ToBlob(data)
            // data = atob(data);
            data = base64ToBlob(data)
            // data = new blob
            // data = await data. arrayBuffer()
        }
        var ep=url
        // ep = strEncrypt(ep,'94a4b778g01ca4ab')
        // ep = encodeURIComponent(ep)
        // var ep_url = `fun?ep=${ep}`
        var ep_url = encode_all_url(ep)
        return request("post", ep_url, data,  {headers: {"content-type": 'application/json'} } );
        // return request("post", url, data,  {headers: {"content-type": 'application/json'} } );
        // return request("post", url, data, config);
    },
    put(url, data, config) {
        if(data){
            data = JSON.stringify(data)

            var data = strEncrypt(data,'94a4b778g01ca4ab')
            // var data = btoa(data)
            // debugger
            // data =new blob([data]) //base64ToBlob(data)
            // data = atob(data);
            data = base64ToBlob(data)
            // data = new blob
            // data = await data. arrayBuffer()

        }
        var ep=url
        // ep = strEncrypt(ep,'94a4b778g01ca4ab')
        // ep = encodeURIComponent(ep)
        // var ep_url = `fun?ep=${ep}`
        var ep_url = encode_all_url(ep)
        return request("put", url, ep_url, {headers: {"content-type": 'application/json'} } );
        // return request("put", url, data, {headers: {"content-type": 'application/json'} } );
        // return request("put", url, data, config);
    },
    delete(url, data, config) {
        if(data){
            data = JSON.stringify(data)
            var data = strEncrypt(data,'94a4b778g01ca4ab')
            data = base64ToBlob(data)
        }
        var ep=url
        // ep = strEncrypt(ep,'94a4b778g01ca4ab')
        // ep = encodeURIComponent(ep)
        // var ep_url = `fun?ep=${ep}`
        var ep_url = encode_all_url(ep)
        return request("delete", ep_url, data, {headers: {"content-type": 'application/json'} }  );

        // return request("delete", url, data, {headers: {"content-type": 'application/json'} }  );
        // return new Promise((resolve, reject) => {
        //   axios
        //     .delete(url, { params: data })
        //     .then((res) => {
        //       if (res) {
        //         resolve(res);
        //       }
        //     })
        //     .catch((error) => {
        //       // 在这里做错误处理
        //       reject(error);
        //     });
        // });
        // return request('delete', url, data, config);
    },
    head(url, config) {
        return request("head", url, null, config);
    },
    patch(url, data, config) {
        return request("patch", url, data, config);
    },
};
