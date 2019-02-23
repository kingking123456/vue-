<template>
  <div class="car-container">
    <div class="shopcar-good">
      <div class="mui-card" v-for="item in goodList" :key="item.id">
        <div class="mui-card-content">
          <div calss="mui-card-content-inner" class="shopcar-content">
            <div></div>
            <img :src="item.thumb_path" alt>
            <div class="shopcar-info">
              <h1>{{item.title}}</h1>
              <div class="shopcar-numbox">
                <span class="shopcar-price">￥{{item.sell_price}}</span>
                <div class="num">
                  <input type="button" value="-" @click="subtract(item.id)">
                  <input type="number" class="shopcar-input" v-model="goodCount[item.id]">
                  <input type="button" value="+" @click="increment(item.id)">
                </div>
                <a href="#" class="shopcar-del">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red"></span> 件， 总价
              <span class="red"></span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodList: [],
      goodCount: this.$store.getters.goodCount
    };
  },
  created() {
    this.getGoodList()
  },
  methods: {
    getGoodList() {
      let arrAdd = []
      this.$store.state.car.forEach(item => arrAdd.push(item.id))
      if (arrAdd.length <= 0) return;

      this.$http
        .get("goods/getshopcarlist/" + arrAdd.join(","))
        .then(result => {
          //console.log(result.body);
          if (result.body.status == 0) {
            this.goodList = result.body.message
          }
        });
    },
    subtract(id) {
      this.goodCount[id] > 1 && this.goodCount[id]--
      this.$store.commit("updateCount", { id, count: this.goodCount[id] })
    },
    increment(id) {
      this.goodCount[id] <= 2 && this.goodCount[id]++
      this.$store.commit("updateCount", { id, count: this.goodCount[id] })
    }
  }
};
</script>
<style lang="less" scoped>
.car-container {
  background-color: #eee;
  .shopcar-good {
    .shopcar-content {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      img {
        width: 60px;
      }
      .shopcar-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: 14px;
          //   line-height: 30px;
        }
        .shopcar-numbox {
          display: flex;
          align-items: center;
          //   justify-content: space-between;
          margin-top: 10px;
          .shopcar-price {
            color: red;
            font-weight: bold;
          }
          .num {
            display: flex;
            align-items: center;
            margin-left: 20px;
            input {
              height: 34px;
              width: 34px;
              font-size: 13px;
            }
            .shopcar-input {
              margin-bottom: 0;
              text-align: center;
            }
          }
          .shopcar-del {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
