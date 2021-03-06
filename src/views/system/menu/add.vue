<template>
  <el-dialog
      title="新增菜单"
      width="650px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="90px">
      <el-form-item label="菜单图标">
        <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()">
          <icon-select ref="iconSelect" @selected="selected"/>
          <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
            <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon"/>
            <i v-else slot="prefix" class="el-icon-search el-input__icon"></i>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="外链菜单">
            <el-radio-group v-model="form.iframe">
              <el-radio-button label="true">是</el-radio-button>
              <el-radio-button label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="菜单可见">
            <el-radio-group v-model="form.hidden">
              <el-radio-button label="false">是</el-radio-button>
              <el-radio-button label="true">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="菜单缓存">
            <el-radio-group v-model="form.cache">
              <el-radio-button label="true">是</el-radio-button>
              <el-radio-button label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <row-col>
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item slot="r" label="权限标识">
          <el-input v-model.trim="form.permission"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="路由名称">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item slot="r" label="菜单排序" prop="sort">
          <el-input-number
              v-model="form.sort"
              controls-position="right"
              :precision="0"
              :min="1">
          </el-input-number>
        </el-form-item>
      </row-col>
      <el-form-item label="上级类目">
        <tree-select
            v-model="form.pid"
            :tree="menu"
            :normalizer="normalizer"
            placeholder="默认顶级菜单"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import IconSelect from '@/components/IconSelect';
  import {addMenuApi} from '@/api/system/menu';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    components: {IconSelect},
    props: {
      menu: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        normalizer(node) {
          return {
            label: node.title
          }
        },
        visible: false,
        form: {
          title: '',
          permission: '',
          name: '',
          icon: '',
          iframe: false,
          hidden: false,
          cache: false,
          sort: 999,
          pid: null
        },
        rules: {
          title: {required: true, message: '请输入标题', trigger: 'blur'},
          sort: {required: true, message: '请输入排序', trigger: 'change'}
        }
      }
    },
    methods: {
      selected(name) {
        this.form.icon = name
      },
      submit() {
        this.$refs['Form'].validate(valid => {
          if (!valid) return false;
          let data = {...this.form};
          if (!data.pid) data.pid = 0;
          this.$refs.Submit.start();
          addMenuApi(data).then(() => {
            this.$refs.Submit.stop();
            this.$emit('update');
            this.cancel()
          }).catch(() => {
            this.$refs.Submit.stop();
          })
        });
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>
