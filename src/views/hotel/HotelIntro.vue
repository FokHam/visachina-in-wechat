<template>
  <div class="hotel-intro">
    <p class="title">服务与设施</p>
    <div class="content column-wrapper"
      :class="{ show: showMore }">
      <div class="column">
        <p class="title">服务</p>
        <ul class="list">
          <li>
            <i class="icon icon-consult"></i>
            <span>旅游咨询</span>
          </li>
          <li>
            <i class="icon icon-clock"></i>
            <span>唤醒</span>
          </li>
          <li>
            <i class="icon icon-child"></i>
            <span>儿童附加床</span>
          </li>
          <li>
            <i class="icon icon-park"></i>
            <span>免费停车场</span>
          </li>
          <li>
            <i class="icon icon-allday"></i>
            <span>24小时接待</span>
          </li>
          <li>
            <i class="icon icon-bar"></i>
            <span>酒吧</span>
          </li>
          <li>
            <i class="icon icon-exchange"></i>
            <span>外币兑换</span>
          </li>
          <li>
            <i class="icon icon-rentcar"></i>
            <span>租车</span>
          </li>
        </ul>
      </div>
      <div class="column">
        <p class="title">设施</p>
        <ul class="list">
          <li>
            <i class="icon icon-gym"></i>
            <span>健身中心</span>
          </li>
          <li>
            <i class="icon icon-bathtub"></i>
            <span>浴缸</span>
          </li>
          <li>
            <i class="icon icon-laundry"></i>
            <span>洗衣间</span>
          </li>
          <li>
            <i class="icon icon-balcony"></i>
            <span>阳台</span>
          </li>
          <li>
            <i class="icon icon-tv"></i>
            <span>电视</span>
          </li>
          <li>
            <i class="icon icon-nosmoke"></i>
            <span>无烟客房</span>
          </li>
        </ul>
      </div>
      <p class="view-more"
        v-if="service.length > 3 || facility.length > 3"
        @click="showMore = !showMore">
        {{ showMore ? "收起" : "查看更多"}}
        <i :class="[ showMore ? 'icon-more-up' : 'icon-more-down' ]"></i>
      </p>
    </div>
    <p class="title">酒店信息</p>
    <div class="content">
      <template v-for="(desc, n) in hotelDetail.descriptions">
        <p class="content-para">{{ desc }}</p>
        <div class="img-wrapper">
          <img :src="hotelDetail.images[n]" alt="酒店产品介绍图片">
        </div>
      <template>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showMore: false,
        service: [
          "consult", "clock", "child", "park", "allday", "bar", "exchange", "rentcar"
        ],
        facility: [
          "gym", "bathtub", "laundry", "balcony", "tv", "nosmoke"
        ]
      }
    },
    computed: {
      hotelDetail () {
        return this.$store.state.hotel.hotelDetail;
      }
    }
  }
</script>

<style lang="less" scoped>
  .bgi(@imgpath) { background-image: @imgpath; }
  .icon-consult { background-image: url("/static/images/hotel/service-consult.png"); }
  .icon-clock { background-image: url(/static/images/hotel/service-clock.png); }
  .icon-child { background-image: url(/static/images/hotel/service-child.png); }
  .icon-park { background-image: url(/static/images/hotel/service-park.png); }
  .icon-allday { background-image: url(/static/images/hotel/service-allday.png); }
  .icon-bar { background-image: url(/static/images/hotel/service-bar.png); }
  .icon-exchange { background-image: url(/static/images/hotel/service-exchange.png); }
  .icon-rentcar { background-image: url(/static/images/hotel/service-rentcar.png); }
  .icon-gym { background-image: url(/static/images/hotel/facility-gym.png); }
  .icon-bathtub { background-image: url(/static/images/hotel/facility-bathtub.png); }
  .icon-laundry { background-image: url(/static/images/hotel/facility-laundry.png); }
  .icon-balcony { background-image: url(/static/images/hotel/facility-balcony.png); }
  .icon-tv { background-image: url(/static/images/hotel/facility-tv.png); }
  .icon-nosmoke { background-image: url(/static/images/hotel/facility-nosmoke.png); }
  .icon-more-down {
    display: inline-block;
    margin-left: 0.2rem;
    width: 0.7rem;
    height: 0.7rem;
    background: url(/static/images/hotel/more-down.png) no-repeat center;
    background-size: contain;
  }
  .icon-more-up {
    .icon-more-down;
    transform: rotate(180deg);
  }
  .hotel-intro {
    padding: 0.5rem;
    .title {
      margin: 0.8rem 0;
      line-height: 1;
      font-size: 0.8rem;
    }
    .content {
      background-color: #fff;
      padding: 0.6rem;
      border-radius: 0.2rem;
      margin-bottom: 1.2rem;
      .img-wrapper {
        margin: 0.7rem 0;
        overflow: hidden;
        height: 0;
        padding-bottom: 50%;
        border-radius: 0.5rem;
      }
      .content-para {
        color: #666;
        line-height: 1.5;
      }
    }
    .column-wrapper {
      position: relative;
      display: flex;
      padding-bottom: 1.8rem;
      &.show .column {
        height: auto;
      }
      .column {
        height: 5.8rem;
        overflow: hidden;
        flex: 1;
        .list {
          li {
            font-size: 0;
            margin-bottom: 0.5rem;
            padding-left: 1rem;
            position: relative;
          }
          span {
            color: #999;
            line-height: 1;
          }
          .icon {
            position: absolute;
            left: 0; top: 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            height: 0.7rem;
            width: 0.7rem;
          }
        }
      }
      .view-more {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0.5rem;
        left: 0;
        right: 0;
        text-align: center;
      }
    }
  }
</style>
