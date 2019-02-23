<template>
  <div class="goodcommont-continer">
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