<template>
  <div class="hotel-detail">
    <div class="hotel-image">
      <div class="image-wrapper">
        <img class="image" src="/static/images/hotel/jiudian.png" alt="清迈皇家沛纳海酒店">
      </div>
      <p class="name">清迈皇家沛纳海酒店（Royal Panerai Hotel Chiangmai）</p>
      <div class="diamond-level">
        <i class="icon-diamond"
          v-for="n in hDetail.star"></i>
      </div>
      <div class="collect">
        <i class="icon-heart"
          :class="{ on: hDetail.collect }"
        ></i>
      </div>
    </div>
    <div class="hotel-more">
      <div class="item">
        <span>{{ hDetail.address }}</span>
        <span class="location">{{ hDetail.city }}</span>
        <span class="more">地图 <i class="icon-more"></i></span>
      </div>
      <router-link :to="'/hotelIntro/' + $route.params.id" class="item">
        <span>酒店简介</span>
        <span class="more">详情 <i class="icon-more"></i></span>
      </router-link>
    </div>
    <div class="hotel-choice">
      <div class="choice-item">
        <i class="icon icon-calendar"></i>
        <div class="choice-detail">
          <p>12-02 <span>周五 入住</span></p>
          <p>12-04 <span>周日 离店</span></p>
        </div>
        <i class="icon-more"></i>
      </div>
      <div class="choice-item">
        <i class="icon icon-people"></i>
        <p class="choice-detail">共2间，适合2人</p>
        <i class="icon-more"></i>
      </div>
    </div>
    <div class="hotel-roomtype">
      <div class="item"
        v-for="(item, index) in roomType"
        @click="viewing = true; viewingRoomTypeNum = index">
        <div class="item-left">
          <p class="name">{{ item.name }}</p>
          <p class="detail">
            <span v-if="item.area">{{ item.area + "m" }}<sup>2</sup></span>
            {{ item.detail }}
          </p>
          <span class="cancel"
            v-if="!item.cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>{{ item.price }}
          </p>
          <router-link :to="'/hotelForm/' + $route.params.id " class="order-btn">预订</router-link>
        </div>
      </div>
    </div>
    <div class="hotel-policy"
      v-if="hDetail.policy.length">
      <p class="title">酒店政策</p>
      <div class="item"
        v-for="item in hDetail.policy">
        <p class="item-title">{{ item.title }}</p>
        <p class="item-content">{{ item.content }}</p>
      </div>
    </div>
    <room-detail :detailObj="viewingRoomType"
      v-if="viewing"
      @hide="viewing = false"
    ></room-detail>
  </div>
</template>

<script>
  import roomDetail from "./HotelDetail/RoomDetail.vue"

  export default {
    data () {
      return {
        hDetail: {
          cname: "清迈皇家沛纳海酒店",
          ename: "Royal Panerai Hotel Chiangmai",
          star: 5,
          collect: false,
          address: "3/9 Assadathorn Road",
          city: "清迈，泰国",
          policy: [
            {
              title: "入住和离店",
              content: "入住时间：14:00之后 离店时间：12:00"
            },
            {
              title: "儿童及附加床",
              content: "不同类型的客房允许儿童入住和加床政策可能不同，请注意查 看客房详细信息。 所提出的任何加床或婴儿床的要求均需获 得酒店的确认。 附加费用不会自动计算在总价中，您需在入 住时另行支付。"
            }
          ]
        },
        roomType: [
          {
            name: "Junior Triple Room, 1 Bedroom",
            area: 12,
            detail: "一张双人床",
            breakfast: false,
            cancel: false,
            price: 199,
            wifi: true,
            maximun: 5
          },{
            name: "Superior Room",
            area: 21,
            detail: "一张单人床 不含早餐",
            cancel: false,
            price: 299
          },{
            name: "Bunk Bed in Mixed Dormitory Room",
            area: 177,
            detail: "八张双人床 含早餐",
            cancel: false,
            price: 1299
          }
        ],
        orderInfo: {
          startDate: "",
          endDate: "",
          roomNum: 1,
          adults: 1,
          children: 2
        },
        viewingRoomTypeNum: 0,
        viewing: false
      }
    },
    computed: {
      viewingRoomType () {
        let obj = {};
        let num = this.viewingRoomTypeNum;
        if (this.roomType.length > 0) {
          obj = this.roomType[num];
        }
        return obj;
      }
    },
    components: {
      roomDetail
    }
  }
</script>

<style lang="less" scoped>
  .icon-diamond {
    display: inline-block;
    background: url(/static/images/hotel/diamond.png) no-repeat center;
    height: 0.6rem;
    width: 0.6rem;
    background-size: contain;
    margin-right: 0.2rem;
  }
  .icon-heart {
    display: inline-block;
    background: url(/static/images/hotel/uncollect.png) no-repeat center;
    background-size: contain;
    height: 1.1rem;
    width: 1.1rem;
    &.on {
      background-image: url(/static/images/hotel/uncollect.png);
    }
  }
  .icon-more {
    position: absolute;
    background: url(/static/images/hotel/more.png) no-repeat center;
    background-size: contain;
    height: 0.6rem;
    width: 0.77rem;
    right: -0.8rem;
    top: 0;
    bottom: 0;
    margin: auto;
    background-size: contain;
  }
  .hotel-image {
    position: relative;
    .image-wrapper {
      max-width: 100%;
      height: 0;
      padding-bottom: 45%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .name {
      position: absolute;
      left: 0.5rem;
      bottom: 1.3rem;
      padding: 0.2rem;
      max-width: 80%;
      box-sizing: border-box;
      border-radius: 0.1rem;
      font-size: 0.7rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .diamond-level {
      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      font-size: 0;
    }
    .collect {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      height: 1.7rem;
      width: 1.7rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.8);
      text-align: center;
    }
  }
  .hotel-more {
    background-color: #fff;
    font-size: 0;
    .item {
      display: block;
      position: relative;
      padding: 0.6rem;
      padding-right: 2rem;
      border-bottom: 0.05rem solid #c0c0c0;
      &:last-child {
        border-bottom: none;
      }
      span {
        line-height: 1;
        color: #666;
      }
      .location {
        color: #008be4;
        margin-left: 0.2rem;
      }
      .more {
        position: absolute;
        right: 1rem;
        top: 0;
        bottom: 0;
        margin: auto;
        color: #999;
        height: 0.6rem;
      }
    }
  }
  .hotel-choice {
    display: flex;
    margin-top: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-bottom: 0.05rem solid #c0c0c0;
    background-color: #fff;
    .choice-item {
      display: flex;
      align-items: center;
      flex-basis: 50%;
      .icon {
        background: no-repeat center;
        background-size: contain;
        flex-basis: 20%;
        height: 1.2rem;
      }
      .icon-calendar {
        background-image: url(/static/images/hotel/calendar.png);
      }
      .icon-people {
        background-image: url(/static/images/hotel/people.png);
      }
      .choice-detail {
        flex-basis: 70%;
        text-align: center;
        span {
          color: #999;
        }
      }
      .icon-more {
        position: initial;
      }
    }
  }
  .hotel-roomtype {
    background-color: #fff;
    .item {
      display: flex;
      padding: 0.7rem 0.5rem;
      border-bottom: 0.05rem solid #f6f6f6;
      .item-left {
        position: relative;
        padding-right: 1rem;
        flex-basis: 75%;
        .name {
          height: 1.8rem;
          line-height: 0.9rem;
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
        }
        .detail {
          color: #999;
          margin-bottom: 0.2rem;
          span {
            color: #999;
          }
        }
        .cancel {
          display: inline-block;
          color: #ff738d;
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
          border: 0.05rem solid #ff738d;
        }
        .icon-more {
          right: 0.2rem;
        }
      }
      .item-right {
        flex: 25%;
        flex-direction: column;
        justify-content: flex-end;
        text-align: right;
        display: flex;
        .price {
          color: #d44b00;
          font-size: 1.2rem;
          margin-bottom: 0.2rem;
          span {
            color: #d44b00;
          }
        }
        .order-btn {
          padding: 0.3rem 0.15rem;
          text-align: center;
          border-radius: 0.2rem;
          font-size: 0.8rem;
          color: #fff;
          background-color: #008be4;
        }
      }
    }
  }
  .hotel-policy {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #fff;
    .title {
      font-size: 0.9rem;
      line-height: 1;
      margin-right: -0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 0.05rem solid #c0c0c0;
    }
    .item {
      margin-bottom: 0.5rem;
      .item-title {
        padding: 0.3rem 0;
        font-size: 0.75rem;
      }
      .item-content {
        color: #999;
      }
    }
  }
</style>
