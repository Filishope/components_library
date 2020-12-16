<template>
    <div>
        <v-span-table isUpdate :tableData="timeIntervalList" :spanOptions="spanOptions" ref="spanTable">
            <template #column>
                <el-table-column prop="timeSection" label="时段" align="center"></el-table-column>
                <el-table-column prop="areaName" label="区域" align="center"></el-table-column>
            </template>
        </v-span-table>
    </div>
</template>

<script>
import VSpanTable from './index.vue'
export default {
    name:'spantable',
    components:{
        VSpanTable
    },
    data(){
        return{
            timeIntervalList:[],
            spanOptions:[{
                columnIndex:0,
                value:'timeSection'
            }],
        }
    }
}
</script>

<style>

</style>