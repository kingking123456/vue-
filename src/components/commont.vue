<template>
  <div class="commont-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容(最多120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postCommont">发表评论</mt-button>
    <div class="commont-list">
      <div class="commont-item" v-for="(item,i) in commots" :key="i">
        <div class="commont-title">
          第{{i+1}}楼&nbsp;&nbsp;
          用户：{{item.user_name}}&nbsp;&nbsp;
          发表时间:{{item.add_time | dataFormat}}
        </div>
        <div class="commont-contain">{{item.content=='undefined'?'此用户啥都没有评论':item.content}}</div>
      </div>
      <mt-button type="danger" size="large" plain @click="getMore">点击加载更加多</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui"
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页面数据
      commots: [],
      msg:''
    };
  },
  created() {
    this.getCommont()
  },
  methods: {
    getCommont() {
      this.$http
        .get("getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
         // console.log(result.body.message)
          if (result.body.status === 0) {
            this.commots = this.commots.concat(result.body.message)
          } else {
            Toast("获取评论失败了")
          }
        });
    },
    getMore() {
      this.pageIndex++, 
      this.getCommont()
    },
    postCommont(){
        if(this.msg.trim().length==0) return Toast("评论数据不能为空")
        this.$http.post('postcomment/'+this.id,{
          content:this.msg.trim()
        }).then(result=>{
          
         if(result.body.status==0)
              // var addCon ={
              //   user_name:"匿名用户",
              //   add_time:Date.now(),
              //   content:this.msg.trim()
              // }
              // this.commots.unshift(addCon)
              this.commots=[]
              this.getCommont()
              this.pageIndex=1
              this.msg=''
             
          return Toast(result.body.message)
        })
    }
  },

  props: ["id"]
};
</script>
<style lang="less" scoped>
.commont-container {
  h3 {
    font-size: 16px;
  }
  .commont-list {
    padding: 5px 0;
    .commont-item {
      font-size: 13px;
      .commont-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .commont-contain {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>