<template>
<div>
	<header-bar :title="title" ></header-bar>
	<phone-list :bussList="list" :bussList2='list2' style="padding-top:1.28rem"></phone-list>	
</div>
</template>

<script>
import PhoneList from './list.vue'
import HeaderBar from 'common/headerbar.vue'
export default {

  name: 'BusinessList',
  components:{
  	PhoneList,
    HeaderBar
  },

  data () {
    return {
        title:"搜索列表",
        list:[ ], //搜索列表  
        list2:[], //商家搜素列表
    }
  },
  methods:{
    Goback(){
      this.$router.go(-1)
    },
    // 根据传过来的关键字搜素
    async getWeid(acter,keyword,openid){
            const {data:res} = await this.$axios({
              method:'post',
              data:{
                do:'index_search',
                act:acter,
                keywords:keyword,
                page:1,
                psize:10,
                weid:2,
                openid:openid
              }
            })
            console.log(res);
            if(res.code !== '200') {
              this.list2 = []
              return
            }
            this.list2 = res.datas
        },
        //根据县域id搜索  房屋出售   房屋出租   二手交易搜索  个人简历  车辆交易搜索   企业招聘搜索
      async getDistrictid(distr,keyword){
        const {data:res} = await this.$axios({
          method:'post',
          data:{
            do:'index_search',
            districtid:this.$store.state.weid,
            act:distr,
            keywords:keyword,
            page:1,
            psize:5
          }
        })
        console.log(res);
        if(res.code !== '200') return console.log("请求数据失败");
        console.log(res.datas)
      }
  },
  
  async created (){
      var _this=this
      this.bus.$on('',function(value){
        _this.list=value
      })
     
      
      let keyword = this.$route.query.key
      if(keyword !==  undefined){
        const {data:res} = await this.$axios({
            method:'post',
            data:{
                do:'merchant_search',
                weid:this.$store.state.weid,
                page:1,
                psize:8,
                keyword:keyword
            }
        })
        this.list = res.datas
      }
      let  keywords = this.$route.query.keyword
      
      if(keywords !== undefined){
        console.log(11223344)
        console.log(this.$route.query)

        let acter = this.$route.query.acter
        let weid = this.$route.query.weid
        let openid = this.$route.query.openid
        if('weid' === weid){
            this.getWeid(acter,keywords,openid)
        }else {
            this.getDistrictid(acter,keywords)
        }
      }

   
  },
  mounted(){
    
  }
}
</script>

<style lang="stylus" scoped>
.title
  padding .6rem .35rem .2rem
  background rgb(247, 246, 246)
  font-size .32rem
  color #000
  position relative
  text-align center
  letter-spacing 1px
  .iconfont
    width value
    position absolute
    left .35rem
    color #333
</style>