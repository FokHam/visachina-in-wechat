<template>
  <div class="content" @click="showAge = 0">
    <div class="content-title">
      <span class="title">保障权益及产品详情</span>
      <router-link :to="'/insuranceSpecific/' + $route.params.id">
        <span class="enter">查看更多 <i class="icon-arrow-right"></i></span>
      </router-link>
    </div>
    <ul class="right-list"
      v-if="isrDetail">
      <li class="right clearfix"
        v-for="plan in isrDetail.plans[0].data"
        v-if="plan">
        <span class="name">{{ plan.name }}</span>
        <span class="amount">{{ plan.texts }}</span>
      </li>
    </ul>
    <div v-if="withAge" class="age">
      <span class="title">承保年龄</span>
      <span class="value"
        @click.stop="showAge = 1;">
        {{ isrDetail.age ? isrDetail.age[ageSelect].name : "" }}
        <i class="icon-arrow-down"></i>
      </span>
      <ul v-if="showAge === 1" class="age-list">
        <li v-for="(age, index) in isrDetail.age"
          :class="{ active: ageSelect === index }"
          @click="changeAge(index)">
          {{ age.name }}
        </li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      "isrDetail",
      "withAge",
      "ageSelect"
    ],
    data: function () {
      return {
        showAge: 0
      };
    },
    methods: {
      changeAge (n) {
        this.$emit("changeAge", n);
      }
    }
  }
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
  .content {
    .icon-arrow-right {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(/static/images/insurance/arrow-r.png) center no-repeat;
      background-size: contain;
    }
    .icon-arrow-down {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(/static/images/insurance/arrow-d.png) center no-repeat;
      background-size: contain;
    }
    margin-top: 0.5rem;
    background-color: #fff;
    padding: 0 0.6rem;
    .content-title {
      position: relative;
      .title {
        font-size: 0.7rem;
        line-height: 2rem;
      }
      .enter {
        float: right;
        line-height: 2rem;
        color: #666;
      }
    }
    .right-list {
      padding-bottom: 0.5rem;
      .right {
        span {
          color: #666;
        }
        line-height: 1.4rem;
        .name {
          float: left;
          padding-left: 1.1rem;
          background: url("/static/images/insurance/right-logo.png") center left no-repeat;
          background-size: 0.8rem 0.8rem;
        }
        .amount {
          float: right;
          margin-right: 0.5rem;
        }
      }
    }
    .age {
      border-top: 1px solid #eee;
      .title {
        font-size: 0.7rem;
        line-height: 2rem;
      }
      .value {
        float: right;
        line-height: 2rem;
        color: #666;
      }
      .age-list {
        position: absolute;
        z-index: 10;
        right: 0;
        font-size: 0.7rem;
        background: #fff;
        border: 0.05rem solid #eee;
        border-radius: 0.2rem;
        li {
          padding: 0.4rem 1.5rem;
          text-align: center;
          &.active {
            color: #008ce4;
            border-left: 0.2rem solid #008ce4;
          }
        }
      }
    }
  }
</style>
