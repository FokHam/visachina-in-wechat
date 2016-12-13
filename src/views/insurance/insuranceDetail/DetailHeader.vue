<template>
  <div class="header">
    <div class="header-left">
      <img class="avator" src="/static/images/insurance/detail1.png" alt="保险详情产品图">
    </div><div class="header-right">
      <p class="name">惠择 - 申根国专属保障计划 超级无敌黄金计划</p>
      <div class="spec-list">
        <div class="spec">
          <span class="label">承保职业：</span><span>不限</span>
        </div>
        <div class="spec">
          <span class="label">限购份数：</span><span>1份</span>
        </div>
        <div class="spec">
          <span class="label">适用人群：</span><span>境外长途旅行，商务出差人士</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less" scoped>
  .header {
    background: #fff;
    padding: 0.8rem 0.6rem;
    .header-left, .header-right {
      display: inline-block;
      vertical-align: top;
    }
    .header-left {
      width: 25%;
      text-align: center;
      .avator {
        display: block;
      }
    }
    .header-right {
      width: 75%;
      padding-left: 0.5rem;
      box-sizing: border-box;
      .name {
        font-size: 0.8rem;
        line-height: 0.9rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
      }
      .spec {
        line-height: 0.8rem;
        span {
          font-size: 0.6rem;
          color: #999;
        }
      }
    }
  }


</style>
