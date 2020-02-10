const chartOverwrites = {
  beforeCreate() {
    if (this.$options.hasTooltip) {
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
    // if (this.$options.isLeaf) {
    //   this.$options.methods.mk = {
    //     type: String,
    //     default: 'ml'
    //   }
    // }
    if (this.$options.canOverwrite) {
      if (!this.$options.props) {
        this.$options.props = {}
      }
      if (!this.$options.computed) {
        this.$options.computed = {}
      }
      if ('hc-animation' in this.$attrs) {
        this.$options.props.hcAnimation = {type: Object, required: true}
        this.$options.computed.animation = () => this.hcAnimation
      } else {
        this.$options.computed.animation = () => this.chart.animation
      }
    }
  }
}

export default chartOverwrites
