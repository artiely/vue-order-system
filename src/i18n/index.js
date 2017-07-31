/**
 * Created by Administrator on 2017/6/15.
 */
 import Vue from 'vue'
 import VueI18n from 'vue-i18n'

 Vue.use(VueI18n)

const messages = {
  'EN': {
    message: {
      home: 'HOME',
      service:'SERVICE',
      order:'ORDER',
      user:'USER',
      des:'Fwone,  founded in 2001, provides IT infrastructure and helpdesk outsourcing service for 400+ multinational companies with full time technicians in 60+ cities of Asia.',
      title:'Let Fwone’s IT service be available to its customers at any given time or place through using responsibility, technique, process and standards, thus guarantee the stability and sustained growth of customers’ business.'
    }
  },
  'CN': {
    message: {
      home: '主页',
      service:'预约',
      order:'订单',
      user:'我的',
      des:'群思科技，成立于2001年，为400多个跨国公司在亚洲的60多个城市提供专业技术工程师、IT基础设施和Helpdesk外包服务。',
      title:'致力于成为世界级领先的专业IT服务企业  用责任心、技术、流程和规范，使用户任何时间、任何地点都能及时得到群思专业服务 向顾客提供富有传奇色彩的顾客服务、永不止境地投入到提升顾客满意的努力中去'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'CN', // set locale
  messages, // set locale messages
})

export default i18n