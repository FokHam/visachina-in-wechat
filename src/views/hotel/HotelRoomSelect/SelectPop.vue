<template>
  <div class="mask"
    @click="hide">
    <div class="select-pop">
      <p class="title">
        {{ popTitle.title }}
        <span>（{{ popTitle.detail }}）</span>
      </p>
      <div class="item-wrap">
        <p class="item"
          v-if="type === 'room'"
          v-for="n in roomMax"
          @click="changeNum(n)">
          {{ n + "间" }}
          <i class="icon-tick"
            :class="{ on: n === roomNum }"
          ></i>
        </p>
        <p class="item"
          v-if="type === 'adult'"
          v-for="n in adultMax"
          @click="changeNum(n)">
          {{ n + "人" }}
          <i class="icon-tick"
            :class="{ on: n === adultNum }"
          ></i>
        </p>
        <p class="item"
          v-if="type === 'child'"
          @click="changeNum(0)">0人<i class="icon-tick":class="{ on: 0  === childNum }"></i></p>
        <p class="item"
          v-if="type === 'child'"
          v-for="n in childMax"
          @click="changeNum(n)">
          {{ n + "人" }}
          <i class="icon-tick"
            :class="{ on: n  === childNum }"
          ></i>
        </p>
        <p class="item"
          v-if="type === 'childAge'"
          v-for="n in childAgeMax"
          @click="changeAge(n - 1)">
          {{ ((n - 1) === 0 ? "小于1" : n - 1) + "岁" }}
          <i class="icon-tick"
            :class="{ on: (n - 1)  === childAge[index] }"
          ></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: String,
      index: Number
    },
    data () {
      return {
        adultMax: 6,
        childMax: 4,
        childAgeMax: 18,
        roomMax: 8
      }
    },
    computed: {
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
      popTitle () {
        let type = this.type;
        switch (type) {
          case ("room"):
            return {
              title: "房间数",
              detail: "最多可选" + this.roomMax + "间"
            };
          case ("adult"):
            return {
              title: "成人数",
              detail: "每间最多" + this.adultMax + "成人"
            };
          case ("child"):
            return {
              title: "儿童数",
              detail: "每间最多" + this.childMax + "儿童"
            };
          case ("childAge"):
            return {
              title: "儿童年龄",
              detail: "请选择儿童年龄"
            }
        }
      }
    },
    methods: {
      changeNum (n) {
        this.$store.commit("setNum", {
          type: this.type + "Num",
          num: n
        });
      },
      changeAge (age) {
        this.$store.commit("setChildAge", {
          age: age,
          index: this.index
        });
      },
      hide () {
        this.$emit("hide");
      }
    }
  }
</script>

<style lang="less" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .select-pop {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.5rem;
    max-height: 10rem;
    overflow: scroll;
    .title {
      position: fixed;
      width: 100%;
      background-color: #fff;
      font-size: 0.8rem;
      line-height: 1;
      margin-right: -0.5rem;
      padding: 0.8rem 0;
      border-bottom: #eee solid 0.05rem;
      span {
        color: #666;
      }
    }
    .item-wrap {
      margin-top: 3.1rem;
    }
    .item {
      font-size: 0.8rem;
      line-height: 0.9rem;
      margin: 0.8rem 0;
      .icon-tick {
        float: right;
        width: 0.9rem;
        height: 0.9rem;
        background: url(/static/images/hotel/tick-off.png) no-repeat center;
        background-size: contain;
        &.on {
          background-image: url(/static/images/hotel/tick-on.png);
        }
      }
    }
  }
</style>
