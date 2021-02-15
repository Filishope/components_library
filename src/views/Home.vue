<template>
  <div class="home">
    <div class="button-group" v-for="component in components" :key="component.value">
      <el-button type="primary" @click="toComponents(component.value)">{{component.label}}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface Icomponents {
  label:string
  value:string
}
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Home'
})
export default class extends Vue {
  private components:Array<Icomponents> = [
    { label: '表格合并', value: 'spanTable' },
    { label: '瀑布流', value: 'waterFall' }
  ]

  toComponents(name: string) {
    this.$router.push({ name });
  }
}
</script>
<style scoped>
.button-group{
  margin-bottom: 12px;
}
</style>
