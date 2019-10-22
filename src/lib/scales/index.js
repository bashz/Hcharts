// import {
//   scaleBand,
//   scaleDiverging,
//   scaleDivergingLog,
//   scaleDivergingPow,
//   scaleDivergingSqrt,
//   scaleDivergingSymlog,
//   scaleIdentity,
//   scaleImplicit,
//   scaleLinear,
//   scaleLog,
//   scaleOrdinal,
//   scalePoint,
//   scalePow,
//   scaleQuantile,
//   scaleQuantize,
//   scaleSequential,
//   scaleSequentialLog,
//   scaleSequentialPow,
//   scaleSequentialQuantile,
//   scaleSequentialSqrt,
//   scaleSequentialSymlog,
//   scaleSqrt,
//   scaleSymlog,
//   scaleThreshold,
//   scaleTime,
//   scaleUtc
// } from "d3-scale";

import {
  computeBand,
  computeLinear
} from "./computations"

const map = new Map()
map.set('band', computeBand)
map.set('linear', computeLinear)

const computeScales = (scales, data, width, height) => {
  let scaleFunctions = {}
  for (let scaleName in scales) {
    scaleFunctions[scaleName] = map.get(scales[scaleName].type)(scales[scaleName], data, width, height)
  }
  return scaleFunctions
}
export default computeScales
