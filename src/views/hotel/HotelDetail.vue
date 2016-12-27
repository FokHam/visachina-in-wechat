<template>
  <div class="hotel-detail">
    <div class="hotel-image">
      <div class="image-wrapper">
        <img class="image" src="/static/images/hotel/jiudian.png" alt="清迈皇家沛纳海酒店">
      </div>
      <p class="name">清迈皇家沛纳海酒店（Royal Panerai Hotel Chiangmai）</p>
      <div class="diamond-level">
        <i class="icon-diamond"></i>
        <i class="icon-diamond"></i>
        <i class="icon-diamond"></i>
      </div>
      <div class="collect">
        <i class="icon-heart"></i>
      </div>
    </div>
    <div class="hotel-more">
      <div class="item">
        <span>3/9 Assadathorn Road</span>
        <span class="location">清迈，泰国</span>
        <span class="more">地图 <i class="icon-more"></i></span>
      </div>
      <div class="item">
        <span>酒店简介</span>
        <span class="more">详情 <i class="icon-more"></i></span>
      </div>
    </div>
    <div class="hotel-choice">
      <div class="choice-item">
        <i class="icon icon-calendar"></i>
        <div class="date-detail">
          <p>12-02 <span>周五 入住</span></p>
          <p>12-04 <span>周日 离店</span></p>
        </div>
        <i class="icon-more"></i>
      </div>
      <div class="choice-item">
        <i class="icon icon-people"></i>
        <p>共2间，适合2人</p>
        <i class="icon-more"></i>
      </div>
    </div>
    <div class="hotel-roomtype">
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <p class="name">Junior Triple Room, 1 Bedroom</p>
          <p class="detail">32m 一张双人床 含早餐</p>
          <span class="cancel">不可取消</span>
          <i class="icon-more"></i>
        </div>
        <div class="item-right">
          <p class="price">
            <span class="yuan">¥</span>299
          </p>
          <span class="order-btn">预定</span>
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
    background: url(/static/images/hotel/collect.png) no-repeat center;
    background-size: contain;
    height: 1.1rem;
    width: 1.1rem;
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
      flex-basis: 50%;
      box-sizing: border-box;
    }
    .choice-item {
      display: flex;
      align-items: center;
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
      .date-detail {
        span {
          color: #999;
        }
      }
      .icon-more {
        position: initial;
        margin-left: 1rem;
      }
    }
  }
  .hotel-roomtype {
    background-color: #fff;
    .item {
      display: flex;
      padding: 0.7rem 0.5rem;
      .item-left {
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
        }
        .cancel {
          line-height: 1;
          color: #ff738d;
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
          border: 0.05rem solid #ff738d;
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
          padding: 0.4rem 0.2rem;
          text-align: center;
          border-radius: 0.3rem;
          font-size: 0.8rem;
          color: #fff;
          background-color: #008be4;
        }
      }
    }
  }
</style>
