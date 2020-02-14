import { mount } from '@vue/test-utils';
import HcChart from '../src/HcChart';
import { expect } from 'chai';

const mock = {
  data: [
    { value: -89, name: "alpha" },
    { value: 45, name: "beta", id: "B" },
    { value: 29, name: "delta", color: "#cccccc" }
  ]
}

describe('HcChart - container and orchestrar of a chart', () => {
  let wrapper;
  const chart =() => wrapper.vm.$data.chart
  before(() => {
    wrapper = mount(HcChart, {
      propsData: mock
    });
  })
  it('Sets unique id to chart and svg', () => {
    expect(wrapper.attributes().id).to.include('chart')
  })
  it('Sets default animation', () => {
    expect(chart().animation).to.deep.equal({
      easing: 'Linear',
      duration: 1000,
      delay: 0
    })
  })
  describe('It passes data through a pipeline', () => {
    it('Sets id and colors to chart\'s data and reactivly update em', () => {
      expect(chart().data).to.have.length(3)
      chart().data.every(d => expect(d).to.have.all.keys('id', 'color', 'name', 'value'))
      // if there is an id or a color already it remain unchanged
      expect(chart().data[1]).to.include({ id: "B" });
      expect(chart().data[2]).to.include({ color: "#cccccc" });
    })

    it('Reactivly updates chart\'s data', async () => {
      wrapper.setProps({ data: [{ value: 129, name: "charlie", color: "#cccccc" }] })
      await wrapper.vm.$nextTick()
      expect(chart().data).to.have.length(1)
      chart().data.every(d => expect(d).to.have.all.keys('id', 'color', 'name', 'value'))
    })

    it('Overwrite colors in chart\'s data, on colors\' change', async () => {
      wrapper.setProps({
        colors: ["#222222"]
      })
      await wrapper.vm.$nextTick()
      expect(chart().data).to.include.any.deep.members([{ value: 129, name: "charlie", color: "#222222", id: "0" }]);
    })
  })
})
