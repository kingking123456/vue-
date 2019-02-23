<template>
  <div class="gooddetail-container">
    <h3 class="gooddetail-title">{{gooddetail.title}}</h3>
    <hr>
    <div v-html="gooddetail.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gooddetail: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getGoodDetail();
  },
  methods: {
    getGoodDetail() {
      this.$http.get("goods/getdesc/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status == 0) {
          this.gooddetail = result.body.message[0];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.gooddetail-container {
  padding: 4px;
  .gooddetail-title {
    text-align: center;
    margin: 15px 0;
    color: #226aff;
    font-size: 16px;
  }
}
</style>
