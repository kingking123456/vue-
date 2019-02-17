<template>
  <div class="goodinfo-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :bannerSwipe="goodInfoSwiper" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>
                市场价:<del>￥{{goodInfo.market_price}}</del>&nbsp;&nbsp;
                    <span>{{goodInfo.sell_price}}</span>
            </p>
             <p>购买数量：<numbox></numbox>
             </p>
        </div>
      </div>
      <div class="mui-card-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodInfoSwiper: [],
      goodInfo: {}
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
    }
  }
};
</script>