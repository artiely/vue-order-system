import Vue from 'vue'

//注册一个全局自定义指令去时分秒 2017-10-12 12:33:02 -> 2017-10-12
const cutTime=Vue.directive('cutTime', {
  // 当绑定元素插入到DOM中
  inserted: function (el, binding) {
    var str = binding.value.split(" ")[0];
    el.innerHTML = str
  }
});
export {cutTime}