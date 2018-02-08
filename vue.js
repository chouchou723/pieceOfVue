

Vue.component('todo-item', {//全局注册
  props: {
  	todo:''
  },
  template: '<li>{{ todo }}</li>'
})
var Child = {
  template: '<div @click="inner">\
  <slot name="main-text">只有在没有要分发的内容时才会显示\
  </slot>\
  </div>',
  methods:{
  	inner(){
  		this.$emit('event-a')
  	}
  }
}
// Vue.component('anchored-heading', {//字符串模版写法
//   template: '#anchored-heading-template',
//   props: {
//     level: {
//       type: Number,
//       required: true
//     }
//   }
// })
// Vue.component('anchored-heading', {
//   render: function (createElement) {
//     return createElement(
//       'h' + this.level,   // tag name 标签名称
//       this.$slots.default // 子组件中的阵列
//     )
//   },
//   props: {
//     level: {
//       type: Number,
//       required: true
//     }
//   }
// })

var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
Vue.component('anchored-heading', {
  render: function (createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    lifor:[1,2,3]
  }
})
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其他什么人吃的东西' }
    ],

  },
   components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child,
  },
  methods:{
     eee(){
     	console.log('这是emit')
     }
  }
})
