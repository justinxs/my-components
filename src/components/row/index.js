import Row from './row'

Row.install = (Vue) => {
    // Vue.component(Row.name, Row);
    Vue.component(Row.name, Vue.extend(Row));
}

export default Row;