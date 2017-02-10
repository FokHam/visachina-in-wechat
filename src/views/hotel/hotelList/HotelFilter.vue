<template lang="html">
  <div class="hotel-filter">
    <ul class="select-list">
      <li class="select-item"
        v-for="item in selectType"
        @click="selectItem(item)">
        {{ item.name }}
      </li>
    </ul>
    <div class="mask"
      @touchmove.prevent
      @click="close">
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      "filtType"
    ],
    data () {
      return {
        priceList: [
          {
            name: "不限价格",
            key: ""
          },{
            name: "200元以下",
            key: "0-200"
          },{
            name: "200-500元",
            key: "200-500"
          },{
            name: "500-1000元",
            key: "500-1000"
          },{
            name: "1000-1500元",
            key: "1000-1500"
          },{
            name: "1500-2000元",
            key: "1500-2000"
          }
        ],
        starList: [
          {
            name: "不限钻级",
            key: ""
          },{
            name: "经济型/青旅",
            key: 2
          },{
            name: "3钻级/舒适",
            key: 3
          },{
            name: "4钻级/高档",
            key: 4
          },{
            name: "5钻级/豪华",
            key: 5
          }
        ]
      }
    },
    methods: {
      close () {
        this.$emit("close");
      },
      selectItem (obj) {
        this.$store.commit("setHotelFilt", {
          type: this.filtType,
          data: obj
        });
        this.$emit("close");
      }
    },
    computed: {
      hotelFiltSelected () {
        return this.$store.state.hotel.hotelFiltSelected;
      },
      selectType () {
        return this[this.filtType + "List"];
      },
      areaList () {
        return this.$store.state.hotel.hotelList.areas;
      }
    }
  }
</script>

<style lang="less" scoped>
  .hotel-filter {
    position: fixed;
    top: 5.7rem;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .select-list {
    background-color: #fff;
    overflow: scroll;
    max-height: 15rem;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    .select-item {
      background-color: #fff;
      margin: 0 0.5rem;
      padding: 0.6rem 0.5rem;
      font-size: 0.8rem;
      border-bottom: 1px solid #eee;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
