<template>
  <div class="goodinfo-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :bannerSwipe="goodInfoSwiper"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价:
            <del>￥{{goodInfo.market_price}}</del>&nbsp;&nbsp;
            <span class="goodinfo-now">{{goodInfo.sell_price}}</span>
          </p>
          <div class="goodinfo-num">
            <span class="goodinfo-title">购买数量&nbsp;:</span>&nbsp;
            <input type="button" value="-" @click="byCount>=2 && byCount--">
            <input type="number" v-model="byCount" class="good-info-input"  @change="MaxCount">
            <input type="button" value="+" 
            @click="byCount<goodInfo.stock_quantity&&byCount++"
           
            >
          </div>
          <div class="mui-card-footer gooinfo-now">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" class="goodcar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品详情区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>货品商号:{{goodInfo.goods_no}}</p>
          <p>库存情况:{{goodInfo.stock_quantity}}件</p>
          <p>上架时间：{{ goodInfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodInfoSwiper: [],
      goodInfo: {},
      byCount: 1
    };
  },

  created() {
    this.getGoodInfoSwiper();
    this.getGoodInfo();
  },
  methods: {
    getGoodInfoSwiper() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        if (result.body.status == 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.goodInfoSwiper = result.body.message;
        }
      });
    },
    getGoodInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status == 0) {
          this.goodInfo = result.body.message[0];
        }
      });
    },
    MaxCount(){
        if(this.byCount>this.goodInfo.stock_quantity){
            this.byCount=this.goodInfo.stock_quantity
        }
    }
  }
};
</script>
<style lang="less" scoped>
.goodinfo-container {
  background-color: #eee;

  .goodinfo-now {
    color: red;
  }
  .goodinfo-num {
    display: flex;
    height: 50px;
    align-items: center;
    .goodinfo-title {
      font-size: 13px;
    }
    input {
      height: 34px;
      font-size: 13px;
    }
    .good-info-input {
      width: 60px;
      text-align: center;
      margin-bottom: 0px;
    }
  }
  .gooinfo-now {
    justify-content: start;
    margin: 0;
    padding: 0;
    .goodcar {
      margin-left: 3px;
      box-sizing: content-box;
    }
  }
}
</style>