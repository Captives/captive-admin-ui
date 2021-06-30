<template>
    <div class="el-resize">
        <slot></slot>
    </div>
</template>
<script>
let resizeObserver;

export default {
    name: "VueResize",
    props: {
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        fixed(value) {
            value ? this.observe() : this.unobserve();
        },
    },
    methods: {
        onresize() {
            let doc = this.$el.getBoundingClientRect();
            let level = "xl";

            if (doc.width >= 1920) {
                level = "xl";
            } else if (doc.width >= 1200 && doc.width < 1920) {
                level = "lg";
            } else if (doc.width >= 992 && doc.width < 1200) {
                level = "md";
            } else if (doc.width >= 768 && doc.width < 992) {
                level = "sm";
            } else {
                level = "xs";
            }

            this.$emit("change", level, doc);
        },

        observe() {
            resizeObserver.observe(this.$el);
        },
        unobserve() {
            resizeObserver.disconnect();
        },
    },
    mounted() {
        resizeObserver = new ResizeObserver((entries) => {
            this.onresize();
        });

        this.fixed ? this.observe() : this.unobserve();
    },
};
</script>