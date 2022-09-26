export  default  {
    media_url(url){
        if(url.startsWith('http')){
            return url
        }else{
            return  `${cfg.config.media_url}${url}`
        }
    }
}