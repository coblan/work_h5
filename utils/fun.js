import store from '@/store'
export  default  {
    media_url(url){
        if(url.startsWith('http')){
            return url
        }else{
            var media_url = store.state.url.cdn[0]
            return  `${media_url}${url}`
            // return  `${cfg.config.media_url}${url}`
        }
    },
    can_navibar(router){
        return false
    }
}