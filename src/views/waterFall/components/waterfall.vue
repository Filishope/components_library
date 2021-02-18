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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'waterfall'
})
export default class extends Vue{
    private dataObj: object = [];
    private loading: boolean = false;
    private picLens: number = 0;
    @Prop() private columns!: any[]
    @Prop() private cols!: number
    private created() {
      this.picLens = this.columns.length;
      for (let i = 1; i <= this.cols; i++) {
        this.$set(this.dataObj, `column${i}`, []);
        this.$set(this.dataObj, `columnHeight${i}`, 0);
      }
    }
    private mounted() {
      this.columns.forEach((item, i) => {
        if (i < this.cols) {
          (this as any).dataObj[`column${i + 1}`].push(item);
        }
      });

      for (let i = 1; i <= this.cols; i++) {
        this.columns.shift();
      }
      setTimeout(() => {
        this.calcuateHeight();
      }, 1000);
    }
    // 这里是关键、要保证图片onload之后去计算高度
    private loadImage(e:any) {
      if (this.columns.length > 0 && this.columns.length < this.picLens - this.cols) {
        this.calcuateHeight();
      }
    }
    private calcuateHeight() {
        this.$nextTick(() => {
          for (let i = 0; i < this.cols; i++) {
            (this as any).dataObj[`columnHeight${i + 1}`] = (this as any).$refs['column-item'][i].offsetHeight;
          }
          this.assignData();
        });
    }
    private assignData() {
      let heightList = [];
      let minIndex = 0;
      let minHeight:number = 0;
      for (let i = 0; i < this.cols; i++) {
        heightList.push((this as any).dataObj[`columnHeight${i + 1}`]);
      }
      minHeight = Math.min(...heightList);
      minIndex = heightList.findIndex(v => v === minHeight);
      (this as any).dataObj[`column${minIndex + 1}`].push(this.columns[0]);
      this.columns.shift();
    }
}
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
