<template>
<div class="progress-detail" id="progress-detail">
  <div class="topinfo">
    <div class="proname">日本旅游签证</div>
    <div class="name">申请人：张三</div>
  </div>
  <div class="list">
    <ul>
      <li>
        <div class="time">2017/02/08 15:42</div>
        <div class="content">确认完成</div>
      </li>
      <li>
        <div class="time">2017/02/05 12:20</div>
        <div class="content">寄出签证 顺丰单号：6546231321586</div>
      </li>
      <li>
        <div class="time">2017/02/04 18:30</div>
        <div class="content">领馆出签</div>
      </li>
      <li>
        <div class="time">2017/02/02 15:42</div>
        <div class="content">办理入馆</div>
      </li>
      <li>
        <div class="time">2017/01/31 16:56</div>
        <div class="content">预约入馆时间：2017-02-02</div>
      </li>
      <li>
        <div class="time">2017/01/31 10:49</div>
        <div class="content">收齐签证所需资料</div>
      </li>
      <li>
        <div class="time">2017/01/31 10:49</div>
        <div class="content">收到部分资料，还需补充身份证复印件、资产证明</div>
      </li>
      <li>
        <div class="time">2017/01/25 15:45</div>
        <div class="content">预定了日本旅游签证</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default{
  name: 'progress-detail',
  created: function () {
    document.title = '签证进度'
  },
  data:function(){
    return{
      
    }
  },
  methods:{
    

  }
}
</script>

<style lang="less" scoped>
.progress-detail{
  .topinfo{
    padding:1rem 0.8rem;
    background-color: #fff;
    margin-bottom: 0.5rem;
    .proname{
      font-size: 0.9rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .name{
      font-size: 0.8rem;
      color: #666;
    }
  }
  .list{
    li{
      padding:1rem 0.8rem;
      background-color: #fff;
      margin-bottom: 0.1rem;
      .time{
        font-size: 0.8rem;
        color: #999;
      }
      .content{
        font-size: 0.8rem;
        color: #666;
      }
    }
  }
}
</style>
