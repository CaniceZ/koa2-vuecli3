<template>
    <div class="my-list">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-row :gutter="24" class="head-top">
        <el-col :span="20">
          <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="small" class="finish-item" type="primary" @click="addTodos">确定</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          label="作者"
          width="180">
          <template slot-scope="scope">
            {{scope.row.userInfo.username}}
          </template>
        </el-table-column>
        <el-table-column
          label="最后修改者"
          width="180">
          <template slot-scope="scope">
            {{scope.row.updater.username}}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button size="small" class="finish-item" type="primary" @click="update(scope.row)">编辑</el-button>
            <el-button class="remove-item" size="small" :plain="true" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageSizeArray"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
        <!--编辑、创建-->
      <el-dialog title="编辑" :visible.sync="editActivityMessage" width="30%">
          <el-form :model="editForm" :rules="rules" label-width="100px" ref="form-preview">
              <el-form-item label="待办事项" prop="content">
                  <el-input v-model="editForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="handleSave('form-preview')">确 定</el-button>
                  <el-button @click="editActivityMessage = false">取 消</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

  </div>
</template>

<script>
import { Ajax } from "@/utils";
import store from "@/store";

export default {
  created() {
    // const userInfo = this.getUserInfo()
    // if (userInfo !== null) {
    //   this.id = userInfo.id
    //   this.name = userInfo.name
    // } else {
    //   this.id = ''
    //   this.name = ''
    // }
    this.getTodolist();
  },
  data() {
    return {
      url: process.env.VUE_APP_API,
      name: "",
      todos: "",
      activeName: "first",
      list: [
        //{id:1, user_id:2, content:'测试文本'}
      ],
      count: 0,
      id: "",
      editActivityMessage: false,
      editForm: {
        content: "",
        id: "",
        userId: ""
      },
      rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      pageSizeArray: [10, 20, 30, 50],
      curPage: 1, //当前页数
      total: 0, //总条目数
      pageSize: 10 //每页显示条目个数
    };
  },
  methods: {
    //创建
    async addTodos() {
      if (this.todos === "") {
        return false;
      }
      let obj = {
        user_id: store.getters.userInfo.id,
        content: this.todos
      };
      let data = await Ajax("post", "/api/list/add", obj);
      if (data.code == 0) {
        this.$message({
          type: "success",
          message: "创建成功！"
        });
        this.getTodolist();
      }
      this.todos = "";
    },
    //删除
    async remove(item) {
      let data = await Ajax("post", "/api/list/remove", {
        id: item.id,
        userId: item.user_id
      });
      if (data.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.getTodolist();
      }
    },
    //获取列表
    async getTodolist() {
      const code = await Ajax("get", "/api/list/page", {
        page: this.curPage,
        pageSize: this.pageSize
      });
      if (code.code == 0) {
        this.list = code.data.list;
        this.total = code.data.count;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTodolist();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getTodolist();
    },
    update(item) {
      this.editActivityMessage = true;
      //this.editForm = JSON.parse(JSON.stringify(item));
      this.editForm.id = item.id;
      this.editForm.content = item.content;
      this.editForm.userId = item.user_id;
      this.editForm.updaterId = store.getters.userInfo.id
    },
    //更新
    async handleSave(formName) {
      let that = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let ajaxData = this.editForm;
          const data = await Ajax(
            "post",
            "/api/list/update",
            ajaxData
          );
          if (data.code == 0) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.editActivityMessage = false;
            this.getTodolist();
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .my-list{
    padding: 30px 100px;
  }
.head-top {
  margin: 20px 0;
}
.el-input {
  .todo-list {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
  }
  .item {
    font-size: 20px;
    &.finished {
      text-decoration: line-through;
      color: #ddd;
    }
  }
  .pull-right {
    float: right;
  }
}
.todo-list {
  margin-bottom: 10px;
}
</style>
<style lang="less" >
.page {
  padding: 20px 0 20px;
  text-align: right;
}
</style>
