<template>
  <div class="good-container">
    <div
      class="good-item"
      v-for="(item,index) in  goodList"
      :key="index"
      @click="getGoodInfo(item.id)"
    >
      <img :src="item.img_url" alt>
      <h1 class="good-title">{{item.title}}</h1>
      <div class="good-info">
        <p class="good-price">
          <span class="good-now">￥{{ item.sell_price }}</span>
          <span class="good-old">￥{{ item.market_price }}</span>
        </p>
        <p class="good-sell">
          <span>热卖中</span>
          <span>{{item.sell_price}}</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">点击加载更加多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageIndex: 1, //展示第一页数据
      goodList: []
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    getGoodList() {
      this.$http.get("getgoods?pageindex=" + this.pageIndex).then(result => {
        console.log(result.body);
        if (result.body.status == 0) {
          this.goodList = result.body.message;
            // for(var i=0;i<this.goodList.length;i++){

            // }
        }
      });
    },
    getMore(){
        this. pageIndex++,
        this.getGoodList();

    },
    getGoodInfo(id){
        this.$router.push('/home/goodinfo/'+id)
    }
  }
};
</script>
<style lang="less" scoped>
.good-container {
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .good-item {
    width: 49%;
    margin: 4px 0;
    padding: 2px;
    box-shadow: 0 0 8px #ccc;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 100%;
    }
    .good-title {
      font-size: 14px;
    }
    .good-info {
      background-color: #ccc;
      p {
        padding: 5px;
      }
      .good-price {
        .good-now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .good-old {
          margin-left: 10px;
          text-decoration: line-through;
          font-size: 13px;
        }
      }
      .good-sell {
        display: flex;
        justify-content: space-between;
        color: green;
        font-size: 13px;
      }
    }
  }
}
</style>
