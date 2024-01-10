import  ex from 'weblib/ex'

export async function decodeFromUrl(src){
    if(!src){return ''}
    var search = ex.parseURL(src)

    if( search.pathname.endsWith('.aes')){
        await ex.load_js('https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/crypto-js/4.1.1/crypto-js.min.js')
        var rt = await ex.getFile( src)
        var key='94a4b778g01ca4ab'
        var base = await Decrypt(rt,key)
        base =  base.replace('application/octet-stream', 'image/jpeg')
        var data_url = base // `data:text/plain;base64,${base}`
        // var base2 = "data:image/png;base64,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"
        return data_url // base2  //

    }else{
        return   src
    }
}
export async function decodeRawFromUrl(src){
    await ex.load_js('https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/crypto-js/4.1.1/crypto-js.min.js')
    var rt = await ex.getFile( src)
    var key='94a4b778g01ca4ab'
    var base = await rawDecrypt(rt,key)
    return base
}

async function Decrypt(data,key) {
    // var arrayBuffer =  await data.arrayBuffer()  // await  blobToArrayBuffer(data)
    // var wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    var mydata = await blobToDataURL(data)
    var naked_base64= mydata.slice(37,)
    // var wordArray = CryptoJS.enc.Base64.parse()
    var AES_KEY = CryptoJS.enc.Utf8.parse(key); //key //
    let decrypt = CryptoJS.AES.decrypt(naked_base64, AES_KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7 });
    var bb = CryptoJS.enc.Base64.stringify(decrypt)
    var b2 = `data:application/octet-stream;base64,${bb}`
    return b2
//    var u8 = convertWordArrayToUint8Array(decrypt)
    var blob = Uint8ArrayToBlob(u8)
    // return blob;
}
export  async function rawDecrypt(data,key) {
    // 直接解码,返回二进制,由atob返回字符串
    var mydata = await blobToDataURL(data)
    var naked_base64 = mydata.slice(37,)
    // var wordArray = CryptoJS.enc.Base64.parse()
    var AES_KEY = CryptoJS.enc.Utf8.parse(key); //key //
    let decrypt = CryptoJS.AES.decrypt(naked_base64, AES_KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var bb = CryptoJS.enc.Base64.stringify(decrypt)
    debugger
    return atob(bb)
}
export  async function rawDecryptToStr(data,key) {
    // 直接解码,返回二进制
    var mydata = await blobToDataURL(data)
    var naked_base64 = mydata.slice(37,)
    // var wordArray = CryptoJS.enc.Base64.parse()
    var AES_KEY = CryptoJS.enc.Utf8.parse(key); //key //
    let decrypt = CryptoJS.AES.decrypt(naked_base64, AES_KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8)
}

function blobToDataURL(blob) {
    var pro = new ex.FreePromise()
    var a = new FileReader();
    a.onload = function(e) {
        pro.resolve(e.target.result)
        // callback(e.target.result);
    }
    a.readAsDataURL(blob);
    return pro.promise
    // return URL.createObjectURL(blob);
}