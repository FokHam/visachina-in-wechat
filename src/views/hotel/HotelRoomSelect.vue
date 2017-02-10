<template>
  <div class="room-select">
    <div class="item room-num"
      @click="doSelect('room')">
      <div class="label">
        <p>房间数量</p>
        <p class="most">最多可选8间</p>
      </div>
      <span class="detail">{{ roomNum + "间" }}</span>
      <i class="icon-pull-right"></i>
    </div>
    <div class="item">
      <span class="label">每间人数</span>
    </div>
    <div class="item"
      @click="doSelect('adult')">
      <span class="label">成人数</span>
      <span class="detail">{{ "每间" + adultNum + "人" }}<i class="icon-pull-right"></i></span>
    </div>
    <div class="item"
      @click="selecting = true; selectingType = 'child'">
      <span class="label">儿童数</span>
      <span class="detail">{{ "每间" + childNum + "人" }}<i class="icon-pull-right"></i></span>
    </div>
    <div class="item"
      v-for="(age, index) in childAge"
      @click="doSelect('childAge', index)">
      <span class="label">{{ "儿童" + (index + 1) }}</span>
      <span class="detail">{{ (age === 0 ? ("小于1") : age) + "岁" }}<i class="icon-pull-right"></i></span>
    </div>
    <p class="people-desc">最多可入住总人数为<span>{{ adultNum + "成人" + childNum + "儿童" }}</span></p>
    <router-link :to="'/hotelDetail/' + productId" class="button">确定</router-link>
    <select-pop v-if="selecting"
      :type="selectingType"
      :index="selectingIndex"
      @hide="selecting = false"
    ></select-pop>
  </div>
</template>

<script>
  import SelectPop from "./hotelRoomSelect/SelectPop";

  export default {
    data () {
      return {
        selecting: false,
        selectingType: "",
        selectingIndex: 0
      }
    },
    components: {
      SelectPop
    },
    computed: {
      adultNum () {
        return this.$store.state.hotel.adultNum;
      },
      childNum () {
        return this.$store.state.hotel.childNum;
      },
      roomNum () {
        return this.$store.state.hotel.roomNum;
      },
      childAge () {
        return this.$store.state.hotel.childAge;
      },
      productId () {
        return this.$store.state.hotel.productId;
      }
    },
    methods: {
      doSelect (type, index) {
        this.selecting = true;
        this.selectingType = type;
        this.selectingIndex = index;
      }
    }
  };
</script>

<style lang="less" scoped>
  .icon-pull-right {
    position: absolute;
    right: 0.5rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 0.6rem;
    height: 0.6rem;
    background: url(/static/images/hotel/more.png) no-repeat center;
    background-size: contain;
  }
  .item {
    display: flex;
    position: relative;
    padding: 0.7rem 0.5rem;
    border-bottom: #eee solid 0.05rem;
    background-color: #fff;
    &:last-of-type {
      border-bottom: none;
    }
    &.room-num {
      margin-bottom: 0.5rem;
      border-bottom: none;
      .most {
        margin-top: 0.1rem;
        font-size: 0.6rem;
        color: #999;
      }
      .detail {
        position: absolute;
        height: 0.7rem;
        line-height: 1;
        top: 0;
        bottom: 0;
        right: 1.3rem;
        margin: auto;
      }
    }
    .label {}
    .detail {
      flex: 1;
      text-align: right;
      margin-right: 0.8rem;
      color: #666;
    }
  }
  .people-desc {
    text-align: right;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    color: #666;
    span {
      font-size: 0.85rem;
    }
  }
  .button {
    display: block;
    margin: 1rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: #008BE4;
    text-align: center;
    color: #fff;
    border-radius: 0.25rem;
  }
</style>
