export default {
  name: 'MyRow',

  componentName: 'MyRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },
  methods: {
    getOptions() {
      const classOptions = [
        'el-row', 
        this.justify !== 'start' ? `is-justify-${this.justify}` : '', 
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ];

      const styleOptions = this.style;

      return {class: classOptions, style: styleOptions}
    },
    getStyle() {
      return this.style
    }
  },
  render(createElement) {
    return createElement(this.tag, this.getOptions(), this.$slots.default);
  }
};
