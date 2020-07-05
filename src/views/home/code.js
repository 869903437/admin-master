export default {
  /**
   * @description 表单
   * */
  timePicker:
    `<el-form-item label="日期" prop="timePicker">
        <el-time-picker
            v-model="form.timePicker"
            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="选择时间">
        </el-time-picker>
      </el-form-item>`,
  datePicker:
    `<el-form-item label="日期" prop="date">
        <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>`,
  switch:
    `<el-form-item label="状态" prop="enabled">
        <el-switch
            v-model="form.enabled"
            active-text="启用"
            inactive-text="停用">
        </el-switch>
      </el-form-item>`,
  select:
    `<el-form-item label="角色" prop="rolesId">
        <el-select v-model="form.rolesId" multiple clearable>
          <el-option
              v-for="item in roleList"
              :label="item.name"
              :value="item.id"
              :key="item.id"/>
        </el-select>
      </el-form-item>`,
  radio:
    `<el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>`,
  checkbox:
    `<el-form-item label="类型" prop="checkList">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="类型 A"></el-checkbox>
          <el-checkbox label="类型 B" disabled></el-checkbox>
        </el-checkbox-group>
      </el-form-item>`,
  number:
    `<el-form-item label="排序" prop="sort">
        <el-input-number
            v-model="form.sort"
            controls-position="right"
            :precision="0"
            :min="1">
        </el-input-number>
      </el-form-item>`,
  input:
    `<el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>`,

  /**
   * @description 弹出框
   * */
  dialogSubmit:
    `submit() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.Submit.start();
            addApi(data).then(() => {
              this.$refs.Submit.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.Submit.stop();
            })
          } else {
            return false;
          }
        });
      }`,
  dialogRules:
    `rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'}
        }`,
  dialogHtml:
    `<el-dialog
      title="新增"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
            v-model="form.sort"
            controls-position="right"
            :precision="0"
            :min="1">
        </el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>`,
  dialog:
    `<template>
  <el-dialog
      title="新增"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
            v-model="form.sort"
            controls-position="right"
            :precision="0"
            :min="1">
        </el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addApi} from '@/api/';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    data() {
      return {
        visible: false,
        form: {
          name: '',
          sort: 999,
          enabled: true
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          sort: {required: true, message: '请输入排序', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.Submit.start();
            addApi(data).then(() => {
              this.$refs.Submit.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.Submit.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>`,

  /**
   * @description 表格
   * */
  tableHeader:
    `<div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getList"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getList">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>`,
  tableDate:
    `<el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>`,
  tableGet:
    `getList() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName
        };
        getListApi(param).then(result => {
          let response = result.resultParam.list;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      }`,
  table:
    `<template>
  <card ref="Card">
    <div slot="header">
      <el-input v-model="searchName" placeholder="输入名称搜索" clearable class="w-200" @keyup.enter.native="getList"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getList">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="name" label="名称"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteData"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @update="getList"/>
    <add ref="Add" @update="getList"></add>
    <edit ref="Edit" @update="getList"></edit>
  </card>
</template>

<script>
  import {getListApi, deleteDataApi} from '@/api/';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "",
    components: {Edit, Add},
    data() {
      return {
        formData: [],
        searchName: ''
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName
        };
        this.$refs.Card.start();
        getListApi(param).then(result => {
          let response = result.resultParam.list;
          this.formData = response.records;
          pagination.total = response.total;
          this.$refs.Card.stop();
        })
      },
      add() {
        this.$refs.Add.visible = true
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteData(id) {
        deleteDataApi({id: id})
          .then(() => {
            this.getList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>`,

  /**
   * @description 操作
   * */
  operateHtml:
    `<el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteData"/>
        </template>
      </el-table-column>`,
  operateEditJs:
    `edit(obj) {
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      }`,
  operateDelJs:
    `deleteData(id) {
        deleteDataApi({id: id})
          .then(() => {
            this.get();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }`
}