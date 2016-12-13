<template>
  <div class="hot-list-wrapper">
    <p class="hot-title"><i class="icon-hot"></i> 热销推荐</p>
    <ul class="hot-list">
      <router-link :to="'/insuranceDetail/' + item.id" v-for="item in list">
        <li class="hot-item clearfix">
          <img :src="item.imgPath" alt="热销推荐产品图">
          <div class="item-detail">
            <p class="title">{{ item.name }}</p>
            <span class="price">{{ '¥' + item.price }}</span>
            <span class="spec" v-for="detail in item.detail">{{ detail }}</span>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import Mock from "mockjs"

  export default {
    data: function () {
      var obj = Mock.mock({
        "list": [
          {
            "name": "惠择 - 申根国专属保障计划",
            "price": "19",
            "id": "1105",
            "detail": ["身故残疾", "交通意外", "恭喜发财"],
            "imgPath": "/static/images/insurance/hot2.png"
          }, {
            "name": "惠择 - 申根国专属保障计划",
            "price": "138",
            "id": "1101",
            "detail": ["身故残疾", "交通意外", "恭喜发财"],
            "imgPath": "/static/images/insurance/hot1.png"
          }, {
            "name": "惠择 - 申根国专属保障计划",
            "price": "219",
            "id": "1106",
            "detail": ["身故残疾", "交通意外", "恭喜发财"],
            "imgPath": "/static/images/insurance/hot3.jpg"
          }
        ]
      });
      return obj;
    }
  }
</script>

<style lang="less" scoped>
  .hot-list-wrapper {
    padding: 0 0.6rem;
  }
  .hot-title {
    color: #FC4949;
    font-size: 0.8rem;
    margin: 0.7rem 0;
  }
  .hot-item {
    margin-bottom: 1rem;
    img {
      border-radius: 0.25rem;
      max-height: 7.5rem;
    }
  }
  .item-detail {
    position: relative;
    .title {
      font-size: 0.8rem;
      margin: 0.4rem 0;
    }
    .spec {
      font-size: 0.6rem;
      color: #666;
      float: left;
      &:after {
        content: "|";
        display: inline-block;
        vertical-align: top;
        margin-left: 0.4rem;
        margin-right: 0.4rem;
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
    .price {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      color: #FC4949;
      font-size: 1rem;
    }
  }
  .icon-hot {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url(/static/images/insurance/hot.png) no-repeat center;
    background-size: contain;
    vertical-align: text-bottom;
  }
</style>
