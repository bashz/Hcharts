import definition from '../definitions/linear'

import { scaleLinear } from "d3-scale";

const computeLinear = (config, data, width = 800, height = 600) => {
  const scale = Object.assign({}, definition, config)
  let scaleFunction = scaleLinear()
  if (scale.domain.length) {
    scaleFunction = scaleFunction.domain(scale.domain)
  } else {
    const values = data.map((d, index) => d[scale.discriminator] || index)
    scaleFunction = scaleFunction.domain([
      scale.floor === 0 ? 0 : scale.floor || Math.min(...values) - scale.marginMin,
      scale.ceil === 0 ? 0 : scale.ceil || Math.max(...values) + scale.marginMax
    ])
  }
  if (scale.range.length) {
    scaleFunction = scaleFunction[scale.rangeType](scale.range)
  } else {
    scaleFunction = scaleFunction[scale.rangeType](
      scale.orientation === "horizontal"
        ? [0, width]
        : [height, 0]
    )
  }
  if (scale.nice) {
    scaleFunction = scaleFunction.nice(scale.nice)
  }
  scaleFunction.definition = Object.assign({}, scale)
  return scaleFunction
}

export default computeLinear
