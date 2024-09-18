import store from '@/store'
export  default  {
    media_url(url){
        if(url.startsWith('http')){
            return url
        }else{
            if(url.endsWith('.aes')){
                // var cdn_domain = store.state.url.encryptCdn[0]
                var cdn_domain = store.state.url.fast_h5_encryptCdn // 本地查询的最快h5 cdn

            }else{
                var cdn_domain = store.state.url.cdn[0]
            }
            return  `${cdn_domain}${url}`
            // return  `${cfg.config.media_url}${url}`
        }
    },
    can_navibar(router){
        return false
    }
}