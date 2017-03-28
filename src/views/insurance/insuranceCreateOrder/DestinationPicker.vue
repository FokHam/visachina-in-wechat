<template lang="html">
  <div class="destination-picker">
    <div class="topipt">
      <div class="layer">
        <div class="ipt">
          <input type="text" placeholder="你想去哪儿？" v-model="keyword">
          <div class="clearinput" @click="clearInput" v-show="keyword!==''"></div>
        </div>
        <div class="cancel" @click="closePage">{{ this.destinationPicked.length ? "确定" : "取消" }}</div>
      </div>
      <div class="picked-list">
        <p class="pick-title">已选目的地</p>
        <p class="pick-info"
          v-if="destinationPicked.length === 0">可选5个目的地国家</p>
        <div class="picked-country-wrap">
          <span class="picked-country"
            @click="deleteDestination(destination)"
            v-for="destination in destinationPicked">
            {{ destination }}
            <i class="delete-country"></i>
          </span>
        </div>
      </div>
    </div>
    <ul class="search-list"
      v-if="searchResult.length">
      <li class="search-item"
        v-for="country in searchResult"
        @click="searchPick(country)">
        {{ country }}
      </li>
    </ul>
    <ul class="country-list">
      <li class="country-in-letter"
        v-for="letter in destinationList">
        <p class="letter" :ref="letter.title">{{ letter.title }}</p>
        <p v-for="destination in letter.data"
          @click="addDestination(destination.name)">{{ destination.name }}</p>
      </li>
    </ul>
    <ul class="letter-list"
      @touchmove.prevent="scrollTo"
      @click.prevent="scrollTo">
      <li v-for="letter in destinationList"
        >{{ letter.title }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      let destination = this.$store.state.insurance.destination;
      return {
        keyword: "",
        destinationPicked: destination,
        searchResult: []
      }
    },
    methods: {
      addDestination (d) {
        if (this.destinationPicked.indexOf(d) === -1 && this.destinationPicked.length <= 4) {
          this.destinationPicked.push(d);
        }
      },
      clearInput () {
        this.keyword = "";
      },
      closePage () {
        this.$emit("close");
      },
      scrollTo (e) {
        let positionX;
        let positionY;
        let element;
        if (e.type === "touchmove") {
          positionX = e.changedTouches[0].clientX;
          positionY = e.changedTouches[0].clientY;
          element = document.elementFromPoint(positionX,positionY);
        } else if (e.type === "click") {
          positionX = e.x;
          positionY = e.y;
          element = document.elementFromPoint(positionX,positionY);
        }
        if (!element) {
          return false;
        }
        let letter = element.innerText;
        for (let a in this.$refs) {
          if (a === letter) {
            let tarEle = this.$refs[a][0];
            let searchBar = document.getElementsByClassName("topipt")[0];
            window.scrollTo(0, tarEle.offsetTop - searchBar.offsetHeight);
          }
        }
      },
      deleteDestination (d) {
        this.destinationPicked.splice(this.destinationPicked.indexOf(d), 1);
      },
      searchPick (d) {
        this.addDestination(d);
        this.keyword = "";
      }
    },
    computed: {
      destinationList () {
        return this.$store.state.insurance.productDetail.web_city;
      }
    },
    watch: {
      destinationPicked () {
        let tarEle = document.getElementsByClassName("destination-picker")[0];
        let searchEle = document.getElementsByClassName("topipt")[0];
        setTimeout(function () {
          tarEle.style.paddingTop = searchEle.offsetHeight + "px";
        }, 5);
        this.$store.commit("setInsuranceState", {
          type: "destination",
          data: this.destinationPicked
        });
      },
      keyword () {
        let tempArr = [];
        let key = this.keyword;
        if (key === "") {
          this.searchResult = [];
          return false;
        }
        for (let l = this.destinationList.length, i = 0; i < l; i += 1) {
          if (typeof this.destinationList[i] === "object") {
            this.destinationList[i].data.map(function (c) {
              if (c.name.indexOf(key) === 0) {
                tempArr.push(c.name);
              }
            });
          }
        }
        console.log(tempArr);
        this.searchResult = tempArr;
      }
    }
  }
</script>

<style lang="less">
  p,span,a{font-size: 0.7rem;}
  .destination-picker {
    background: #fff;
    padding-top: 6.6rem;
    .topipt{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      .layer{
        position: relative;
        padding: 0.5rem;
        padding-right: 2.5rem;
        background: url('/static/images/visa/searchbg.png') center no-repeat;
        background-size: cover;
        .ipt{
          position: relative;
          font-size: 0;
          input{
            height: 1.4rem;
            line-height: 1.4rem;
            border-radius: 0.2rem;
            border: 0.05rem solid #BFBFBF;
            width: 100%;
            font-size: 0.6rem;
            background-image: url('/static/images/visa/icon-search.png');
            background-size: 1rem;
            background-position: 0.4rem center;
            background-repeat: no-repeat;
            text-indent: 1.8rem;
          }
          .clearinput{
            height: 1rem;
            width: 1rem;
            position: absolute;
            right: 0.2rem;
            top: 0;
            bottom: 0;
            margin: auto;
            background-image: url('/static/images/visa/icon-close.png');
            background-size: 11px;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
        .cancel{
          position: absolute;
          color: #fff;
          right: 0.5rem;
          top: 0;
          bottom: 0;
          margin: auto;
          font-size: 0.7rem;
          line-height: 0.7rem;
          height: 0.7rem;
        }
      }
    }
    .search-list {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 100;
      top: 2.5rem;
      background-color: rgba(0, 0, 0, 0.3);
      .search-item {
        background: #fff;
        font-size: 0.7rem;
        padding: 0.4rem 1rem;
      }
    }
    .picked-list {
      width: 100%;
      box-sizing: border-box;
      background: #eee;
      padding: 0.5rem;
      .picked-country-wrap {
        margin: 0.2rem -0.3rem 0;
      }
      .pick-title {
        color: #666;
      }
      .pick-info {
        color: #ccc;
        text-align: center;
        padding: 0.4rem 0;
        font-size: 0.8rem;
      }
      .picked-country {
        position: relative;
        color: #999;
        background: #fff;
        padding: 0.2rem 0.3rem;
        border-radius: 0.15rem;
        margin: 0.3rem;
        display: inline-block;
      }
      .delete-country {
        position: absolute;
        right: -0.1rem;
        top: -0.1rem;
        height: 0.4rem;
        width: 0.4rem;
        background: url(/static/images/insurance/delete.png) no-repeat center;
        background-size: cover;
        border-radius: 50%;
      }
    }
    .country-in-letter {
      .letter {
        background: #f5f5f5;
        margin: 0;
        padding: 0 1rem;
      }
      p {
        margin: 0 0.5rem;
        padding-left: 0.5rem;
        line-height: 2.3rem;
        border-bottom: 1px solid #eee;
        color: #666;
      }
    }
    .letter-list {
      position: fixed;
      top: 10rem;
      right: 0.5rem;
      font-size: 0.6rem;
    }
  }
</style>
