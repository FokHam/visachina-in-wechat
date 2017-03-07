<template>
  <div class="header">
    <div class="header-left">
      <img class="avator" src="/static/images/insurance/detail1.png" alt="保险详情产品图">
    </div><div class="header-right">
      <p class="name">{{ isrDetail.companyName + " - " + isrDetail.name}}{{ isrDetail.planName ? (" - " + isrDetail.planName) : ""}}</p>
      <div class="spec-list">
        <div class="spec">
          <span class="label">承保职业：</span><span>{{ isrDetail.web_position }}</span>
        </div>
        <div class="spec">
          <span class="label">限购份数：</span><span>1份</span>
        </div>
        <div class="spec">
          <span class="label">适用人群：</span><span>境外长途旅行，商务出差人士</span>
        </div>
      </div>
      <div class="addfev" :class="{collect:iscollect==1}" @click="$emit('collectClick')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      "isrDetail",
      "iscollect"
    ]
  }
</script>

<style lang="less" scoped>
  .header {
    background: #fff;
    position: relative;
    padding: 0.8rem 0.6rem 0.8rem 5.5rem;
    .header-left, .header-right {
      display: inline-block;
      vertical-align: top;
    }
    .header-left {
      position: absolute;
      top: 0.8rem;
      left: 0.6rem;
      width: 4.5rem;
      text-align: center;
      .avator {
        display: block;
      }
    }
    .header-right {
      box-sizing: border-box;
      .name {
        font-size: 0.7rem;
        line-height: 0.9rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
        padding-right: 1.7rem;
      }
      .spec {
        line-height: 0.8rem;
        span {
          font-size: 0.6rem;
          color: #999;
        }
      }
    }
    .addfev{
      position: absolute;
      height: 1.5rem;
      width: 1.5rem;
      right: 0.6rem;
      top: 0.9rem;
      font-size: 0.6rem;
      text-align: center;
      background-image: url('/static/images/visa/uncollect.png');
      background-repeat: no-repeat;
      background-size: 1.25rem;
      background-position: center 0.4rem;
      color: #fe7c98;
      &.collect{
        background-image: url('/static/images/visa/collect.png');
      }
    }
  }


</style>
