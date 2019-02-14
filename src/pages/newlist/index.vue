<template>
  <div class="newlist-container">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" href="/home"></a>
      <h1 class="mui-title">新闻列表</h1>
    </header>
    <ul class="mui-table-view">
      <!-- <li > -->
      <router-link
        :to="`/home/newinfo/${item.id}`"
        class="mui-table-view-cell mui-media"
        v-for="item in newLists"
        :key="item.id"
        tag="li"
      >
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <h1>{{item.title}}</h1>
          <p class="mui-ellipsis">
            <span>发表时间:{{item.add_time | dataFormat}}</span>
            <span>点击:{{item.click}}</span>
          </p>
        </div>
      </router-link>
      <!-- </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newLists: []
    };
  },
  created() {
    this.getNewLists();
  },
  methods: {
    getNewLists() {
      this.$http.get("getnewslist").then(result => {
        console.log(result.body);
        this.newLists = result.body.message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.newlist-container {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>