<template>
    <jr-form :model="ruleForm" :rules="rules" ref="ruleForm" labjr-width="100px" class="demo-ruleForm">
        <jr-form-item label="活动名称" prop="name">
            <jr-input v-model="ruleForm.name"></jr-input>
        </jr-form-item>
        <jr-form-item label="活动区域" prop="region">
            <jr-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <jr-option label="区域一" value="shanghai"></jr-option>
                <jr-option label="区域二" value="beijing"></jr-option>
            </jr-select>
        </jr-form-item>
        <jr-form-item label="活动时间" required>
            <jr-col :span="11">
                <jr-form-item prop="date1">
                    <jr-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></jr-date-picker>
                </jr-form-item>
            </jr-col>
            <jr-col class="line" :span="2">-</jr-col>
            <jr-col :span="11">
                <jr-form-item prop="date2">
                    <jr-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></jr-time-picker>
                </jr-form-item>
            </jr-col>
        </jr-form-item>
        <jr-form-item label="即时配送" prop="delivery">
            <jr-switch v-model="ruleForm.delivery"></jr-switch>
        </jr-form-item>
        <jr-form-item label="活动性质" prop="type">
            <jr-checkbox-group v-model="ruleForm.type">
                <jr-checkbox label="美食/餐厅线上活动" name="type"></jr-checkbox>
                <jr-checkbox label="地推活动" name="type"></jr-checkbox>
                <jr-checkbox label="线下主题活动" name="type"></jr-checkbox>
                <jr-checkbox label="单纯品牌曝光" name="type"></jr-checkbox>
            </jr-checkbox-group>
        </jr-form-item>
        <jr-form-item label="特殊资源" prop="resource">
            <jr-radio-group v-model="ruleForm.resource">
                <jr-radio label="线上品牌商赞助"></jr-radio>
                <jr-radio label="线下场地免费"></jr-radio>
            </jr-radio-group>
        </jr-form-item>
        <jr-form-item label="活动形式" prop="desc">
            <jr-input type="textarea" v-model="ruleForm.desc"></jr-input>
        </jr-form-item>
        <jr-form-item>
            <jr-button type="primary" @click="submitForm('ruleForm')">立即创建</jr-button>
            <jr-button @click="resetForm('ruleForm')">重置</jr-button>
        </jr-form-item>
    </jr-form>
</template>
<script>
export default {
    name: "VueForm",
    data() {
        return {
            ruleForm: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            rules: {
                name: [
                    { required: true, message: "请输入活动名称", trigger: "blur" },
                    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
                ],
                region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
                date1: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
                date2: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
                type: [{ type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }],
                resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
                desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                    return;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>