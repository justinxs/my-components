import Col from './col'

Col.install = (Vue) => {
    // Vue.component(Col.name, Col);
    Vue.component(Col.name, Vue.extend(Col));
}

export default Col;