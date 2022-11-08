<template>
  <div>
    <div style="text-align: center;font-size: 120%;padding: .3rem">手机登录</div>
    <div>
      <fields class=" my-field" :heads="heads" :row="row"></fields>
    </div>

    <div >
      <van-button style="width: 80%;margin: .3rem auto" type="primary" @click.native="doLogin">登录</van-button>
    </div>

  </div>
</template>
<script>
import fields from 'weblib/mb/fields.vue'
import imageValidate from 'weblib/mb/uis/imageValidate.vue'
import  ex from 'weblib/ex'
import {setToken} from '@/utils/auth'
export default {
  components:{
    fields
  },
  data(){
    return {
      heads:[
        {name:'phone',label:'手机号码',editor: 'com-field-phone',country_code:['+86']},
        {name:'vCode',label:'验证码',editor: 'com-field-validate-code',sendCode:async ({vc})=>{

            var send_code = async  (vkey,vcode)=>{
              if(vkey){
                var dc = {
                  key:vkey,
                  code:vcode
                }
              }else{
                var dc ={}
              }

              if(!vc.row.phone){
                cfg.toast('请先填写手机号码')
                return
              }
              var phone = vc.row.phone
              cfg.show_load()
              var resp = await cfg.server.get(`/home/vcode/generate/${phone}`,dc)
              cfg.hide_load()
              if(resp.data.success){
                if(resp.data.data){
                  var resp_dc = await cfg.pop_vue_com(imageValidate,{image_fun:async (scope)=>{
                      cfg.show_load()
                      var resp2 = await cfg.server.get('/home/vcode/img/generate')
                      cfg.hide_load()
                      var base_code =  resp2.data.data.base64Img
                      return {
                        vkey:resp2.data.data.key,
                        image_url: `data:image/png;base64,${base_code}`
                      }
                    }})
                  if(resp_dc){
                    send_code(resp_dc.vkey,resp_dc.vcode)
                  }
                }else{
                  cfg.toast('发送成功')
                  vc.elapse = 120
                }

              }

            }

            send_code()
          }},
      ],
      row:{}
    }

  },
  methods:{
    async doLogin(){
      var error = await ex.vld.validate(this.row,{
          phone:[ex.vld.notNull("手机不能为空")],
          vCode:[ex.vld.notNull('验证码不能为空')]
      })
      if(error){
        cfg.showError(error)
        return
      }
      cfg.show_load()
      var resp = await  cfg.server.post('/home/login/vcode',this.row)
      cfg.hide_load()
      var token = resp.data.data
      setToken(token)
      if(resp.data.success){
        cfg.toast('登录成功')
        this.$router.push('/')
        setTimeout(()=>{
          location.reload()
        },1500)
      }

    }
  }
}
</script>