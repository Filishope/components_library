<template>
  <div class="box">
    <div class="column" v-for="i in cols" :key="i">
      <template>
          <slot :name="`col-${i+1}`">
          </slot>
          <div ref="column-item">
            <div class="column-item" v-for="(col, index) in dataObj[`column${i}`]" :key="index">
              <img @load="loadImage" :src="col.url" alt="">
            </div>
          </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    cols: Number
  },
  data() {
    return {
      dataObj: {},
      picLens: 0
    };
  },

  created() {
    this.picLens = this.columns.length;
    for (let i = 1; i <= this.cols; i++) {
      this.$set(this.dataObj, `column${i}`, []);
      this.$set(this.dataObj, `columnHeight${i}`, 0);
    }
  },
  mounted() {
    this.columns.forEach((item, i) => {
      if (i < this.cols) {
        this.dataObj[`column${i + 1}`].push(item);
      }
    });

    for (let i = 1; i <= this.cols; i++) {
      this.columns.shift();
    }
    setTimeout(() => {
      this.calcuateHeight();
    }, 1000);
  },
  methods: {
    // 这里是关键、要保证图片onload之后去计算高度
    loadImage(e) {
      if (this.columns.length > 0 && this.columns.length < this.picLens - this.cols) {
        this.calcuateHeight();
      }
    },
    calcuateHeight() {
        this.$nextTick(() => {
          for (let i = 0; i < this.cols; i++) {
            this.dataObj[`columnHeight${i + 1}`] = this.$refs['column-item'][i].offsetHeight;
          }
          this.assignData();
        });
    },
    assignData() {
      let heightList = [];
      let minIndex = 0;
      let minHeight = null;
      for (let i = 0; i < this.cols; i++) {
        heightList.push(this.dataObj[`columnHeight${i + 1}`]);
      }
      minHeight = Math.min(...heightList);
      minIndex = heightList.findIndex(v => v === minHeight);
      this.dataObj[`column${minIndex + 1}`].push(this.columns[0]);
      this.columns.shift();
    }
  }
};

</script>
<style scoped>
.box{
  display: flex;
  justify-content: space-between;
}
.column{
  display: flex;
  flex: 1;
  margin-right: 10px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
.column-item > img{
  width: 100%;
}
</style>
