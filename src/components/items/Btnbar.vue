<template >
  <div class="button-bar von-button-bar" >
    <a v-for="(tabItem, index) in tabItems" class="button button-small" :class="initButtonClass(index)" @click="tabClicked(index)" v-text="tabItem" ></a >
  </div >
</template >
<script >
  export default{
    props: {
      tabItems: {
        type: Array,
        required: true
      },
      tabIndex: {
        type: Number,
        required: true,
        default: 0,
        validator(value) {
          return value >= 0
        }
      },
      theme: {
        type: String,
        default: 'positive'
      },
      onTabClick: Function
    },

    computed: {
      activeIndex: function () {
        return this.tabIndex
      }
    },

    methods: {
      initButtonClass(index) {
        let buttonClass = {}
        buttonClass['button button-small button-' + this.theme + ' button-outline'] = index !== this.activeIndex
        buttonClass['button button-small button-' + this.theme] = index == this.activeIndex
        return buttonClass
      },

      tabClicked(index) {
        if (this.onTabClick) this.onTabClick(index)
      }
    }
  }
</script >
<style scoped >

  .von-button-bar {
    margin: 10px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;

  }
.button.button-assertive.button-outline{
  border-color: #ea5a49;
  background: transparent;
  color: #ea5a49;
  border-style: solid;
}
  .button{
    font-size: 12px;
    line-height: 28px;min-height: 30px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: block;
    overflow: hidden;
    padding: 0 16px;
    width: 0;
    border-width: 1px 0px 1px 1px;
    border-radius: 0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-color: #ea5a49;
    background: transparent;
    color: #ea5a49;

  }

  .button.button-assertive {
    border-color: transparent;
    background-color: #ea5a49;
    color: #fff;
  }
  .button.button-assertive.button-outline {
    border-color: #ea5a49;
    background: transparent;
    color: #ea5a49;
  }

  .button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style >