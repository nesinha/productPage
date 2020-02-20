import { shallowMount } from '@vue/test-utils'
import ProductDetail from '@/components/ProductDetail.vue'

describe('ProductDetail.vue', () => {
  it('renders props.currentProduct when passed', () => {
    const currentProduct = new Object()
    currentProduct.name = "test-product-name"

    currentProduct.hero = new Object()
    currentProduct.hero.href = "http://test-url"

    const wrapper = shallowMount(ProductDetail, {
      propsData: { currentProduct }
    })

    const productTitleElement = wrapper.find('.card-header')
    expect(productTitleElement.text()).toMatch(currentProduct.name)

    const imageElement = wrapper.find('.card-body').find('img')
    expect(imageElement.attributes("src")).toMatch(currentProduct.hero.href)
  }),

  it('test computed function getHeroImageSource when image source exists', () =>{
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{hero: {href: "http://test-url"}}})
    expect(wrapper.vm.getHeroImageSource).toBe("http://test-url")
  }),

  it('test computed function getHeroImageSource when image source does not exist', () =>{
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{}})
    expect(wrapper.vm.getHeroImageSource).toBe("#")
  }),

  it('test computed function getProductName when name exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{name: "test-product"}})
    expect(wrapper.vm.getProductName).toBe("test-product")
  }),

  it('test computed function getProductName when name does not exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{}})
    expect(wrapper.vm.getProductName).toBe("Default-name")
  }),

  it('test computed function getPrice when selling high price exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{priceRange: {selling: {high: 200}}}})
    expect(wrapper.vm.getPrice).toBe(200)
  }),

  it('test computed function getPrice when selling high price does not exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{priceRange: {regular: {high: 200}}}})
    expect(wrapper.vm.getPrice).toBe("")
  }),

  it('test computed function getProductId when product id exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{id:1}})
    expect(wrapper.vm.getProductId).toBe(1)
  }),

  it('test computed function getProductId when product id does not exist', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{}})
    expect(wrapper.vm.getProductId).toBe("")
  }),

  it('test computed function getCarouselImages when caraosel images exists', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{images:[{href:'http://test-carousel-href'}]}})
    expect(wrapper.vm.getCarouselImages).toStrictEqual([{href:'http://test-carousel-href'}])
  }),

  it('test computed function getCarouselImages when carousel images does not exist', () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setProps({currentProduct:{}})
    expect(wrapper.vm.getCarouselImages).toStrictEqual(new Array())
  }),

  it('test overlay shows on clicking the image', async () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setData({isHidden:true})
    wrapper.setProps({currentProduct:{id:1}})
    expect(wrapper.find('#content').exists()).toBe(false)
    wrapper.find(".card-body").trigger('click')
    await wrapper.vm.$nextTick() // Wait until trigger events have been handled
    expect(wrapper.find('#content').exists()).toBe(true)
  }),

  it('test overlay gets hidden on closing the button', async () => {
    const wrapper = shallowMount(ProductDetail)
    wrapper.setData({isHidden:true})
    wrapper.setProps({currentProduct:{id:1}})
    expect(wrapper.find('#content').exists()).toBe(false)
    wrapper.find(".card-body").trigger('click')
    await wrapper.vm.$nextTick() // Wait until trigger events have been handled
    expect(wrapper.find('#content').exists()).toBe(true)
    wrapper.find(".btn").trigger('click')
    await wrapper.vm.$nextTick() // Wait until trigger events have been handled
    expect(wrapper.find('#content').exists()).toBe(false)
  })
})
