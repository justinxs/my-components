<script>

export default {
  name: "MyCheckboxGroup",

  componentName: "MyCheckboxGroup",

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  methods: {
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
    
  },
  watch: {
    value(value) {
        // console.log('group value 改变', value);
    //   this.dispatch("ElFormItem", "el.form.change", [value]);
    }
  }
};
</script>

<template>
    <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>
