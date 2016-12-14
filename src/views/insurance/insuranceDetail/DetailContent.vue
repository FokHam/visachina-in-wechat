<template>
  <div class="content">
    <div class="content-title">
      <span class="title">保障权益及产品详情</span>
      <router-link :to="'/insuranceSpecific/' + $route.params.id">
        <span class="enter">查看更多 <i class="icon-arrow-right"></i></span>
      </router-link>
    </div>
    <ul class="right-list">
      <li class="right clearfix">
        <span class="name">意外身故及伤残保障</span>
        <span class="amount">300,000元</span>
      </li>
      <li class="right clearfix">
        <span class="name">意外身故及伤残保障</span>
        <span class="amount">300,000元</span>
      </li>
      <li class="right clearfix">
        <span class="name">意外身故及伤残保障</span>
        <span class="amount">300,000元</span>
      </li>
    </ul>
    <div class="age">
      <span class="title">承保年龄</span>
      <span class="value">18 - 85岁 <i class="icon-arrow-down"></i></span>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .content {
    .icon-arrow-right {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(/static/images/insurance/arrow-r.png) center no-repeat;
      background-size: contain;
    }
    .icon-arrow-down {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(/static/images/insurance/arrow-d.png) center no-repeat;
      background-size: contain;
    }
    margin-top: 0.5rem;
    background-color: #fff;
    padding: 0 0.6rem;
    .content-title {
      position: relative;
      .title {
        font-size: 0.8rem;
        line-height: 2rem;
      }
      .enter {
        float: right;
        line-height: 2rem;
        color: #666;
      }
    }
    .right-list {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
      .right {
        span {
          color: #666;
        }
        line-height: 1.4rem;
        .name {
          float: left;
          padding-left: 1.1rem;
          background: url("/static/images/insurance/right-logo.png") center left no-repeat;
          background-size: 0.8rem 0.8rem;
        }
        .amount {
          float: right;
          margin-right: 0.5rem;
        }
      }
    }
    .age {
      .title {
        font-size: 0.8rem;
        line-height: 2rem;
      }
      .value {
        float: right;
        line-height: 2rem;
        color: #666;
      }
    }
  }
</style>
