<template>
  <div>
    <Waterfall :columns="columns" :cols="cols"></Waterfall>
  </div>
</template>

<script>
import Waterfall from './components/waterfall';
export default {
  components: {
    Waterfall
  },
  data() {
    return {
      columns: [],
      cols: 4
    };
  },

  created() {
    for (let i = 0; i < 17; i++) {
      this.columns.push({ url: require(`../../assets/img/${i + 1}.jpg`) });
    }
  },

  methods: {}
};
</script>
<style scoped></style>
