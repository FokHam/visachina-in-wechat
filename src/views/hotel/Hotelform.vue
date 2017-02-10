<template>
  <div class="hotel-form">
    <div class="plaque">
      <p class="room-type">{{ hotelState.hotelDetail.cname }}({{ hotelState.hotelDetail.ename }})</p>
      <p class="info">
        <span>{{ hotelState.roomTypeObj.name }}</span>
      </p>
      <p class="info">
        <span>每间最多可入住{{ hotelState.roomTypeObj.max_occupancy }}人</span>
        <span>{{ hotelState.roomTypeObj.bed }}</span>
        <span>{{ hotelState.roomTypeObj.breakfast }}</span>
      </p>
      <p class="info date-info"><span class="date">入住： 12月06日</span><span class="date">离店： 12月12日</span><span>6晚</span></p>
    </div>
    <div class="form wave-btm-bg">
      <div class="item">
        <span class="label">房间数</span>
        <span>{{ hotelState.roomNum }} 间</span>
      </div>
      <div class="item">
        <span class="label">入住人</span>
        <div class="room-wrap">
          <div class="room"
            v-for="(room, index) in room_guest">
            <p>客房 {{ index + 1 }}</p>
            <div class="person">
              <div class="input-wrap">
                <input type="text" v-model="room.last_name" placeholder="姓 Last Name">
                <i class="icon-delete"
                  v-if="room.last_name"
                  @click="room.last_name=''"></i>
              </div>
              <div class="input-wrap">
                <input type="text" v-model="room.first_name" placeholder="名 First Name">
                <i class="icon-delete"
                  v-if="room.first_name"
                  @click="room.first_name=''"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-seperate">
        <div class="item-wrap">
          <div class="item">
            <span class="label">联系人</span>
            <input type="text" name="" value="" placeholder="请填写联系人姓名">
          </div>
          <div class="item">
            <span class="label">手机号</span>
            <input type="number" name="" value="" placeholder="接受订单确认信息">
          </div>
        </div>
        <div class="contacts-book">
          <i class="icon-book"></i>
        </div>
      </div>
      <div class="item">
        <span class="label">邮&nbsp;&nbsp;&nbsp;箱</span>
        <input type="mail" name="" value="" placeholder="请填写联系人邮箱">
      </div>
    </div>
    <div class="create">
      <p class="price">订单金额：<span class="yuan">¥</span><span class="amount">1120</span></p>
      <span class="button">提交订单</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        room_guest: []
      };
    },
    created () {
      function Person(fname, lname) {
        this.first_name = fname;
        this.last_name = lname;
      }
      for (let i = 0; i < this.hotelState.roomNum; i += 1) {
        this.room_guest.push(new Person);
      }
    },
    computed: {
      hotelState () {
        return this.$store.state.hotel;
      }
    }
  }
</script>

<style lang="less" scoped>
  .icon-pull-down {
    display: inline-block;
    height: 0.6rem;
    width: 0.6rem;
    margin-left: 0.2rem;
    background: url(/static/images/hotel/more-down.png) center no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
  .icon-pull-right {
    display: inline-block;
    height: 0.7rem;
    width: 0.7rem;
    background: url(/static/images/hotel/more.png) center no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
  .icon-book {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 1.4rem;
    width: 1.4rem;
    background: url(/static/images/hotel/book.png) center no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
  .plaque {
    position: relative;
    margin: 0.5rem;
    padding: 0.6rem;
    border-radius: 0.25rem;
    background-color: #5DB3EA;
    p, span {
      color: #fff;
    }
    .room-type {
      display: inline-block;
      max-width: 13rem;
      line-height: 1;
      margin-bottom: 1rem;
      font-size: 0.8rem;
      word-break: break-all;
    }
    .room-type-detail {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
    .info {
      span {
        margin-right: 0.5rem;
        color: #DEF2FF;
      }
      .date {
        display: inline-block;
        background-color: #008BE4;
        padding: 0.2rem 0.3rem;
      }
    }
    .date-info {
      margin-top: 0.5rem;
    }
  }
  .form {
    background-color: #fff;
    padding-bottom: 0.5rem;
    .item-seperate {
      display: flex;
      .item-wrap {
        flex: 1;
      }
      .contacts-book {
        position: relative;
        width: 3.5rem;
        border-left: #eee solid 0.05rem;
        border-bottom: #eee solid 0.05rem;
      }
    }
    >.item:last-child {
      border-bottom: none;
    }
    .item {
      border-bottom: #eee solid 0.05rem;
      display: flex;
      align-items: center;
      padding: 0.8rem 0.5rem;
      .label {
        width: 3rem;
        margin-right: 0.5rem;
        text-align: justify;
      }
      input {
        width: 50%;
        border: none;
        font-size: 0.7rem;
        line-height: 1;
      }
      .room-button {
        flex: 1;
        text-align: right;
        color: #FF4E00;
      }
      .room {
        padding-bottom: 0.3rem;
        &:last-child {
          padding-bottom: 0;
        }
        .person {
          display: flex;
          margin: 0.3rem 0;
          .input-wrap {
            position: relative;
            input {
              width: 100%;
            }
            .icon-delete {
              position: absolute;
              top: 0;
              bottom: 0;
              right: 1rem;
              margin: auto;
              width: 0.5rem;
              height: 0.5rem;
              background: url(/static/images/insurance/delete.png) center no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }
  .create {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 0.8rem 0.5rem;
    box-sizing: border-box;
    font-size: 0;
    .price {
      vertical-align: middle;
      .yuan {
        margin-left: 0.2rem;
      }
      span {
        font-size: 0.8rem;
        color: #F55301;
      }
    }
    .button {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      padding: 0.3rem 1.2rem;
      background-color: #008BE4;
      color: #fff;
      border-radius: 0.2rem;
    }
  }
</style>
