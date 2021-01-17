<template>
    <div class="container">
        <!-- <h1> Wellcome to Staff!!!</h1>   -->
        <el-table
            :data="tableData"
            class="table"
            ref="multipleTable"
            empty-text="No Data"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
            @row-click="handleEdit"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column v-if="false" prop="id" label="ID" width="100" align="center"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="totalPrice" label="总价"></el-table-column>
             <el-table-column prop="createdAt" label="时间"></el-table-column>
              <el-table-column prop="opname" label="操作人"></el-table-column>
               <el-table-column prop="opreation" label="操作"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="query.page"
                :page-size="query.size"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px" label-position="left">
                <el-form-item label="状态:">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>
                 <el-form-item label="总价:">
                    <el-input v-model="form.totalPrice"></el-input>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-input v-model="form.createdAt"></el-input>
                </el-form-item>
                 <el-form-item label="操作人:">
                    <el-input v-model="form.opname"></el-input>
                </el-form-item>
                 <el-form-item label="操作:">
                    <el-input v-model="form.opreation"></el-input>
                </el-form-item>                                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">Cancel</el-button>
                <el-button type="primary" @click="saveEdit">OK</el-button>
            </span>
        </el-dialog>        
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            multipleSelection: [],
            editVisible: false,
            edit:false,
            pageTotal: 0,
            form: {},
            tableData:[
               
            ],
            query:{
                page:0,
                size:20,
            }
        }
    },
    methods:{
        handleDelete(index, row) {
            this.$confirm('Are you sure to DELETE ? ', '', {
                type: 'warning'
            }).then(() => {
                   this.delAllSelection();
            }).catch(() => {});
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            if (length <= 0) {
                return
            }

            let data = {
                ids:[],
            };

            for (let i=0; i< length; i++) {
               data.ids.push(this.multipleSelection[i].id)
            }   
            // handle something
        },         
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleEdit(row){
            this.form = row;
            this.edit = true;
            this.dialogTitle = "修改订单信息";
            this.editVisible = true;
        },
        handlePageChange() {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        saveEdit() {
            this.$message.success(`Success`);
        },
    },
}
</script>

<style>
.container {
   margin-top: 70px;
}
</style>