<template>
  <div>
    <Waterfall :columns="columns" :cols="cols"></Waterfall>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Waterfall from './components/waterfall.vue';
@Component({
  name: 'waterFall',
  components:{
    Waterfall
  }
})
export default class extends Vue{
  private columns: any[] = []
  private cols:number = 4

  created() {
    for (let i = 0; i < 17; i++) {
      this.columns.push({ url: require(`../../assets/img/${i + 1}.jpg`) });
    }
  }
}
</script>