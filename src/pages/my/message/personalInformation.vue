<template>
  <div>
    <header-bar :title="title"></header-bar>
    <div class="save" @click="setUserInfo">保存</div>
    <div style="padding-top: 1.28rem">
      <div class="head" @click="handleClickHead">
        <mt-cell title="头像" is-link>
            <span>
                <img slot="icon" :src="img" width="40" height="40" style="border-radius: 50%">
            </span>
        </mt-cell>
        <input v-show="" type="file" accept="image/*" @change="handleFile" ref="hiddenInput"/>
      </div>
      <div class="box">
        <mt-field label="昵称" class="border-bottom" v-model="name"></mt-field>
        <mt-field label="性别" class="border-bottom" @click.native="showModel(sexArr, 'sex')" v-model="sex" :key="sex"
                  readonly>
          <i class="iconfont arrow">&#xe666;</i>
        </mt-field>
        <picker :slots="slots" @confirm='confirm' @cancel="cancel" v-show="modelState"></picker>
        <group>
          <datetime v-model="birthday" :title="('生日')"></datetime>
        </group>

        <mt-field label="地区" class="mt20" @click.native="showAddress('address')" v-model="address" :key="address"
                  readonly>
          <i class="iconfont arrow">&#xe666;</i>
        </mt-field>
        <address-picker @confirm='confirm' @cancel="cancel" v-show="modelAddressState"></address-picker>
        <x-textarea v-model="pingjia" :max="60" :placeholder="('自我评价')" class="mt20 textarea"></x-textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  Vue.prototype.bus = new Vue()

  import Picker from 'common/picker.vue'
  import HeaderBar from 'common/headerbar.vue'
  import addressPicker from '../components/addressPicker'

  export default {
    name: "",
    components: {
      HeaderBar,
      Picker,
      addressPicker
    },
    data() {
      return {
        dict: this.$route.query.dict,
        name: '',
        title: '个人资料',
        sex: '请选择性别',
        flag: '',
        modelState: false,
        modelAddressState: false,
        slots: [],
        sexArr: [
          {
            flex: 1,
            values: ['男', '女'],
            className: 'slot1',
            textAlign: 'center'
          }],
        birthday: '请选择时间',
        address: '请选择地区',
        pingjia: '',
        img:'',
        newimg: ''
      }
    },
    created(){
      this.changeInformation(this.$route.query.dict)
    },
    methods: {
      handleClickHead() {
        this.$refs.hiddenInput.click()
      },
      handleFile(e) {
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        // 将图片文件转成BASE64格式
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.img = res.result
        }
        reader.readAsDataURL(file)
        const formData = new FormData()
        formData.append('file', file)
        this.$axios({
          url:'https://www.weixianyu.cn/app/index.php?i=192&t=0&v=3.0&from=wxapp&c=entry&a=wxapp&do=ossimgs&m=zh_tcwq',
          method:'post',
          istype:1,
          data: formData
        }).then(res => {
          console.log(res.data.datas.filename)
          this.newimg = res.data.datas.filename
        })
      },
      showModel(txt, flag) {
        this.modelState = true
        console.log(txt, 1)
        this.slots = txt
        this.flag = flag
      },
      showAddress (flag) {
        this.modelAddressState = true
        this.flag = flag
      },
      cancel() {
        this.modelState = false
        this.modelAddressState = false
      },
      confirm() {
        this.modelState = false
        this.modelAddressState = false
      },
      setUserInfo() {
        if (this.newimg == '') {
          this.newimg = this.img.match(/images(\S*)/)[0]
        }
        this.$axios({
          method: 'post',
          data: {
            do: 'userinfo',
            act: 'Edituser',
            tel: this.$route.query.dict.user_tel,
            name: this.name,
            sex: this.sex,
            age: this.birthday,
            address: this.address,
            jianjie: this.pingjia,
            img: this.newimg,
            user_site: this.address
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {

          }
          if (res.data.code === '400') {

          }
        })
      },
      changeInformation(obj) {
        if (obj.name != '') {
          this.name = obj.name
        }
        if (obj.sex != '') {
          this.sex = obj.sex
        }
        if (obj.age != '') {
          this.birthday = obj.age
        }
        if (obj.jianjie != '') {
          this.pingjia = obj.jianjie
        }
        if (obj.user_site != '') {
          this.address = obj.user_site
        }
        if (obj.img != '') {
          this.img = obj.img
        }
      }
    },
    mounted: function () {
      var _this = this
      this.bus.$on('change', function (value) {
        if (_this.flag === 'sex') {
          _this.sex = value
        }
        if (_this.flag === 'address') {
          _this.address = value
        }
      })
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
.save
    position absolute
    top 0.64rem
    right 0.25rem
    color dodgerblue
    font-size 0.3rem
    z-index 100000
.head
    height 1.2rem
    padding-top 0.2rem
    border-bottom  0.2rem solid #f6f6f6

    img[src=""],img:not([src])
      opacity:0
.box
    background #f6f6f6
.box >>> .mint-cell-title
    width 70px
.box >>> .mint-field
    border-right 0.25rem solid white
    border-left 0.25rem solid white
.box >>> .mint-cell-wrapper
    line-height 1rem
    background-image none
    box-sizing border-box
    padding 0
.box >>> .mint-cell-text
    font-size .3rem
    color #333
.box >>> .mint-field-core
    font-size .28rem
    color #ccc
    text-align right
&::-webkit-input-placeholder
    color #ccc
    font-size .28rem
&:-moz-placeholder
    color #ccc
    font-size .28rem
&::-moz-placeholder
    color #ccc
    font-size .28rem
&:-ms-input-placeholder
    color #ccc
    font-size .28rem
.cell-box >>> .mint-cell-wrapper
    width calc(100% - 0.5rem)
    border-bottom 1px solid #f6f6f6
    box-sizing border-box
    margin-left 0.25rem

.arrow
    font-size .4rem
    padding-left .1rem
    color #999
    margin-right -0.1rem
.box >>> .weui-cell
    background white
    font-size 0.3rem
    color #333
    line-height 1rem
    padding 0
    border-bottom 1px solid #eae7e7
    width calc(100% - 0.5rem)
    margin-left 0.25rem
.box >>> .weui-textarea
    height 2.23rem
    color #ccc
    font-size 0.28rem
&::-webkit-input-placeholder
    color #ccc
    font-size .28rem
&:-moz-placeholder
    color #ccc
    font-size .28rem
&::-moz-placeholder
    color #ccc
    font-size .28rem
&:-ms-input-placeholder
    color #ccc
    font-size .28rem
.box >>> .weui-cells:after,
.box >>> .weui-cells:before,
.box >>> .weui-cell:before,
.box >>> .weui-cell:after
    border none !important
.box >>> .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
    color #3d8afe!important
.textarea
    margin 0!important
    padding 0 .25rem!important

.mt20
  margin-bottom 0.2rem
.box >>> .vux-cell-value
    font-size 0.28rem
    margin-right 0.12rem
    color #ccc
    font-weight nomal
.box >>> .weui-cell_access .weui-cell__ft:after
    width 7px
    height 7px
    border-width 1.1px 1.1px 0 0
    border-color #666
.box >>> .vux-no-group-title
    margin-top 0
</style>
