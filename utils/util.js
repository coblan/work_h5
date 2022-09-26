import md5 from "js-md5";

/*
格式化金额
100000   -> 100,000
 */
export function formatPrice(price) {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 回到顶部 解决输入之后页面不回弹
 */
export const springback = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
};

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function() {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    };
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function() {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    };
};

/**
 * 手机验证
 */
export const validateMobile = mobile => {
    if (mobile.length === 0) {
        return false;
    }
    if (mobile.length !== 11) {
        return false;
    }
    var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (!reg.test(mobile)) {
        return false;
    }
    return true;
};


export const randomString = ()=>{var _0x8a4ec={'OyOkL':'4|3|0|2|5|1','GmurW':'abcdefhijkmnprstwxyz2345678','yCLfA':function(_0xfc04b8,_0x47134f){return _0xfc04b8<_0x47134f;},'idlWH':function(_0xb44c85,_0x1dfac2){return _0xb44c85*_0x1dfac2;}};var _0x2b0657=_0x8a4ec['OyOkL']['split']('|'),_0x2b8e24=0x0;while(!![]){switch(_0x2b0657[_0x2b8e24++]){case'0':var _0x4788ea=_0x4b48f0['length'];continue;case'1':return _0x48550e;case'2':var _0x48550e='';continue;case'3':var _0x4b48f0=_0x8a4ec['GmurW'];continue;case'4':var _0x11ea42=0xb;continue;case'5':for(var _0x37b8c1=0x0;_0x8a4ec['yCLfA'](_0x37b8c1,_0x11ea42);_0x37b8c1++){_0x48550e+=_0x4b48f0['charAt'](Math['floor'](_0x8a4ec['idlWH'](Math['random'](),_0x4788ea)));}continue;}break;}}

// export const qm = (k) => {
//   window._gb_ts = parseInt(new Date().getTime() / 1000);
//   window._gb_ns = randomString()
//   let  qsk  = `k=${k}&ns=${window._gb_ns}&ts=${window._gb_ts}`
//   const md5key = md5(qsk.toLocaleLowerCase());
//   window._gb_k = md5key
// }
export const qm=_0x2c5678=>{var _0x1845fe={'TZRcT':function(_0x5a150a,_0x3ae1fe){return _0x5a150a(_0x3ae1fe);},'OEDzY':function(_0x20662a,_0x3c259a){return _0x20662a/_0x3c259a;},'SChbi':function(_0x429516){return _0x429516();}};window['_gb_ts']=_0x1845fe['TZRcT'](parseInt,_0x1845fe['OEDzY'](new Date()['getTime'](),0x3e8));window['_gb_ns']=_0x1845fe['SChbi'](randomString);let _0x4f074f='k='+_0x2c5678+'&ns='+window['_gb_ns']+'&ts='+window['_gb_ts'];const _0xbefaa0=_0x1845fe['TZRcT'](md5,_0x4f074f['toLocaleLowerCase']());window['_gb_k']=_0xbefaa0;};