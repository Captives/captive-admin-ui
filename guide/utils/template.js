const template = {
    input: {
        tag: "el-input",
        itemAttrs: {
            label: "姓名",
            required: true,
            rules: { required: true, message: "姓名不能为空", trigger: "click,hover" },
        },
        attrs: {
            key: "name",
            value: "captives",
            placeholder: "请输入姓名",
            clearable: true,
        },
        listeners: {
            input: (value) => {
                console.log('input change', value);
            }
        }
    },
    tag: {
        tag: "el-tag",
        itemAttrs: {
            label: "标签",
        },
        attrs: {
            key: "label",
            label: "captives",
        },
    },
    slider: {
        tag: "el-slider",
        itemAttrs: {
            label: "年龄",
        },
        attrs: {
            key: "age",
            label: "标记",
            value: 30,
            max: 50,
            min: 20
        },
    },
    rate: {
        tag: "el-rate",
        itemAttrs: {
            label: "星级",
            required: true,
        },
        attrs: {
            key: "rate",
            value: 6,
            max: 10,
        },
    },
    avatar: {
        tag: "el-avatar",
        itemAttrs: {
            label: "头像",
        },
        attrs: {
            key: "avatar",
            src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            size: "large",
            shape: "circle"
        },
    },
    badge: {
        tag: "el-badge",
        itemAttrs: {
            label: "标记",
        },
        attrs: {
            type: "warning",
            label: "标记",
            value: 10
        },
    },
    image: {
        tag: "el-image",
        itemAttrs: {
            label: "照片墙",
        },
        attrs: {
            key: "image",
            src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            size: "large",
            shape: "circle"
        },
    },
    divider: {
        tag: "el-divider",
        itemAttrs: {
            label: "分割线",
        },
        attrs: {
            key: "divider",
            label: "我是中国人",
            contentPosition: "right",
        },
    },
};

export {
    template
}