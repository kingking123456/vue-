<template>
  <div class="newinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newInfos.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{ newInfos.add_time | dataFormat}}</span>
      <span>点击:{{ newInfos.click}}</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newInfos.content"></div>
    <!-- 评论区域 -->
    <commont :id="this.id"></commont>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newInfos: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getNewInfos();
    //console.log(this.$route)
  },
  methods: {
    getNewInfos() {
      this.$http.get("getnew/" + this.id).then(result => {
        console.log(result.body.message);
        this.newInfos = result.body.message[0];
      });
    }
  }
};
</script>
<style lang="less">
.newinfo-container {
  padding: 0 5px;
  .title {
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content{
      img{
          width:100%;
      }
  }
}
</style>