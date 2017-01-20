<template>
  <div class="hotel-list">
    <div class="search-bar">
      <div class="date-wrapper">
        <p>住06-18</p>
        <p>离06-24</p>
        <i class="icon-pulldown"></i>
      </div>
      <div class="input-wrapper">
        <i class="icon-search"></i>
        <input type="text" name="" value="" placeholder="输入城市">
      </div>
      <div class="position-wrapper">
        <i class="icon-position"></i>
        <p>定位</p>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-btn">
        途经推荐
        <i class="icon-pulldown"></i>
      </span>
      <span class="filter-btn">
        价格
        <i class="icon-pulldown"></i>
      </span>
      <span class="filter-btn">
        钻级
        <i class="icon-pulldown"></i>
      </span>
      <span class="filter-btn">
        <i class="icon-filter"></i>
        筛选
      </span>
    </div>
    <div class="item-list">
      <router-link v-for="item in hotelList"
        class="hotel-item"
        :to="'/hotelDetail/' + item.id">
        <div class="hotel-pic">
          <img :src="item.web_img" :alt="item.cname">
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
            ></i>
            <p>{{ (item.collect ? "已" : "未") + "收藏" }}</p>
          </div>
          <div class="price">
            <p><span class="yuan">¥</span>{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        facilityList: [
          "wifi", "park", "swim"
        ],
        hotelList: []
      };
    },
    created () {
      {
        this.getList();
      }
    },
    methods: {
      getList (obj) {
        Indicator.open('拼命读取酒店数据中...');
        let url = '/api/hotel/list';
        this.$http.get(url).then((response) => {
          // success callback
          console.log(JSON.parse(response.body));
          let data = JSON.parse(response.body).data;
          this.hotelList = data.rows;
          Indicator.close();
        }, (response) => {
          // error callback
          Indicator.close();
        });
      }
    }
  }
</script>

<style lang="less" scoped>
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
        font-size: 0.8rem;
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
    display: flex;
    background-color: #fff;
    border-bottom: 0.05rem solid #eee;
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
</style>
