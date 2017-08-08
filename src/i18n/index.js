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
      title:'Let Fwone’s IT service be available to its customers at any given time or place through using responsibility, technique, process and standards, thus guarantee the stability and sustained growth of customers’ business.',
      "Unprocessed":"Unprocessed",
      "Processing":"Processing",
      "To_rate":"To rate",
      "Awaiting_payment":"Awaiting payment",
      "Completed":"Completed",
      "Delayed":"Delayed",
      "Cancelled":"Cancelled",
      "All_orders":"All orders",
      "Service_definition":"Service definition",
      "MA_des":"Residency IT service, engineer to station in client office on a fixed schedule with or without any occurrence",
      "Oncall_des":"Service on demand to rectify and resolve customer's issue upon request , Engineer leave upon completion of request",
      "Appointment_time":"Appointment Time",
      "Go":'Go',
      "Service_introduction":"Service introduction",
      "Timely_assistance":"Timely Assistance",
      "Residency_service":"Residency Service",
      "Account_name":"Account Name",
      "Account_password":"Account password",
      "Login":'Login',
      "Back":'Go back'
    }
  },
  'CN': {
    message: {
      home: '主页',
      service:'预约',
      order:'订单',
      user:'我的',
      des:'群思科技，成立于2001年，为400多个跨国公司在亚洲的60多个城市提供专业技术工程师、IT基础设施和Helpdesk外包服务。',
      title:'致力于成为世界级领先的专业IT服务企业  用责任心、技术、流程和规范，使用户任何时间、任何地点都能及时得到群思专业服务 向顾客提供富有传奇色彩的顾客服务、永不止境地投入到提升顾客满意的努力中去',
      "Unprocessed":"待处理",
      "Processing":"处理中",
      "To_rate":"待评价",
      "Awaiting_payment":"待付款",
      "Completed":"已完成",
      "Delayed":"已过期",
      "Cancelled":"已取消",
      "All_orders":"全部工单",
      "Service_definition":"服务定义",
      "MA_des":"根据客户定义上下班时间，无论是否有问题发生均在现场待命。",
      "Oncall_des":"根据客户期望的时间段，为客户解决某问题，解决完毕后离开",
      "Appointment_time":"服务时间",
      "Go":'前往',
      "Service_introduction":"服务介绍",
      "Timely_assistance":"及时雨",
      "Residency_service":"候鸟",
      "Account_name":"账号名",
      "Account_password":"密码",
      "Login":'登录',
      "Back":'返回'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'CN', // set locale
  messages, // set locale messages
})

export default i18n
