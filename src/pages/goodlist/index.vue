<template>
  <scroller :on-refresh="refresh" :on-infinite="infinite" 
  ref="handle" noDataText="客官没有啦！" :snapping="true"  refreshText="用点力往下拉~~"
   refreshLayerColor="purple" loadingLayerColor="skyblue"> 
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
    </div>
  </scroller>
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
    this.getGoodList()
  },
  mounted() {
    this.$refs.handle.triggerPullToRefresh()
  },
  methods: {
    getGoodList(refresh) {
      // console.log(refresh)
      return this.$http
        .get("getgoods?pageindex=" + this.pageIndex)
        .then(result => {
          if (refresh) {
            this.goodList = result.body.message
          } else {
            this.goodList = this.goodList.concat(result.body.message)
          }
        })
    },
    getGoodInfo(id) {
      this.$router.push("/home/goodinfo/" + id)
    },
    /* 下拉刷新 */
    refresh() {
      //刷新第一页数据
      // this.goodList = []
      //重置索引pageIndex为1
      this.pageIndex = 1;
      this.getGoodList(true).then(() => {
        this.$refs.handle.finishPullToRefresh()
      })
    },
    /* 上拉加载 */
    infinite() {
      console.log("我在加载。。。。")
      this.pageIndex++;
      this.getGoodList().then(() => {
        this.$refs.handle.finishInfinite(this.goodList.length == 15)
      })
    }
  }
}
</script>
<style lang="less">
.pull-to-refresh-layer {
  margin-top: -20px !important;
}
._v-content {
  padding-bottom: 40px;
}
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
