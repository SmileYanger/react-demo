<template>
    <div>
        <div class="house-pic">
            <!-- <p class="pic-title">房源照片 <i>（最多上传12张）</i></p> -->
            <ul>
                <li v-for="(file, index) of files">
                    <img :src="file.src" alt="">
                    <i class="iconfont" @click="remove(index)">&#xe674;</i>
                </li>
                <li v-if="status == 'ready'" @click="add">
                     <!-- <div @click="add" class="add">
                        +
                    </div> -->
                    <img src="@/assets/images/upload-img.png" class="add">
                </li>
            </ul>
        </div>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
        <!-- <input v-show="" type="file" accept="image/*" @change="handleFile" ref="hiddenInput"/> -->
        <!-- <span class="submit">发布</span> -->
    </div>
</template>

<script>
export default {
        data() {
            return {
                status: 'ready',
                files: [],
                point: {},
                uploading: false,
                percent: 0,
                newFile:[],  //要传给服务器的数据
                // imglist:[]
            }
        },
        props:{
            emptyImg:String
        },
        methods: {
            add() {
                this.$refs.file.click()
                // console.log('123')
            },
            submit() {
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append(item.name, item.file)
                })
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', this.src, true)
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            async fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''        
                // 异步处理图片
                this.files.forEach( element => {
                        this.newFile = element.file                       
                });
                const formData = new FormData()                       
                formData.append('file', this.newFile)               
                const xhr = new XMLHttpRequest()            
                xhr.open('POST', 'https://www.weixianyu.cn/app/index.php?i=192&t=0&v=3.0&from=wxapp&c=entry&a=wxapp&do=ossimgs&m=zh_tcwq', true)                                        
                xhr.send(formData)                      
                xhr.onreadystatechange = ()=> {
                    if (xhr.readyState === 4 &&xhr.status ===200){
                        // console.log(JSON.parse( xhr.responseText).filename)
                        let newFilles = JSON.parse( xhr.responseText).datas.filename
                        
                        // 商家多图

                        this.$emit("fuImg", newFilles) 
                         //商家logo
                        this.$emit('logoImg',newFilles)

                        //push 图片列表
                        // this.imglist.push(newFilles)

                        // console.log(this.imglist);
                    }
                }

            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        },
         activated () {
           if(this.emptyImg==''){
                 this.files=[]
                 console.log(this.files)
           }
        },

    }
</script>

<style lang="stylus" scoped>
.house-pic
    padding-top .25rem
    height auto
    box-sizing border-box
    width 100%
    background white
    zoom 1
    overflow hidden
    display flex
    justify-content space-between
    margin-left 0%
    
    ul li
        width 18.4%
        height 1.2rem
        float left
        box-sizing border-box
        margin-right 2%
        margin-bottom 2%
        position relative
    ul li:nth-child(5n)
       margin-right 0
    img
        width 100%
        height 100%
    .iconfont
        position absolute
        top -0.07rem
        right 0
    .add
        font-size .6rem
        text-align center
        line-height 1.2rem
        color #ccc
        box-sizing border-box
        min-width 1.2rem
input[type="file"] 
    display none

.submit
    width 7rem
    line-height 0.8rem
    background #3d8afe
    text-align center
    display  block
    font-size .3rem 
    color #fff
    border-radius .06rem
    margin 0.6rem auto 
    letter-spacing 1px
</style>