//  渲染函数render 和 JSX

//  Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力
//  这时你可以用 render 函数，它比 template 更接近编译器

/* 
 * 涉及到的Vue知识准备
 *
 * Vue.extend( options )
 * Vue.component( id, [definition] )
 * Vue.use( plugin )
 * 
 * 
 */

 /*
  *  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象 Vue.extend( options )
  *  {Object} options 组件选项{[template | el | render], props, data, created, computed, methods ...}
  *  
  *  
  */

/*
 * 注册或获取全局组件。注册还会自动使用给定的id设置组件的名称 Vue.component( id, [definition] )
 * {string} id
 * {Function | Object} [definition]
 * 
 * 注册组件，传入一个扩展过的构造器
 *  Vue.component('my-component', Vue.extend({ ... }))
 * 
 * 注册组件，传入一个选项对象 (自动调用 Vue.extend)
 *  Vue.component('my-component', { ... })
 * 
 * 获取注册的组件 (始终返回构造器)
 *  var MyComponent = Vue.component('my-component')
 * 
 * 
 */

