<template>
  <div class="goodinfo-container">
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="good-ball" v-show="fullBall" ref="ball"></div>
    </transition>
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
            <input type="number" v-model="byCount" class="good-info-input" @change="MaxCount">
            <input type="button" value="+" @click="byCount<goodInfo.stock_quantity&&byCount++">
          </div>
          <div class="mui-card-footer gooinfo-now">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" class="goodcar" @click="goodCarShop">加入购物车</mt-button>
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
        <mt-button type="primary" size="large" plain @click="getGoodDetail(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getGoodCommont(id)">商品评论</mt-button>
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
      byCount: 1,
      fullBall: false,
      selectedCount:1 // 默认用户选择1个
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
        //  console.log(result.body);
        if (result.body.status == 0) {
          this.goodInfo = result.body.message[0];
        }
      });
    },
    MaxCount() {
      if (this.byCount > this.goodInfo.stock_quantity) {
        this.byCount = this.goodInfo.stock_quantity;
      }
    },
    goodCarShop() {
      this.fullBall = !this.fullBall;
      /* 拼接处一个要保存到store中car里面对象 */
      let goodInfo = {
        id: this.id,
        count: this.byCount,
        price: this.goodInfo.sell_price,
        selected: true
      }
      this.$store.commit("addToCar", goodInfo)
    },
    beforeEnter(el) {
      this.flag = false;
      //表示动画入场之前，坐标表示位置是在起始位置不动
      //在一次入场动画执行完成之后，在最终位置停下来并不在起始位置，通过这里的位置的设置可以将入场动画结束时的位置调到这里
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //必须要写一下offsetTop，offsetWeith等四种中的其中一种，强制刷新动画
      el.offsetTop;
      //获取小球在页面中的总位置
      const rectObject = this.$refs.ball.getBoundingClientRect();
      //获取小球在页面中的X位置
      const rectObjectX = rectObject.left;
      //获取小球在页面中的Y位置
      const rectObjectY = rectObject.top;
      //获取购物车图标在页面X的位置
      const carShopFontX = document
        .getElementById("badge")
        .getBoundingClientRect().left;
      //获取购物车图标在页面Y的位置
      const carShopFontY = document
        .getElementById("badge")
        .getBoundingClientRect().top;
      //小球动画的运动轨迹
      const xDist = carShopFontX - rectObjectX;
      const yDist = carShopFontY - rectObjectY;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s ease";

      done();
      //done是enter方法的原生的引用函数名，这里表示是回调函数，也就是接下来执行的操作aEnter（），消灭延迟效果。
    },
    afterEnter(el) {
      this.fullBall = !this.fullBall;
    },
    getGoodDetail(id) {
      this.$router.push("/home/gooddetail/" + id);
    },
    getGoodCommont(id) {
      this.$router.push("/home/goodcommont/" + id);
    }
  }
};
</script>
<style lang="less" scoped>
.goodinfo-container {
  background-color: #eee;
  position: relative;

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
  .good-ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 360px;
    left: 145px;
    z-index: 999;
  }
}
</style>