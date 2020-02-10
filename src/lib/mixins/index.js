export default {
  beforeCreate() {
    if (this.$options.hasTooltip) {
      if (!this.$options.methods) {
        this.$options.methods = {}
      }
      this.$options.methods.tooltipOn = (event) => {
        this.chart.tooltip = {
          x: event.clientX,
          y: event.clientY,
          content: `${this.animated.label}: <b>${this.animated.value}</b>`
        }
      },
      this.$options.methods.tooltipOff = () => {
        this.chart.tooltip = null
      }
    }
    if (this.$options.isLeaf) {
      if (!this.$options.props) {
        this.$options.props = {}
      }
      this.$options.props.animation = {
        type: Object,
        default() {
          return this.$parent['animation']
        }
      }
      this.$options.props.index = {
        type: Number,
        default: 0
      }
    }
    if (this.$options.canOverwrite) {
      if (!this.$options.props) {
        this.$options.props = {}
      }
      if (!this.$options.computed) {
        this.$options.computed = {}
      }
      if ('hc-data' in this.$attrs) {
        this.$options.props.hcData = { type: Array, default: () => this.$attrs['hc-data'] }
        this.$options.computed.data = () => this.hcData
      } else {
        this.$options.computed.data = () => this.chart.data
      }
      if ('hc-animation' in this.$attrs) {
        this.$options.props.hcAnimation = { type: Object, default: () => this.$attrs['hc-animation'] }
        this.$options.computed.animation = () => this.hcAnimation
      } else {
        this.$options.computed.animation = () => this.chart.animation
      }
      if ('hc-scales' in this.$attrs) {
        this.$options.props.hcScales = { type: Array, default: () => this.$attrs['hc-scales'] }
        this.$options.computed.scales = () => this.hcScales
      } else {
        this.$options.computed.scales = () => this.chart.scales
      }
      if ('hc-offset' in this.$attrs) {
        this.$options.props.hcOffset = { type: Object, default: () => this.$attrs['hc-offset'] }
        this.$options.computed.offset = () => this.hcOffset
      } else {
        this.$options.computed.offset = () => this.chart.offset
      }
      if ('hc-colors' in this.$attrs) {
        this.$options.props.hcColors = { type: Array, default: () => this.$attrs['hc-colors'] }
        this.$options.computed.colors = () => this.hcColors
      } else {
        this.$options.computed.colors = () => this.chart.colors
      }
      if ('hc-width' in this.$attrs) {
        this.$options.props.hcWidth = { type: Number, default: this.$attrs['hc-width']}
        this.$options.computed.width = () => this.hcWidth
      } else {
        this.$options.computed.width = () => this.chart.width
      }
      if ('hc-height' in this.$attrs) {
        this.$options.props.hcHeight = { type: Number, default: this.$attrs['hc-height']}
        this.$options.computed.height = () => this.hcHeight
      } else {
        this.$options.computed.height = () => this.chart.height
      }
    }
  }
};
