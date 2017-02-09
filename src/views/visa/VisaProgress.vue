<template>
<div class="progress-detail" id="progress-detail">
  <div class="itemslist">
    <div class="item">
      <div class="tit">加拿大旅游签证</div>
      <div class="list">
        <ul>
          <li>
            <div class="top">
              <span class="name">周方晗</span>
              <span class="date">2017/02/08 17:12</span>
            </div>
            <div class="bottom">
              <span class="status">寄出签证</span>
              <span class="txt">顺丰单号：21231321321</span>
            </div>
          </li>
          <li>
            <div class="top">
              <span class="name">江思敏</span>
              <span class="date">2017/02/07 15:32</span>
            </div>
            <div class="bottom">
              <span class="status">签证入馆</span>
              <span class="txt">等待出签</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">日本旅游签证</div>
      <div class="list">
        <ul>
          <li>
            <div class="top">
              <span class="name">周方晗</span>
              <span class="date">2017/02/08 17:12</span>
            </div>
            <div class="bottom">
              <span class="status">寄出签证</span>
              <span class="txt">顺丰单号：21231321321</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="empty" v-if="false">您当前无代办理的签证</div>
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
  .item{
    margin:0 0.3rem 0.2rem 0.3rem;
    background-color: #fff;
    .tit{
      line-height: 1.4rem;
      border:1px solid #999;
      color: #999999;
      display: inline-block;
      font-size: 0.8rem;
      padding: 0 0.5rem;
      margin: 0.8rem 0.8rem 0.5rem;
    }
    .list{
      li{        
        span{
          display: inline-block;float: left;
          line-height: 1rem;
        }
        .top{
          overflow:hidden;
          margin-bottom: 0.3rem;
          .name{
            padding-left: 0.65rem;
            border-left: 0.15rem solid #008be4;
            margin-right: 0.8rem;
          }
        }
        .bottom{
          overflow:hidden;
          padding-left: 0.8rem;
          padding-bottom: 0.8rem;
          .status{
            padding-right: 0.8rem;color: #666;
          }
          .txt{
            padding-left: 0.8rem;
            border-left: 1px solid #eee;color: #666;
          }
        }
      }
    }
  }
  .empty{
    position: absolute;
    top: 50%;
    margin-top: -6rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.9rem;
    color: #bfbfbf;
    text-align: center;
    padding-top: 9rem;
    background-image: url('/static/images/visa/icon-empty.png');
    background-size:auto 8rem;
    background-repeat: no-repeat;
    background-position: center top;
  }
}
</style>
