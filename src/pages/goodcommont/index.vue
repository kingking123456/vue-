<template>
  <div class="goodcommont-continer">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" href="/goodinfo"></a>
      <h1 class="mui-title">商品品论</h1>
    </header>
    <commont :id="id"></commont>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  methods: {}
};
</script>