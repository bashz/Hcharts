import definition from '../definitions/band'

import { scaleBand } from "d3-scale";

const computeBand = (config, data, width = 800, height = 600) => {
  const scale = Object.assign(definition, config)
  let scaleFunction = scaleBand()
  if (scale.domain.length) {
    scaleFunction = scaleFunction.domain(scale.domain)
  } else {
    scaleFunction = scaleFunction.domain(data.map((d, index) => d[scale.discriminator] || index))
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
  if (scale.padding) {
    scaleFunction = scaleFunction.padding(scale.padding)
  } else {
    scaleFunction = scaleFunction.paddingInner(scale.paddingInner)
    scaleFunction = scaleFunction.paddingOuter(scale.paddingOuter)
  }
  if (scale.align !== .5) {
    scaleFunction = scaleFunction.align(scale.align)
  }
  scaleFunction.definition = scale
  return scaleFunction
}

export default computeBand
