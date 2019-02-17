<template>
  <div class="swiper-container">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) in bannerSwipe" :key="index">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:["bannerSwipe","isfull"]
};
</script>
<style lang="less" scoped>
.swiper-container {
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      img {
        // width: 100%;
        height: 100%;
      }
    }
  }
}
.isfull{
    width:100%
}
</style>