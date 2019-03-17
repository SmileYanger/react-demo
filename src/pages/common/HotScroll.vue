<template>
	<ul class="hot-item" :class="{anim:animate==true}">
	  <li v-for='(item) in items' :key="item.id" @click='couHead(item.id)'>
	    <div class="hot-content">{{item.title}}</div>
	    <div class="iconfont">&#xe666;</div>
	  </li>
	</ul>
</template>
<script>
	export default {
	  name: 'HotScroll',
	  data() {
	    return {
	      animate: false,
				items: [],
	    }
		},
		
	  created() {
			setInterval(this.scroll, 2000)
		
		
		},
		watch: {
			cityList(val){
				
				this.items = val
			}
		},
		props: ['cityList'],
	  methods: {
	    scroll() {
	      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
	      setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
	        this.items.push(this.items[0]); // 将数组的第一个元素添加到数组的
	        this.items.shift(); //删除数组的第一个元素
	        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
	      }, 500)
			},

			async couHead(id){
			
				this.$router.push({path:'/hotdetails',query:{listId: id}})
				
			}

	  }
	}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.anim
  transition all .5s
  margin-top -85px
.hot-item
	width 100%
	li
		height 0.85rem
		line-height 0.85rem
		display flex
		justify-content space-between
		.hot-content
			ellipsis()
</style>
