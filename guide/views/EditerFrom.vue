<template>
    <el-container>
        <el-main>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item v-for="(item,index) in list" :key="index" :label="item.itemAttrs.label" @click.native="formItemHandler(item,index)">
                    <component :is="item.tag" v-model="form[item.attrs.key]" v-bind="item.attrs" v-on="item.listeners || {}">{{item.attrs.label}}</component>
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer>
            <el-button @click="addItem('input')" type="primary">Input 输入框</el-button>
            <el-button @click="addItem('tag')" type="info">Tag 标签</el-button>
            <el-button @click="addItem('slider')" type="success">Slider 滑块</el-button>
            <el-button @click="addItem('rate')" type="info">Rate 评分</el-button>
            <el-button @click="addItem('avatar')" type="primary">Avatar 头像</el-button>
            <el-button @click="addItem('badge')" type="info">Badge 标记</el-button>
            <el-button @click="addItem('image')" type="success">Image 图片</el-button>
            <el-button @click="addItem('divider')" type="info">Divider 分割线</el-button>
        </el-footer>

        <el-dialog title="编辑属性" :visible.sync="dialog.visible" width="500px" :before-close="dialogBeforeClose">
            <div></div>
            <div slot="footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitHandler">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>
<script>
import { template } from "./../utils/template";
console.log(template);
export default {
    name: "EditerFrom",
    data() {
        return {
            list: [],
            form: {},
            dialog: {
                visible: false,
                index: 0,
                data: null,
            },
        };
    },
    methods: {
        addItem(tag) {
            let item = Object.assign({}, template[tag]);
            this.$set(this.form, item.attrs.key, item.attrs.value || item.attrs.src);
            this.list.push(item);
        },
        formItemHandler(item, index) {
            this.dialog.index = index;
            this.dialog.data = item;
            // this.dialog.visible = true;
            console.log(this.dialog);
        },
        dialogBeforeClose() {
            //
        },
        submitHandler() {
            // 确认编辑
            this.dialog.visible = false;
        },
    },
};
</script>