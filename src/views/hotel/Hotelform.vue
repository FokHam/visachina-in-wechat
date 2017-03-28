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
      <p class="info date-info">
        <span class="date">入住： {{ hotelState.startDate.getMonth() + 1 + "月" + hotelState.startDate.getDate() + "日" }}</span>
        <span class="date">离店： {{ hotelState.endDate.getMonth() + 1 + "月" + hotelState.endDate.getDate() + "日" }}</span>
        <span>{{ totalDay }}晚</span>
      </p>
    </div>
    <div class="form wave-btm-bg">
      <div class="item">
        <span class="label">房间数</span>
        <span>{{ hotelState.roomNum }} 间</span>
      </div>
      <div class="item-seperate"
        v-for="(room, index) in room_guest">
        <div class="item-wrap">
          <div class="item">
            <span class="label">入住人</span>
            <div class="tit">客房{{index+1}}</div>
            <div class="passenger">
              <div class="input-wrap">
                <input type="text" v-model="room.last_name" placeholder="姓：如Zhang" maxlength="12">
                <i class="icon-delete"
                  v-if="room.last_name"
                  @click="room.last_name=''"></i>
              </div>
              <div class="input-wrap">
                <input type="text" v-model="room.first_name" placeholder="名：如San" maxlength="12">
                <i class="icon-delete"
                  v-if="room.first_name"
                  @click="room.first_name=''"></i>
              </div>
            </div>            
          </div>
        </div>
        <div class="contacts-book addperson" @click="selectPerson('passenger', index)">
        </div>
      </div>
      <div class="item-seperate">
        <div class="item-wrap">
          <div class="item">
            <span class="label">联系人</span>
            <div class="input-wrap">
              <input type="text" v-model="contact.last_name" placeholder="姓：如Zhang" maxlength="12">
              <i class="icon-delete"
                v-if="contact.last_name"
                @click="contact.last_name=''"></i>
            </div>
            <div class="input-wrap">
              <input type="text" v-model="contact.first_name" placeholder="名：如San" maxlength="12">
              <i class="icon-delete"
                v-if="contact.first_name"
                @click="contact.first_name=''"></i>
            </div>
          </div>
          <div class="item">
            <span class="label">手机号</span>
            <input type="tel" v-model="contact.phone" placeholder="接受订单确认信息" maxlength="11">
          </div>
          <div class="item">
            <span class="label">邮&nbsp;&nbsp;&nbsp;箱</span>
            <input type="email" v-model="contact.email" placeholder="请填写联系人邮箱" maxlength="30">
          </div>
        </div>
        <div class="contacts-book addcontact" @click="selectPerson('contact')">
        </div>
      </div>
    </div>
    <div class="create">
      <p class="price">订单金额：
        <span class="yuan">¥</span>
        <span class="amount">{{ hotelState.roomTypeObj.total_price }}</span>
      </p>
      <span class="button"
        @click="createOrder">提交订单</span>
    </div>
    <select-person
      v-if="selectingPerson"
      :selectType="selectType"
      @confirm="confirmPerson"
      @close="selectingPerson = false"
      ></select-person>
  </div>
</template>

<script>
  import SelectPerson from './hotelForm/SelectPerson';
  import Vue from 'vue';

  import { Toast } from "mint-ui"
  import { Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        room_guest: [],
        contact: {
          first_name: "",
          last_name: "",
          email: "",
          phone: ""
        },
        person: "",
        selectingPerson: false,
        selectType: "",
        selectIndex: ""
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
    methods: {
      createOrder () {
        let url = "/api/hotel/create_order"
        let hs = this.hotelState;
        let send = {
          hotel: this.$route.params.id,
          plan: hs.roomTypeObj.plan,
          checkIn: hs.startDate.format("yyyy-MM-dd"),
          checkOut: hs.endDate.format("yyyy-MM-dd"),
          qty: hs.roomNum,
          adult: hs.adultNum,
          children: hs.childNum,
          childrenAge: hs.childAge,
          nationality: hs.nationality,
          room_guest: this.room_guest,
          contact: this.contact,
        };
        Indicator.open("正在提交订单...");
        this.$http.post(url, send).then((response) => {
          let body = JSON.parse(response.body);
          if (body.status === 1) {
            this.$router.push('/hotelOrderDetail/'+body.data.orderno)
          } else {
            Toast({
              message: body.msg,
              position: "middle",
              duration: 3500
            });
          }
          Indicator.close();
        }, (response) => {
          Toast({
            message: "服务器错误",
            position: "middle",
            duration: 3500
          });
          Indicator.close();
        })
        console.log(send);
      },
      selectPerson (type, index) {
        this.selectType = type;
        this.selectIndex = index;
        this.selectingPerson = true;
        this.pushHistory();
      },
      pushHistory () {
        var state = {  
          title: document.title,
          url: document.location.href  
        };  
        window.history.pushState(state,document.title, document.location.href);
      },
      confirmPerson () {
        let person = this.$store.state.hotel.hotelPerson;
        history.go(-1)
        switch (this.selectType) {
          case "passenger":
            this.room_guest[this.selectIndex].last_name = person.spell_surname;
            this.room_guest[this.selectIndex].first_name = person.spell_name;
            this.selectingPerson = false;
            break;
          case "contact":
            this.contact.last_name = person.spell_surname;
            this.contact.first_name = person.spell_name;
            this.contact.phone = person.phone;
            this.contact.email = person.email;
            this.selectingPerson = false;
            break;
        }
      }
    },
    computed: {
      hotelState () {
        return this.$store.state.hotel;
      },
      totalDay () {
        return Math.floor(this.hotelState.endDate.getTime() - this.hotelState.startDate.getTime()) / (24 * 3600 * 1000);
      }
    },
    components: {
      SelectPerson
    }
  }
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
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
  .hotel-form {
    padding-bottom: 4rem;
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
    padding-bottom: 1.5rem;
    .item-seperate {
      display: flex;
      .item-wrap {
        flex: 1;
      }
      .contacts-book {
        position: relative;
        width: 3.5rem;        
        border-bottom: #eee solid 0.05rem;
        &.addperson{
          background-image: url(/static/images/hotel/icon-add.png);
          background-size: 1rem;
          background-position: 50%;
          background-repeat: no-repeat;
        }
        &.addcontact{
          background-image: url(/static/images/hotel/book.png);
          background-size: 1rem;
          background-position: 50%;
          background-repeat: no-repeat;
          border-left: #eee solid 0.05rem;
        }
      }
    }
    >.item:last-child {
      border-bottom: none;
    }
    .item {
      border-bottom: #eee solid 0.05rem;
      position: relative;
      overflow: hidden;
      padding: 0.5rem 0 0.5rem 3.5rem;
      .label {
        width: 3rem;
        text-align: justify;
        line-height: 1rem;
        position: absolute;
        left: 0.5rem;
        top: 50%;
        margin-top: -0.5rem;
      }
      .tit {
        font-size: 0.7rem;
        margin-bottom: 0.3rem;
      }
      .passenger {
        overflow: hidden;
      }
      input {
        width: 100%;
        border: none;
        font-size: 0.7rem;
        line-height: 1rem;
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
      }
    }
    .input-wrap {
      float: left;
      width: 50%;
      input {
        width: 100%;
        height: 1rem;
        display: block;
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
