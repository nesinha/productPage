import {shallowMount } from '@vue/test-utils'
import Products from '@/components/Products.vue'
import ProductDetail from '@/components/ProductDetail.vue'

jest.mock('axios')

describe('Products.vue', () => {
  it('renders props.msg when passed', () => {
    const title = 'test message passed'
    const wrapper = shallowMount(Products, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  }),

  //check this
  it('should make the axios request and update the products variable', done => {
    const wrapper = shallowMount(Products)
    wrapper.vm.$nextTick(() =>{
      expect(wrapper.vm.products).toStrictEqual(new Array())
      done()
    })
  })

  it('find child component with props.currentProduct', () => {
    const wrapper = shallowMount(Products)
    expect(wrapper.find(ProductDetail).selector.props).toHaveProperty('currentProduct')

  })
})
