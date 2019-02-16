<template>
  <div class="photoinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <div class="subtitle">
      <span>发表时间:{{photoInfo.add_time}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </div>
    <hr>
    <!-- 缩列图 -->
    <div class="thumbs">
       <img :src="item.src" v-for="item in photoInfoList" :key="item.id">
    </div>
    <!-- 内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>
    <!-- 评论区域 -->
    <commont :id="id"></commont>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      photoInfoList:[]
    };
  },
  created() {
    this.getphotoInfo()
    this.getphotoInfoList()
    //console.log(this.$route)
  },
  methods: {
    getphotoInfo() {
      this.$http.get("getimageInfo/" + this.id).then(result => {
       // console.log(result.body);
        if (result.body.status == 0) {
          this.photoInfo = result.body.message[0];
        }
      });
    },
    getphotoInfoList(){
        this.$http.get('getthumimages/'+this.id).then(result=>{
            console.log(result.body)
            if(result.body.status==0){
                this.photoInfoList=result.body.message
            }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
      display: flex;
      justify-content: space-between;
      font-size: 13px;

  }
  .thumbs{
      img{
        margin: 10px;
        width: 100%;
        display: block;
        box-shadow: 0 0 8px #999
      }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
    text-indent: 2em;
  }
}
</style>
