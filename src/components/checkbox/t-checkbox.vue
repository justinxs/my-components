<template>
    <label class="el-checkbox" :class="{'is-checked': isChecked, 'is-disabled': isDisabled}">
        <span class="el-checkbox__input" :class="{'is-checked': isChecked, 'is-disabled': isDisabled}">
            <span class="el-checkbox__inner"></span>
            <input :name="name" :disabled="isDisabled" type="checkbox" hidden="true" v-model="model" :value="label" @change="handleChange">
        </span>
        <span class="el-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
export default {
    name: 'checkbox',
    componentName: 'checkbox',
    data() {
        return {
            defaultVal: false,
            isLimit: false,

        }
    },
    props: {
        value: {},
        label: {},
        checked: Boolean,
        name: String,
        disabled: [Boolean],

    },
    computed: {
        hasParents() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'checkboxGroup') {
                    parent = parent.$parent;
                } else {
                    this.checkboxGroup = parent;
                    return true;
                }
            }
            return false;
        },
        model: {
            get() {
                return this.hasParents ? this.mainData : this.value !== undefined ? this.value : this.defaultVal;
            },
            set(val) {
                if (this.hasParents) {
                    this.isLimit = false;
                    let min = this.checkboxGroup.min;
                    let max = this.checkboxGroup.max;
                    if (min !== undefined && val.length < min) {
                        this.isLimit = true;
                    }
                    if (max !== undefined && val.length > max) {
                        this.isLimit = true;
                    }
                    
                    (!this.isLimit) && this.emitApply('checkboxGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                    this.defaultVal = val;
                }
            } 
        },
        mainData() {
            // console.log(this.checkboxGroup.value, 'mainData');
            return this.checkboxGroup ? this.checkboxGroup.value : this.value;
        },
        isChecked() {
            if (Object.prototype.toString.call(this.model) === '[object Boolean]') {
                return this.model;
            } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.label) > -1;
            } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.trueLabel;
            }
        },
        isDisabled() {
            return this.hasParents ? this.hasParents.disabled|| this.disabled : this.disabled;
        }
    },
    methods: {
        initChecked() {
            if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
                this.model.push(this.label);
            } else {
                this.model = this.trueLabel || true;
            }
        },

        handleChange(e) {
            // 数量限制后提交is-limit事件
            if (this.isLimit) {
                this.hasParents && this.emitApply('checkboxGroup', 'is-limit');
                this.$nextTick(() => {
                    e.target.checked = !e.target.checked;
                })
                return
            }
            let value = e.target.checked ? true : false;
            
            this.$emit('change', value, e);

            this.$nextTick(() => {
                this.hasParents && this.emitApply('checkboxGroup', 'change', [this.checkboxGroup.value]);
            })
        },

        emitApply(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;
            while (parent && (!name || name != componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.componentName;
                } 
            }
            if (parent) {
                params ? parent.$emit.apply(parent, [eventName].concat(params)) : parent.$emit.call(parent, eventName)
            }
        }
    },
    created() {
        this.checked && this.initChecked();
    },
}
</script>

<style lang="scss" scoped>

</style>