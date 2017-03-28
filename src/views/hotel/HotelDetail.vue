<template>
  <div class="hotel-detail">
    <div v-show="!pickingNation">
      <div class="hotel-image">
        <div class="image-wrapper">
          <img class="image"
            :src="hotelDetail.web_img || '/static/images/hotel/detail-default.png'"
            :alt="hotelDetail.cname">
        </div>
        <p class="name">{{ hotelDetail.cname }}( {{ hotelDetail.ename }} )</p>
        <div class="diamond-level">
          <i class="icon-diamond"
            v-for="n in hotelDetail.stars"></i>
        </div>
        <div class="collect">
          <i class="icon-heart"
            :class="{ on: hotelDetail.collect }"
            @click="collectItem"
          ></i>
        </div>
      </div>
      <div class="hotel-more">
        <router-link :to="'/hotelMap/' + $route.params.id + '/' + hotelDetail.latitude + '/' + hotelDetail.longitude" class="item">
        
          <span>{{ hotelDetail.address }}</span>
          <span class="location">{{ hotelDetail.ccity }}, {{ hotelDetail.ccountry }}</span>
          <span class="more">地图</span>        
        </router-link>
        <router-link :to="'/hotelIntro/' + $route.params.id" class="item">
          <span>酒店简介</span>
          <span class="more">详情</span>
        </router-link>
        <div class="item"
          @click="pickingNation=true">
          <span>客人国籍</span>
          <span class="more">{{ nationalityName }} <i class="icon-more"></i></span>
        </div>
      </div>
      <div class="hotel-choice">
        <div class="choice-item"
          @click="pickingDate=true">
          <i class="icon icon-calendar"></i>
          <div class="choice-detail">
            <p>{{ startDate.format("MM-dd") }} <span>周五 入住</span></p>
            <p>{{ endDate.format("MM-dd") }} <span>周日 离店</span></p>
          </div>
          <i class="icon-more"></i>
        </div>
        <div class="choice-item">
          <i class="icon icon-people"></i>
          <router-link to="/hotelRoomSelect" class="choice-detail">共{{ roomNum }}间 每间<br>{{ adultNum }}成人 {{ childNum }}儿童</router-link>
          <i class="icon-more"></i>
        </div>
      </div>
      <div class="hotel-roomtype">
        <div class="item"
          v-for="(item, index) in roomType"
          @click="viewing = true;
          viewingRoomTypeNum = index">
          <div class="item-left">
            <p class="name">{{ item.name }}</p>
            <p class="detail">
              <!-- <span v-if="item.area">{{ item.area + "m" }}<sup>2</sup></span> -->
              {{ item.bed + " " + item.breakfast }}
            </p>
            <span class="cancel"
              :class="item.cancel_flag ? 'cancelable' : '' "
              v-if="!item.cancel">{{ item.cancel_flag ? "可以取消" : "不可取消" }}</span>
            <i class="icon-more"></i>
          </div>
          <div class="item-right">
            <p class="price">
              <span class="yuan">¥</span>{{ item.total_price }}
            </p>
            <span class="order-btn"
              @click.stop="goHotelForm(item)">
              预订
            </span>
          </div>
        </div>
        <div class="no-item"
          v-if="noData">
          <img src="/static/images/common/no-dtata.png" alt="没有搜索结果">
          <p>没有符合条件的房间</p>
        </div>
      </div>
      <div class="hotel-policy"
        v-if="hotelDetail.policy">
        <p class="title">酒店政策</p>
        <div v-html="hotelDetail.policy"
          class="policy-content"></div>
      </div>
      <room-detail :detailObj="viewingRoomType"
        v-if="viewing"
        @hide="viewing = false"
      ></room-detail>
      <calendar v-if="pickingDate"
        v-on:confirm="setDate"
        type1="入住"
        type2="离店"
        :multipleDate="true"
        :pickType ="1"
        :minDay="minimunDay"
        :maxDay="maximunDay"
        :day1="startDate"
        :day2="endDate"
        :dayDelay="1"
      ></calendar>
    </div>
    <search-nation
      v-if="pickingNation"
      @closePage="pickingNation=false"
      @chooseNationality="pickNation">
    </search-nation>
  </div>
</template>

<script>
  import roomDetail from "./hotelDetail/RoomDetail"
  import calendar from "../../components/Calendar"
  import SearchNation from "../../components/SearchNation"
  import { Indicator } from 'mint-ui'

  export default {
    data () {
      let today = new Date();
      return {
        maximunDay: 28,
        minimunDay: 2,
        roomType: [],
        roomTypeOld: [],
        nationality: "CN",
        nationalityName: "中国",
        viewingRoomTypeNum: 0,
        viewing: false,
        pickingDate: false,
        pickingNation: false,
        noData: false
      }
    },
    computed: {
      hotelDetail () {
        return this.$store.state.hotel.hotelDetail;
      },
      viewingRoomType () {
        let obj = {};
        let num = this.viewingRoomTypeNum;
        if (this.roomType.length > 0) {
          obj = this.roomType[num];
        }
        return obj;
      },
      adultNum () {
        return this.$store.state.hotel.adultNum;
      },
      childNum () {
        return this.$store.state.hotel.childNum;
      },
      childAge () {
        return this.$store.state.hotel.childAge;
      },
      roomNum () {
        return this.$store.state.hotel.roomNum;
      },
      checkInDate () {
        return this.$store.state.hotel.checkInDate;
      },
      checkOutDate () {
        return this.$store.state.hotel.checkOutDate;
      },
      startDate () {
        return this.$store.state.hotel.startDate;
      },
      endDate () {
        return this.$store.state.hotel.endDate;
      },
      productId () {
        return this.$store.state.hotel.productId;
      }
    },
    methods: {
      goHotelForm (roomType) {
        this.$store.commit("setHotelState", {
          type: "roomTypeObj",
          data: roomType
        });
        this.$router.push("/hotelForm/" + this.$route.params.id);
      },
      getDetail () {
        let url = "/api/hotel/info";
        let id = this.$route.params.id;
        let send = {"id": id};
        this.$http.get(url, {params: send}).then((response) => {
          console.log(JSON.parse(response.body));
          let responseBody = JSON.parse(response.body);
          if (responseBody.status === 1) {
            let data = responseBody.data;
            this.$store.commit("setHotelDetail", {
              hotelDetail: data
            });
          } else {
            console.log("请求失败！");
          }
        }, (response) => {
        });
      },
      getRoom () {
        Indicator.open('拼命读取房型数据中...');
        let url = '/api/hotel/room';
        let id = this.$route.params.id;
        let send = {
          id: id,
          qty: this.roomNum,
          checkIn: this.startDate.format("yyyy-MM-dd"),
          checkOut: this.endDate.format("yyyy-MM-dd"),
          nationality: this.nationality,
          adult: this.adultNum,
          children: this.childNum,
          childrenAge: this.childAge
        };
        this.$http.get(url, {params: send}).then((response) => {
          let data = JSON.parse(response.body).data;
          this.roomType = data.rows;
          this.noData = data.rows.length === 0 ? true : false;
          Indicator.close();
        }, (response) => {
          Indicator.close();
        });
      },
      setDate (day1, day2) {
        this.$store.commit("setHotelDate", {
          day1: day1,
          day2: day2
        });
        this.pickingDate = false;
      },
      collectItem () {
        let url = "/api/member/collect_create";
        let send = {
          type: "hotel",
          product_id: this.$route.params.id
        };
        let that = this;
        this.$http.get(url, {params: send}).then((response) => {
          that.hotelDetail.collect = !that.hotelDetail.collect;
        }, (response) => {
          console.log("服务器错误！");
        });
      },
      pickNation (name, nationality) {
        this.nationalityName = name;
        this.nationality = nationality;
        this.pickingNation = false;
        this.$store.commit("setHotelState", {
          type: "nationality",
          data: nationality
        });
      }
    },
    watch: {
      startDate: "getRoom",
      endDate: "getRoom",
      qty: "getRoom",
      adultNum: "getRoom",
      childNum: "getRoom",
      nationality: "getRoom"
    },
    created () {
      let newProductId = this.$route.params.id;
      if (newProductId !== this.productId) {
        this.$store.commit("resetHotelState");
        this.$store.commit("setHotelProductId", {
          id: this.$route.params.id
        });
        this.getDetail();
      }
      this.getRoom();
    },
    components: {
      roomDetail,
      calendar,
      SearchNation
    }
  }
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
  .icon-diamond {
    display: inline-block;
    background: url(/static/images/hotel/diamond.png) no-repeat center;
    height: 0.6rem;
    width: 0.6rem;
    background-size: contain;
    margin: 0 0.1rem;
  }
  .icon-heart {
    display: inline-block;
    background: url(/static/images/hotel/uncollect.png) no-repeat center;
    background-size: contain;
    height: 1.1rem;
    width: 1.1rem;
    &.on {
      background-image: url(/static/images/hotel/collect.png);
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
      bottom: 0.4rem;
      font-size: 0;
      padding: 0.1rem;
      border-radius: 0.1rem;
      background-color: rgba(0, 0, 0, 0.6);
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
      padding-right: 3rem;
      border-bottom: 0.05rem solid #eeeeee;
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
        font-size: 0.7rem;
        .name {
          min-height: 1.8rem;
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
          &.cancelable {
            color: green;
            border-color: green;
          }
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
    .no-item {
      padding-bottom: 4rem;
      background-color: #f6f6f6;
      img {
        width: 40%;
        margin: auto;
        padding: 5rem 0 1rem;
      }
      p {
        text-align: center;
        font-size: 0.8rem;
        color: #999;
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
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 0.05rem solid #c0c0c0;
    }
    .policy-content {
      font-size: 0.75rem;
      p {
        line-height: 2rem;
      }
    }
    .item {
      margin-bottom: 0.5rem;
      .item-title {
        padding: 0.3rem 0;
        font-size: 0.75rem;
      }
      .item-content {
      }
    }
  }
</style>
