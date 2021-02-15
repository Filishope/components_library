<template>
    <div class="flex-content">
        <v-span-table style="width:70%" isUpdate :tableRowClassObj="tableRowClassObj" :tableData="timeIntervalList" :spanOptions="spanOptions" ref="spanTable">
            <template #column>
                <el-table-column prop="timeSection" label="时段" align="center"></el-table-column>
                <el-table-column prop="areaName" label="区域" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column prop="price" label="价格" align="center"></el-table-column>
                <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
            </template>
        </v-span-table>
    </div>
</template>

<script lang="ts">
import VSpanTable from './components/spantable.vue';
import { Component, Vue } from 'vue-property-decorator';
import { ItimeInterrval } from '@/api/types';
@Component({
  name: 'spantable',
  components: {
    VSpanTable,
  }
})
export default class extends Vue {
    private timeIntervalList: ItimeInterrval[] = [];
    private spanOptions = [{
                columnIndex: 0,
                value: 'timeSection'
            }, {
                columnIndex: 1,
                value: 'areaName'
            }];
    private tableRowClassObj = { price: '总计' };
    mounted() {
        this.timeIntervalList = [
            { timeSection: '时段1', areaName: '区域1', name: 'aaa', price: 1, createTime: '2020-10-1' },
            { timeSection: '时段1', areaName: '区域1', name: 'bbb', price: 3, createTime: '2020-10-2' },
            { timeSection: '时段1', areaName: '区域2', name: 'ccc', price: 123, createTime: '2020-10-3' },
            { timeSection: '时段1', areaName: '区域2', name: 'ddd', price: 551, createTime: '2020-10-4' },
            { timeSection: '时段1', areaName: '区域3', name: 'eee', price: 256, createTime: '2020-10-5' },
            { timeSection: '时段2', areaName: '区域3', name: 'fff', price: 213, createTime: '2020-10-6' },
            { timeSection: '时段2', areaName: '区域1', name: 'ggg', price: 66, createTime: '2020-10-7' },
            { timeSection: '时段3', areaName: '区域2', name: 'hhh', price: 89, createTime: '2020-10-8' },
            { timeSection: '时段3', areaName: '区域11', name: 'iii', price: 290, createTime: '2020-10-9' },
            { timeSection: '时段3', areaName: '区域11', name: 'jjj', price: 4, createTime: '2020-10-10' }
        ];
    }
}
</script>

<style scoped>
.flex-content{
    display: flex;
    justify-content: center;
}
</style>
