import { interpolate } from "d3-interpolate";
import * as easings from 'd3-ease'

const animate = () => {
  window.requestAnimationFrame(animate)
  Object.values(tweens).forEach((tween) => tween.update())
}

const getEasingFunction = (easing) => {
  return easings[`ease${easing}`] || easings.easeLinear
}

let i = 0
const tweens = {}
animate()

const Tween = function (from, to, duration = 1000, onUpdate, delay = 0, easing = (t) => t) {
  this.id = (++i).toString();
  this.to = to;
  this.interpolation = interpolate(from, to);
  this.duration = duration;
  this.onUpdate = onUpdate;
  this.start = +new Date + delay;
  this.easing = easing;
}
Tween.prototype.update = function () {
  let t = (+new Date - this.start) / this.duration;
  (t >= 1 && this.destroy(true)) || t >= 0 && this.onUpdate(this.interpolation(this.easing(t)));
}
Tween.prototype.destroy = function (end = false) {
  end && this.onUpdate(this.to);
  return delete tweens[this.id];
}

export default function (from, to, options, onUpdate) {
  if (!options) {
    onUpdate(to)
    return null
  }
  const tween = new Tween(
    from,
    to,
    options.duration,
    onUpdate,
    options.delay,
    (typeof options.easing === 'function') ? options.easing : getEasingFunction(options.easing)
  );
  tweens[tween.id] = tween;
  return tween.destroy
}
