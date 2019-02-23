<template>
  <div>
   <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item' ,{'mui-active':item.id==0}]"
          v-for="item in  photoListCon"
          :key="item.id" @click="getPhotoListImg(item.id)"
        >{{item.title}}</a>
      </div>
    </div>
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/'+item.id" tag="li" v-for="item in photoListImg " :key="item.id">
        <img v-lazy="item.img_url">
        <dir class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-con">{{item.zhaiyao}}</div>
        </dir>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "@/libs/mui/js/mui.js";

export default {
  data() {
    return {
      photoListCon: [],
      photoListImg: []
    };
  },
  created() {
    this.getPhotoList();
    this.getPhotoListImg(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoList() {
      this.$http.get("getimgcategory").then(result => {
        //console.log(result.body.message);
        this.photoListCon = result.body.message;
        this.photoListCon.unshift({
          title: "全部",
          id: 0
        });
      });
    },
    getPhotoListImg(cateId) {
      this.$http.get("getimages/" + cateId).then(result => {
        console.log(result.body.message);
        this.photoListImg = result.body.message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    position: relative;
    text-align: left;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    background-color: #ccc;
    img {
      width: 100%;
      vertical-align: middle;
    }
    image[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align:center;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      max-height: 84px;
      .info-title{
        font-size: 14px;
      }
      .info-con{
        font-size: 11px;
        margin: 0;
       
      }
    }
  }
}
</style>
