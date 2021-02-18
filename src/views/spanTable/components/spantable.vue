<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :span-method="objectSpanMethod"
      :header-cell-style="getRowClass"
      :row-class-name="tableRowClassName"
      :max-height="maxHeight"
      :border="border"
      style="width: 99.9%">
      <slot name="column"></slot>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ISpanOptions } from '@/api/types';
@Component({
  name: 'VSpanTable'
})
export default class extends Vue{
    private spanArr: any[] = [];
    private loading: boolean = false;
    // 表格数据(必填)
    @Prop({ required: true }) private tableData!: any[]
    /* 合并的列数据（必填）
        spanOptions:[{
            columnIndex:0,
            value:'scenicSpotId'
        },{
            columnIndex:1,
            value:'ticketProductId'
        },{
            columnIndex:5,(要合并的列的index)
            specialSpan:true,(非必填，如果该值为true，代表在表尾或其他位置含有合并)
            value:'scenicSpotId'(表尾合并和表头的某列相同)
        }]
    */
    @Prop({ required: true }) private spanOptions!: ISpanOptions[]
    // 表格最大高度
    @Prop({ default: 650, required: false }) private maxHeight!: number
    // 是否需要边框
    @Prop({ default: true }) private border!: boolean
    /* 合并总计合计小计样式
        tableRowClassObj:{
            scenicSpotName: '总计',
            ticketName: '合计'
        }
    */
    @Prop() private tableRowClassObj?: object
    // 是否开启手动更新(若要开启手动更新，要在子组件上添加ref获取方法)
    @Prop({ default: true }) private isUpdate!: boolean


    @Watch('tableData', { deep: true })
    private onTableDataChange(newVal: any[]) {
        this.isUpdate && this.getListDataForRowAndColumn(newVal);
    }

    @Watch('spanOptions', { deep: true })
    private onSpanOptionsChange(val: any[]) {
        let arr = JSON.parse(JSON.stringify(val)).filter((v:ISpanOptions) => !v.specialSpan);
        for (let i of arr) {
            (this as any)[`arr${i.value}`] = [];
            (this as any)[`pos${i.value}`] = 0;
        }
        this.getListDataForRowAndColumn(this.tableData);
    }

    created() {
        this.spanArr = JSON.parse(JSON.stringify(this.spanOptions)).filter((v:ISpanOptions) => !v.specialSpan);
        // 初始化需要的数组及下标
        for (let i of this.spanArr) {
            (this as any)[`arr${i.value}`] = [];
            (this as any)[`pos${i.value}`] = 0;
        }
        this.getListDataForRowAndColumn(this.tableData);
    }

    getRowClass({ rowIndex }:{rowIndex: number}) {
        if (rowIndex === 0) {
            return {
                'background': '#F6F8FC',
                'font-size': '1rem',
                'font-family': 'MicrosoftYaHei',
                'font-weight': '400',
                'color': 'rgba(102,102,102,1)',
                'padding': '0.58rem 0'
            };
        }
        return '';
    }

    // 合计总计样式
    tableRowClassName({ row }: {row: any}) {
        if (this.tableRowClassObj) {
            for (let [i, v] of Object.entries(this.tableRowClassObj)) {
                let count = 0;
                if (row[i] === v) {
                    return 'new-table-td-sum';
                }
                count++;
                if (count > Object.entries(this.tableRowClassObj).length) {
                    return '';
                }
            }
        }
    }

    // 递归判断
    spanFunc(tableData:any[], i:number, options: any[]) {
        let { value } = options[0];
        if (tableData[i][value] === tableData[i - 1][value]) {
            (this as any)[`arr${value}`][(this as any)[`pos${value}`]] += 1;
            (this as any)[`arr${value}`].push(0);
            if (options.length > 1) {
                options.shift();
                this.spanFunc(tableData, i, options);
            }
        } else {
            for (let k of options) {
                (this as any)[`arr${k.value}`].push(1);
                (this as any)[`pos${k.value}`] = i;
            }
        }
    }

    // 合并相同内容
    getListDataForRowAndColumn(tableData:any[]) {
        console.log(this.spanArr)
        let { value: valueFirst } = this.spanArr[0];
        this.loading = true;
        for (let i of this.spanArr) {
            (this as any)[`arr${i.value}`] = [];
            (this as any)[`pos${i.value}`] = 0;
        }

        for (let i = 0; i < tableData.length; i++) {
            if (i === 0) {
                // 如果是第一条记录（即索引是0的时候），向数组中加入１
                for (let j of this.spanArr) {
                    (this as any)[`arr${j.value}`].push(1);
                    (this as any)[`pos${j.value}`] = 0;
                }
            } else if (tableData[i][valueFirst] === tableData[i - 1][valueFirst]) {
                (this as any)[`arr${valueFirst}`][(this as any)[`pos${valueFirst}`]] += 1;
                (this as any)[`arr${valueFirst}`].push(0);
                // 若要合并的列数不止1列
                if (this.spanArr && this.spanArr.length > 1) {
                    let arr = JSON.parse(JSON.stringify(this.spanArr));
                    arr.shift();
                    this.spanFunc(tableData, i, arr);
                }
            } else {
                // 不相等push 1
                for (let j of this.spanArr) {
                    (this as any)[`arr${j.value}`].push(1);
                    (this as any)[`pos${j.value}`] = i;
                }
            }
        }
        setTimeout(() => {
            this.loading = false;
        }, 0);
    }

    objectSpanMethod({ rowIndex, columnIndex }:{rowIndex:number, columnIndex:number}) {
        for (let i of this.spanOptions) {
            if (columnIndex === Number(i.columnIndex)) {
                if ((this as any)[`arr${i.value}`][rowIndex]) {
                    let span = (this as any)[`arr${i.value}`][rowIndex];
                    return {
                        rowspan: span,
                        colspan: span > 0 ? 1 : 0
                    };
                }
                return { 
                    rowspan: 0,
                    colspan: 0
                };
            }
        }
    }
}
</script>
<style lang="scss">
    .el-table .new-table-td-sum {
        background: #f4f4f4; 
    }
</style>

