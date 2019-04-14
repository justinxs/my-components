<template>
    <label
        class="el-checkbox"
        :class="[
      border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
        role="checkbox"
        :aria-checked="indeterminate ? 'mixed': isChecked"
        :aria-disabled="isDisabled"
        :id="id"
    >
        <span
            class="el-checkbox__input"
            :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
            aria-checked="mixed"
        >
            <span class="el-checkbox__inner"></span>
            <input 
                v-if="trueLabel || falseLabel"
                class="el-checkbox__original"
                type="checkbox"
                aria-hidden="true"
                :name="name"
                :disabled="isDisabled"
                :true-value="trueLabel"
                :false-value="falseLabel"
                v-model="model"
                @change="handleChange"
                @focus="focus = true"
                @blur="focus = false"
            >
            <input
                v-else
                class="el-checkbox__original"
                type="checkbox"
                aria-hidden="true"
                :disabled="isDisabled"
                :value="label"
                :name="name"
                v-model="model"
                ref="target"
                @change="handleChange"
                @focus="focus = true"
                @blur="focus = false"
            >
        </span>
        <span class="el-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>
<script>
export default {
  name: "MyCheckbox",

  // inject: {
  //   elForm: {
  //     default: ''
  //   },
  //   elFormItem: {
  //     default: ''
  //   }
  // },

  componentName: "MyCheckbox",

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    //  绑定input的原生change事件，当点击label标签的区域时触发change事件
    //  执行handleChange,去触发自身组件在父组件绑定的change事件
    //  并且触发父组件name为MyCheckboxGroup组件在其父组件绑定的事件

    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      //    触发自身的在父组件中绑定的自定义change事件，传true or false 和事件对象event

      this.$emit("change", value, ev);

      //    待dom更新完毕，触发父组件MyCheckboxGroup在它的父组件中绑定的自定义change事件，传自身的value过去
      //    而MyCheckboxGroup自身的value就是v-model绑定的值
      //    注意：$nextTick为了等待_checkboxGroup更新完毕才可以取到最新的value

    //   new Promise((resolve, reject) => {
    //     console.log("promise开启");
    //     resolve();
    //   }).then(() => {
    //     console.log("promise执行");
    //     console.log(
    //       "触发自身change，和父组件MyCheckboxGroup的change",
    //       value,
    //       this.isGroup ? this._checkboxGroup.value : "没有MyCheckboxGroup"
    //     );
    //     if (this.isGroup) {
    //       this.dispatch("MyCheckboxGroup", "change", [
    //         this._checkboxGroup.value
    //       ]);
    //     }
    //   });

    //   setTimeout(() => {
    //     console.log("setTimeout执行完毕");
    //   }, 0);

      this.$nextTick(() => {
          console.log('nextTick执行');
        console.log(
          "触发自身change，和父组件MyCheckboxGroup的change",
          value,
          this.isGroup ? this._checkboxGroup.value : "没有MyCheckboxGroup"
        );
        if (this.isGroup) {
          this.dispatch("MyCheckboxGroup", "change", [
            this._checkboxGroup.value
          ]);
        }
      });
    },
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
    }
  },
  computed: {
    model: {
      get() {
        //   console.log('首先触发model getter', this.isGroup? this.store: this.value !== undefined? this.value: this.selfModel);
        return this.isGroup
          ? this.store
          : this.value !== undefined
            ? this.value
            : this.selfModel;
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true);

          //  自身model改变触发name为MyCheckboxGroup的父组件的input事件，将[val]传过去，并重新

        console.log("checkbox model改变触发MyCheckboxGroup的input", [val]);
          this.isLimitExceeded === false &&
            this.dispatch("MyCheckboxGroup", "input", [val]);
        console.log("MyCheckboxGroup的input执行后马上获取其value", this._checkboxGroup.value);

        this.$nextTick(() => {
            console.log('nextTick中获取', this._checkboxGroup.value);
        })
          // this.$parent.$emit.apply(this.$parent, ['input'].concat([val]));
        } else {
          //  如果没有name为MyCheckboxGroup的父组件，触发在父组件绑定的input事件，传val

          this.$emit("input", val);
          this.selfModel = val;
          console.log(
            "没有name为MyCheckboxGroup的父组件，触发在父组件绑定的input事件",
            val
          );
        }
        // this.handleChange()
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MyCheckboxGroup") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled ||
            this.disabled ||
            (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize =
        this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    border: Boolean,
    size: String
  },

  created() {
    //  如果选中状态 则 this.label 添加到this.model
    // console.log(this.label, "value值");
    this.checked && this.addToStore();
  },
  mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute("aria-controls", this.controls);
    }
  },

  watch: {
    value(value) {
      //   console.log("checkbox ", value);
      // this.dispatch('ElFormItem', 'el.form.change', value);
    }
  }
};
</script>
