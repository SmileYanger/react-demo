import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Service from '@/pages/service/Service'
import Release from '@/pages/release/Release'
import Circle from '@/pages/circle/Circle'
import My from '@/pages/my/My'
import MyCity from '@/pages/city/City.vue'
// Home

//首页搜索
import HomeSearch from '@/pages/home/homesearch.vue'
import InformationList from '@/pages/home/iconsFiles/homepageSearch/informationList.vue'
import ActivityList from '@/pages/home/iconsFiles/homepageSearch/activityList.vue'
import ActList from '@/pages/home/iconsFiles/homepageSearch/components/actList.vue'
import HousesSale from '@/pages/home/iconsFiles/homepageSearch/housesSale.vue'
import HouseRens from '@/pages/home/iconsFiles/homepageSearch/houseRentals.vue'
import EnterRecruitment from '@/pages/home/iconsFiles/homepageSearch/enterpriseRecruitment.vue'
import PerJobHunting from '@/pages/home/iconsFiles/homepageSearch/personalJob.vue'
import VehTransaction from '@/pages/home/iconsFiles/homepageSearch/vehicleTransaction.vue'
import SecondGoods from '@/pages/home/iconsFiles/homepageSearch/secondhandGoods.vue'
import CarpoCenter from '@/pages/home/iconsFiles/homepageSearch/carpoCenter.vue'


// 热点资讯
import HotInformation from '@/pages/home/iconsFiles/hotInformation/list.vue'
import HotDetails from '@/pages/home/iconsFiles/hotInformation/details.vue'
import Replay from '@/pages/common/information/replay.vue'
// 农业信息
import AgriculturalInformation from '@/pages/home/iconsFiles/agriculturalInformation/list.vue'
// 服务公众号
import PublicNumber from '@/pages/home/iconsFiles/publicNumber/index.vue'
import PublicList from '@/pages/home/iconsFiles/publicNumber/list.vue'
import PublicDetails from '@/pages/home/iconsFiles/publicNumber/details.vue'
import Artic from '@/pages/home/iconsFiles/publicNumber/articles.vue'
import HistoricalSearch from '@/pages/home/iconsFiles/publicNumber/historicalSearch.vue'
import PubList from '@/pages/home/iconsFiles/publicNumber/publicList.vue'
// 便民电话
import CivilianTelephone from '@/pages/home/iconsFiles/civilianTelephone/index.vue'
import SearchList from '@/pages/home/iconsFiles/civilianTelephone/searchlist.vue'
import HistoricalsList from '@/pages/home/iconsFiles/civilianTelephone/historicalSearch.vue'
// 最新活动
import LatestActivities from '@/pages/home/iconsFiles/latestActivities/list.vue'
import ActiveSearch from '@/pages/home/iconsFiles/latestActivities/searchmessage.vue'
import MoreInfo from '@/pages/home/iconsFiles/latestActivities/viewmessage.vue'
import MemberList from '@/pages/home/iconsFiles/latestActivities/memberlist.vue'
import TrailNotice from '@/pages/home/iconsFiles/latestActivities/trailnotice.vue'
import ActivityApply from '@/pages/home/iconsFiles/latestActivities/activityapply.vue'
import HistoricalFind from '@/pages/home/iconsFiles/latestActivities/historicalfind.vue'
import ActivList from '@/pages/home/iconsFiles/latestActivities/activlist.vue'
// 特色名品
import CharacteristicGoods from '@/pages/home/iconsFiles/characteristicGoods/list.vue'
import myDetails2 from '@/pages/home/iconsFiles/characteristicGoods/details.vue'
// 商家黄页
import YellowPages from '@/pages/home/iconsFiles/yellowPages/list.vue'
import IconList from '@/pages/home/iconsFiles/yellowPages/components/iconlist.vue'
import HotBusiness from '@/pages/home/iconsFiles/yellowPages/components/hotbusiness.vue'
import HotEnter from '@/pages/home/iconsFiles/yellowPages/components/enter.vue'
import YellowDetails from '@/pages/home/iconsFiles/yellowPages/components/hotdetails.vue'
import YellowSearch from '@/pages/home/iconsFiles/yellowPages/components/searchlist'
import BusinessPicture from '@/pages/home/iconsFiles/yellowPages/components/businesspicture'
import BusinessList from '@/pages/home/iconsFiles/yellowPages/components/businessList.vue'
// 文化旅游
import CulturalTourism from '@/pages/home/iconsFiles/culturalTourism/list.vue'
import myMap from '@/pages/common/map.vue'
import myMap2 from '@/pages/common/map2.vue'
// 发布页面
import HouseSale from '@/pages/release/components/housesale/housesale.vue'
import HouseRentals from '@/pages/release/components/houserentals/houserentals.vue'
import Company from '@/pages/release/components/company/company.vue'
import JobHunting from '@/pages/release/components/jobhunting/jobhunting.vue'
import VehicleTransaction from '@/pages/release/components/vehicletransaction/vehicletransaction.vue'
import SecondHandgoods from '@/pages/release/components/secondhandgoods/secondhandgoods.vue'
import CarpoolCenter from '@/pages/release/components/carpoolcenter/carpoolcenter.vue'
import WorkExperience from '@/pages/release/components/jobhunting/workexperience.vue'

//房屋出售详情页面
import HouseSaleDetail from '@/pages/service/detail/houseSaleDetail'
import HouseRentDetail from '@/pages/service/detail/houseRentDetail'
import CarDetail from '@/pages/service/detail/carDetail'
import PersonalJobDetail from '@/pages/service/detail/PersonalJobDetail'
import Carpool from '@/pages/service/detail/Carpool'
import recruitmentDetail from '@/pages/service/detail/recruitmentDetail'
import secondHandDetail from '@/pages/service/detail/secondHandDetail'

//我的
import Login from '@/pages/my/Login/login'
import Register from '@/pages/my/Login/register'
import forgetPassword from '@/pages/my/Login/forgetPassword'
import myMessage from '@/pages/my/message/myMessage'
import customerFeedback from '@/pages/my/message/customerFeedback'
import commonProblem from '@/pages/my/message/commonProblem'
import systemSetting from '@/pages/my/message/systemSetting'
import accoutSetting from '@/pages/my/message/accoutSetting'
import personalInformation from '@/pages/my/message/personalInformation'
import onlineService from '@/pages/my/message/onlineService'
import myRelease from '@/pages/my/message/myRelease'
import myActivities from '@/pages/my/message/myActivities'
import myBrowsing from '@/pages/my/message/myBrowsing'
import myCollection from '@/pages/my/message/myCollection'


//圈子
import ParticularPage from '@/pages/circle/components/particularpage'
import ReplyInfo from '@/pages/circle/components/replyinfo'
import Text from '@/pages/circle/components/text'
import PicPublish from '@/pages/circle/components/picpublish'
import UpCircle from '@/pages/circle/components/upcircle'
import UpVideo from '@/pages/circle/components/upvideo'
import cMap from '@/pages/circle/components/cmap'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'Home',
      
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    },
    {
      path: '/release',
      name: 'Release',
      component: Release
    },
    {
      path: '/circle',
      name: 'myCircle',
      component: Circle
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/mycity',
      name: 'MyCity',
      component: MyCity
    },
   
    {
      path: '/homesearch',
      name: 'HomeSearch',
      component: HomeSearch
    },
    {
      path: '/informationList',
      name: 'InformationList',
      component: InformationList
    },
    {
      path: '/activityList',
      name: 'ActivityList',
      component: ActivityList
    },
    {
      path: '/actList',
      name: 'ActList',
      component: ActList
    },
    {
      path: '/housesSale',
      name: 'HousesSale',
      component: HousesSale
    },
    {
      path: '/houseRens',
      name: 'HouseRens',
      component: HouseRens
    },
    {
      path: '/enterRecruitment',
      name: 'EnterRecruitment',
      component: EnterRecruitment
    },
    {
      path: '/perJobHunting',
      name: 'PerJobHunting',
      component: PerJobHunting
    },
    {
      path: '/vehTransaction',
      name: 'VehTransaction',
      component: VehTransaction
    },
    {
      path: '/secondGoods',
      name: 'SecondGoods',
      component: SecondGoods
    },
    {
      path: '/carpoCenter',
      name: 'CarpoCenter',
      component: CarpoCenter
    },
    
    // Home
    {
      path: '/hotInformation',
      name: 'HotInformation',
      component: HotInformation
    },
    {
      path: '/agriculturaiInformation',
      name: 'AgriculturalInformation',
      component: AgriculturalInformation
    },
    {
      path: '/publicnumber',
      name: 'PublicNumber',
      component: PublicNumber
    },
    {
      path: '/civilianTelephone',
      name: 'CivilianTelephone',
      component: CivilianTelephone
    },
    {
      path: '/latestActivities',
      name: 'LatestActivities',
      component: LatestActivities
    },
    {
      path: '/characteristicGoods',
      name: 'CharacteristicGoods',
      component: CharacteristicGoods
    },
    // 商家黄页
    {
      path: '/yellowPages',
      name: 'YellowPages',
      component: YellowPages
    },
    {  //banner菜单跳转
      path: '/iconlist',
      name: 'IconList',
      component: IconList
    },
    {  //热门商家
      path: '/hotbusiness',
      name: 'HotBusiness',
      component: HotBusiness
    },
    {  //我要入住
      path: '/hotenter',
      name: 'HotEnter',
      component: HotEnter
    },
    {   //商家黄页详情页
      path: '/yellowdetails',
      name: 'YellowDetails',
      component: YellowDetails
    },
    {   //商家黄页搜索列表
      path: '/yellowsearch',
      name: 'YellowSearch',
      component: YellowSearch
    },
    {   //商家图片
      path: '/businesspicture',
      name: 'BusinessPicture',
      component: BusinessPicture
    },
    //商家搜素列表
    {
      path: '/businessList',
      name: 'BusinessList',
      component: BusinessList
    },
    // 便民电话
    {
      path: '/mymap',
      name: 'myMap',
      component: myMap
    },
    {
      path: '/mymap2',
      name: 'myMap2',
      component: myMap2,
    },
    {
      path: '/historicalslist',
      name: 'HistoricalsList',
      component: HistoricalsList
    },
    {
      path: '/searchlist',
      name: 'SearchList',
      component: SearchList
    },


    {
      path: '/culturalTourism',
      name: 'CulturalTourism',
      component: CulturalTourism
    },

    // 服务
    {
      path: '/houseSaleDetail',
      name: 'HouseSaleDetail',
      component: HouseSaleDetail
    },
    {
      path: '/houseRentDetail',
      name: 'HouseRentDetail',
      component: HouseRentDetail
    },
    {
      path: '/carDetail',
      name: 'CarDetail',
      component: CarDetail
    },
    {
      path: '/PersonalJobDetail',
      name: 'PersonalJobDetail',
      component: PersonalJobDetail
    },
    {
      path: '/recruitmentDetail',
      name: 'recruitmentDetail',
      component: recruitmentDetail
    },
    {
      path: '/secondHandDetail',
      name: 'secondHandDetail',
      component: secondHandDetail
    },
    {
      path: '/Carpool',
      name: 'Carpool',
      component: Carpool
    },
    // 发布
    {
      path: '/housesale',
      name: 'HouseSale',
      component: HouseSale,
      meta:{
        keepAlive:true
      }
     
    },
    {
      path: '/houserentals',
      name: 'HouseRentals',
      component: HouseRentals,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/company',
      name: 'Company',
      component: Company,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/jobhunting',
      name: 'JobHunting',
      component: JobHunting,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/vehicletransaction',
      name: 'VehicleTransaction',
      component: VehicleTransaction
    },
    {
      path: '/secondhandgoods',
      name: 'SecondHandgoods',
      component: SecondHandgoods
    }, {
      path: '/carpoolcenter',
      name: 'CarpoolCenter',
      component: CarpoolCenter,
      meta:{
        keepAlive:true
      }
    },
    // 工作经验
    {
      path: '/workexperience',
      name: 'WorkExperience',
      component: WorkExperience
    },

    //登录注册
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    // 热点资讯
    {
      path: '/hotdetails',
      name: 'HotDetails',
      component: HotDetails
    },
    {
      path: '/replay',
      name: 'Replay',
      component: Replay
    },
    // 我的消息
    {
      path: '/myMessage',
      name: 'myMessage',
      component: myMessage
    },
    // 我的发布
    {
      path: '/myRelease',
      name: 'myRelease',
      component: myRelease
    },
    // 用户反馈
    {
      path: '/customerFeedback',
      name: 'customerFeedback',
      component: customerFeedback
    },
    // 常见问题
    {
      path: '/commonProblem',
      name: 'commonProblem',
      component: commonProblem
    },
    // 系统设置
    {
      path: '/systemSetting',
      name: 'systemSetting',
      component: systemSetting
    },
    // 账户设置
    {
      path: '/accoutSetting',
      name: 'accoutSetting',
      component: accoutSetting
    },
    // 个人中心
    {
      path: '/personalInformation',
      name: 'personalInformation',
      component: personalInformation
    },
    // 在线客服
    {
      path: '/onlineService',
      name: 'onlineService',
      component: onlineService
    },
    // 我的活动
    {
      path: '/myActivities',
      name: 'myActivities',
      component: myActivities
    },
    // 我的收藏
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection
    },
    // 我的浏览
    {
      path: '/myBrowsing',
      name: 'myBrowsing',
      component: myBrowsing
    },

    // 特色名品详情页
    {
      path: '/mydetails2',
      name: 'myDetails2',
      component: myDetails2
    },
    // 服务公众号列表页
    {
      path: '/publiclist',
      name: 'PublicList',
      component: PublicList
    },
    {
      path: '/publicdetails',
      name: 'PublicDetails',
      component: PublicDetails
    },
    //活动详情
    {
      path: '/activesearch',
      name: 'ActiveSearch',
      component: ActiveSearch
    },
    //moremessage
    {
      path: '/moreinfo',
      name: 'MoreInfo',
      component: MoreInfo
    },
    //会员列表
    {
      path: '/memberlist',
      name: 'MemberList',
      component: MemberList
    },
    //活动页面
    {
      path: '/particularpage',
      name: 'ParticularPage',
      component: ParticularPage
    },
    //回复评论
    {
      path: '/replyinfo',
      name: 'ReplyInfo',
      component: ReplyInfo
    },
    //文字
    {
      path: '/text',
      name: 'Text',
      component: Text
    },
    {
      path: '/picpublish',
      name: 'PicPublish',
      component: PicPublish
    },
    {
      path: '/upcircle',
      name: 'UpCircle',
      component: UpCircle
    },
    {
      path: '/trailnotice',
      name: 'TrailNotice',
      component: TrailNotice
    },
    {
      path:'/activityapply',
      name:'ActivityApply',
      component:ActivityApply
    },
    {
      path:'/upvideo',
      name:'UpVideo',
      component:UpVideo
    },
    {
      path:'/cmap',
      name:'cMap',
      component:cMap
    },
    {
      path:'/artic',
      name:'Artic',
      component:Artic
    },
    {
      path:'/historicalfind',
      name:'HistoricalFind',
      component:HistoricalFind
    },
    {
      path:'/activlist',
      name:'ActivList',
      component:ActivList
    },
    {
      path:'/historicalSearch',
      name:'HistoricalSearch',
      component:HistoricalSearch
    },
    {
      path:'/publist',
      name:'PubList',
      component:PubList
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
