import store from '@/store'
export  default  {
    media_url(url){
        if(url.startsWith('http')){
            return url
        }else{
            if(url.endsWith('.aes')){
                var cdn_domain = store.state.url.encryptCdn[0]

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