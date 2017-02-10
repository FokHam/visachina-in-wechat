<template>
  <div class="hotel-list">
    <div v-show="!searchingCity">
      <div class="search-bar">
        <div class="date-wrapper"
        @click="pickingDate = true">
          <p>住{{ this.startDate.format("MM-dd") }}</p>
          <p>离{{ this.endDate.format("MM-dd") }}</p>
          <i class="icon-pulldown"></i>
        </div>
        <div class="input-wrapper"
          @click="searchingCity=true">
          <i class="icon-search"></i>
          <input type="text" v-model="destination" name="" value="" placeholder="输入城市">
          <i class="clear-input" @click="clearInput" v-if="keyword"></i>
        </div>
      </div>
      <div class="filter-bar"
        @click="selectingFilt=true">
        <span class="filter-btn"
          @click="filtType='area'">
          区域
          <i class="icon-pulldown"></i>
        </span>
        <span class="filter-btn"
          @click="filtType='price'">
          价格
          <i class="icon-pulldown"></i>
        </span>
        <span class="filter-btn"
          @click="filtType='star'">
          钻级
          <i class="icon-pulldown"></i>
        </span>
      </div>
      <ul class="item-list"
        v-infinite-scroll="getMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="40">
        <li>
          <router-link v-for="(item, index) in hotelList"
            class="hotel-item"
            :to="'/hotelDetail/' + item.id">
            <div class="hotel-pic">
              <img :src="item.web_img || '/static/images/hotel/list-default.png'" :alt="item.cname">
            </div>
            <div class="hotel-info">
              <p class="cname text-overflow">{{ item.cname }}</p>
              <p class="ename text-overflow">{{ item.ename}}</p>
              <div class="diamon-level">
                <i v-for="n in item.stars"
                  class="icon-diamond">
                </i>
              </div>
              <div class="service">
                <i v-for="(facility, n) in item.facility"
                  :class="'icon-' + facilityList[n]"
                  v-if="facility"></i>
              </div>
              <p class="location text-overflow">{{ "位于" + item.cityname}}</p>
            </div>
            <div class="hotel-price">
              <div class="collect">
                <i class="icon-heart"
                  :class="{ on : item.collect }"
                @click.prevent="collectItem(item.id, index)"
                ></i>
                <p>{{ (item.collect ? "已" : "未") + "收藏" }}</p>
              </div>
              <div class="price">
                <p><span class="yuan">¥</span>{{ item.price }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <p class="loading-text">{{ loadingText }}</p>
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
      <ul class="search-list"
        @touchmove.prevent
        v-if="searchResult.length">
        <li class="search-item"
          v-for="item in searchResult">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <hotel-filter v-if="selectingFilt"
      @close="selectingFilt=false"
      :filtType="filtType">
    </hotel-filter>
    <cities
      v-if="searchingCity"
      @choseCity="changeCity"
      @closePage="searchingCity=false">
    </cities>
  </div>
</template>

<script>
  import Calendar from "../../components/Calendar"
  import Cities from "../../components/SearchCity"
  import HotelFilter from "./hotelList/HotelFilter"
  import { Indicator } from "mint-ui"
  import { InfiniteScroll } from 'mint-ui'

  export default {
    data () {
      return {
        pickingDate: false,
        selectingFilt: false,
        searchingCity: false,
        minimunDay: 2,
        maximunDay: 28,
        facilityList: [
          "wifi", "park", "swim"
        ],
        hotelList: [],
        keyword: "",
        searchResult: [],
        pageNum: 1,
        loadingList: false,
        loadingText: "加载列表中...",
        filtType: ""
      };
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        if (this.loadingList === true) { return false; }
        Indicator.open("拼命读取酒店数据中...");
        let url = "/api/hotel/list";
        let send = {
          cityname: this.destination,
          page: this.pageNum
        };
        this.loadingList = true;
        this.$http.get(url, {params: send}).then((response) => {
          console.log(JSON.parse(response.body));
          let body = JSON.parse(response.body);
          if (this.pageNum !== 1) {
            this.hotelList = this.hotelList.concat(body.data.rows);
            console.log("当前页数: " + this.pageNum);
          } else {
            this.hotelList = body.data.rows;
          }
          this.$store.commit("setHotelState", {
            type: "hotelList",
            data: body.data
          });
          this.loadingList = false;
          Indicator.close();
        }, (response) => {
          Indicator.close();
          this.loadingList = false;
        });
      },
      getMore () {
        if (this.loadingList === true) { return false; }
        if (this.hotelList.length !== 0) {
          this.pageNum += 1;
          this.getList();
          console.log("gettingmore")
        }
      },
      // getNation () {
      //   if (this.nationList.length !== 0) { return false; }
      //   let url = "/api/hotel/country";
      //   this.$http.get(url).then((response) => {
      //     let body = JSON.parse(response.body);
      //     this.commit("setHotelState", {
      //       type: "nationList",
      //       data: body.rows
      //     }) = body.data.rows;
      //   }, (response) => {
      //     console.log("服务器错误");
      //   });
      // },
      clearInput () {
        this.keyword = "";
      },
      setDate (day1, day2) {
        this.$store.commit("setHotelDate", {
          day1: day1,
          day2: day2
        });
        this.pickingDate = false;
      },
      collectItem (id, index) {
        let url = "/api/member/collect_create";
        let send = {
          type: "hotel",
          product_id: id
        };
        this.$http.get(url, {params: send}).then((response) => {
          console.log(JSON.parse(response.body));
          this.hotelList[index].collect = this.hotelList[index].collect ? 0 : 1;
        }, (response) => {
          console.log("服务器错误！");
        });
      },
      changeCity (name) {
        this.$store.commit("setHotelState", {
          type: "destination",
          data: name
        });
        this.getList();
        this.searchingCity = false;
      },
    },
    computed: {
      destination () {
        return this.$store.state.hotel.destination;
      },
      startDate () {
        return this.$store.state.hotel.startDate;
      },
      endDate () {
        return this.$store.state.hotel.endDate;
      },
      hotelFiltList () {
        return this.$store.state.hotel.hotelFiltList;
      }
    },
    watch: {
      keyword () {
        if (this.keyword === "") {
          this.searchResult = [];
          return false;
        }
        let url = "/api/hotel/searchcity";
        let send = {
          keyword: this.keyword
        };
        this.$http.get(url, {params: send}).then((response) => {
          let body = JSON.parse(response.body);
          this.searchResult = body.data.rows;
        }, (response) => {
          console.log("服务器错误");
        });
      },
      destination () {
        this.pageNum = 1;
      }
    },
    components: {
      Calendar,
      Cities,
      HotelFilter
    }
  }
</script>

<style lang="less" scoped>
  .search-list {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3.5rem;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    font-size: 0.7rem;
    overflow: scroll;
    .search-item {
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
  }
  .clear-input {
    height: 1rem;
    width: 1rem;
    position: absolute;
    right: 0.2rem;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: url(/static/images/visa/icon-close.png);
    background-size: 11px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .icon-pulldown {
    background: url(/static/images/hotel/pulldown.png) no-repeat center;
    background-size: contain;
    width: 0.45rem;
    height: 0.45rem;
    position: absolute;
  }
  .icon-search {
    background: url(/static/images/hotel/search.png) no-repeat center;
    background-size: contain;
    width: 1rem;
    height: 1rem;
    position: absolute;
  }
  .icon-position {
    background: url(/static/images/hotel/location.png) no-repeat center;
    background-size: contain;
    width: 0.8rem;
    height: 0.8rem;
  }
  .icon-filter {
    background: url(/static/images/hotel/screenout.png) no-repeat center;
    background-size: contain;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
  }
  .icon-wifi {
    background: url(/static/images/hotel/wifi.png) no-repeat center;
    background-size: contain;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
  }
  .icon-swim {
    background: url(/static/images/hotel/swim.png) no-repeat center;
    background-size: contain;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
  }
  .icon-park {
    background: url(/static/images/hotel/park.png) no-repeat center;
    background-size: contain;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
  }
  .icon-heart {
    background: url(/static/images/hotel/uncollect.png) no-repeat center;
    background-size: contain;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    &.on {
      background-image: url(/static/images/hotel/collect.png);
    }
  }
  .search-bar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0.7rem 0.5rem 0.9rem;
    background: url(/static/images/hotel/searchbg.png) no-repeat center;
    background-size: cover;
    .date-wrapper, .input-wrapper, .position-wrapper {
      text-align: center;
    }
    .date-wrapper {
      position: relative;
      background-color: #fff;
      padding: 0.15rem 0.3rem;
      padding-right: 0.7rem;
      border-radius: 0.2rem;
      margin-right: 0.3rem;
      p {
        font-size: 0.6rem;
        line-height: 0.8rem;
        color: #666;
      }
      .icon-pulldown {
        right: 0.1rem;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .input-wrapper {
      position: relative;
      flex: 1;
      padding: 0.15rem 0.1rem;
      padding-left: 1.5rem;
      margin-right: 0.3rem;
      border-radius: 0.2rem;
      background-color: #fff;
      input {
        display: block;
        width: 100%;
        font-size: 0.7rem;
        border: none;
        line-height: 1.6rem;
      }
      .icon-search {
        left: 0.3rem;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .position-wrapper {
      .icon-position {
        margin: auto;
        display: block;
        height: 1.05rem;
      }
      p {
        display: block;
        font-size: 0.6rem;
        line-height: 0.8rem;
        color: #fff;
      }
    }
  }
  .filter-bar {
    position: fixed;
    display: flex;
    background-color: #fff;
    border-bottom: 0.05rem solid #eee;
    padding-top: 3.5rem;
    width: 100%;
    box-sizing: border-box;
    .filter-btn {
      position: relative;
      flex: 1;
      line-height: 1;
      text-align: center;
      padding: 0.7rem 0;
      font-size: 0.8rem;
      .icon-pulldown {
        top: 0;
        bottom: 0;
        margin: auto;
        margin-left: 0.2rem;
      }
    }
  }
  .item-list {
    padding-top: 5.7rem;
  }
  .hotel-item {
    display: flex;
    background-color: #fff;
    padding: 0.5rem;
    border-bottom: 0.05rem solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .hotel-pic {
      flex-basis: 30%;
      height: 4.2rem;
      margin-right: 0.3rem;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    .hotel-info {
      flex-basis: 55%;
      overflow: hidden;
      .cname {
        font-size: 0.8rem;
        line-height: 1;
        margin-bottom: 0.1rem;
      }
      .ename {
        font-size: 0.6rem;
        color: #666;
      }
      .diamon-level {
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        font-size: 0.6rem;
        line-height: 1;
        .icon-diamond {
          background: url(/static/images/hotel/diamond.png) no-repeat center;
          background-size: contain;
          display: inline-block;
          line-height: 1;
          width: 0.6rem;
          height: 0.55rem;
        }
      }
      .service {
        height: 0.8rem;
        font-size: 0;
        i {
          margin-right: 0.2rem;
        }
      }
    }
    .hotel-price {
      flex-basis: 30%;
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-end;
      .collect {
        margin-bottom: 0.2rem;
        p {
          font-size: 0.6rem;
          color: #666;
        }
      }
      .price {
        p, span {
          color: #D44B00;
        }
        p {
          font-size: 1.1rem;
        }
        .yuan {
          font-size: 0.8rem;
        }
      }
    }
  }
  .loading-text {
    text-align: center;
    line-height: 2rem;
  }
</style>
