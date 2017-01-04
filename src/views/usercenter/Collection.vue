<template>
<div class="user-collect" id="user-collect">
  <div class="toppart">
    <div class="userinfo">
      <div class="pic"><img src="/static/images/usercenter/headpath.png"></div>
      <div class="name">TRAVELLER</div>
    </div>
    <div class="showtype" @click="openSelect">{{screening}}</div>
  </div>
  <div class="listpart">
    <div class="item" v-show="screening=='全部'||screening=='签证'">
      <div class="tit">签证</div>
      <div class="list">
        <ul>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic4.png">
              </div>
              <div class="name">芬兰旅游签证 <停留天数按申请，
有效期限使馆定，无需面试></div>
              <div class="funcbtn"></div>
              <div class="price">￥788</div>
            </a>
          </li>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic4.png">
              </div>
              <div class="name">芬兰旅游签证 <停留天数按申请，
有效期限使馆定，无需面试></div>
              <div class="funcbtn"></div>
              <div class="price">￥788</div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="item" v-show="screening=='全部'||screening=='酒店'">
      <div class="tit">酒店</div>
      <div class="list">
        <ul>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic1.png">
              </div>
              <div class="name">香港W酒店<span>W Hong Kong</span></div>
              <div class="funcbtn"></div>
              <div class="price">￥2788</div>
            </a>
          </li>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic1.png">
              </div>
              <div class="name">香港W酒店<span>W Hong Kong</span></div>
              <div class="funcbtn"></div>
              <div class="price">￥2788</div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="item" v-show="screening=='全部'||screening=='WIFI'">
      <div class="tit">WIFI</div>
      <div class="list">
        <ul>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic3.png">
              </div>
              <div class="name">日本旅游WIFI</div>
              <div class="funcbtn"></div>
              <div class="price">￥88</div>
            </a>
          </li>          
        </ul>
      </div>
    </div>
    <div class="item" v-show="screening=='全部'||screening=='保险'">
      <div class="tit">保险</div>
      <div class="list">
        <ul>
          <li>
            <a>
              <div class="pic">
                <img src="/static/images/usercenter/pic2.png">
              </div>
              <div class="name">“乐游全球”境外旅行保障计划 
 黄金计划</div>
              <div class="funcbtn"></div>
              <div class="price">￥108</div>
            </a>
          </li>          
        </ul>
      </div>
    </div>



  </div>
  <mt-popup
    v-model="popupVisible"
    position="bottom"
    pop-transition="popup-fade">
    <div class="closepop" @click="openSelect">完成</div>
    <mt-picker :slots="typeList" @change="onTypeChange"></mt-picker>
  </mt-popup>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name:'user-collect',
  beforeCreate(){
    document.title = '我的收藏'
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()    
  },
  components: {
    
  },
  data:function(){
    return{
      screening:'全部',
      typeList:[
        {
          values: ['全部','签证','酒店','WIFI','保险'],
          textAlign: 'center'
        }],
      popupVisible:false
      
    }
  },
  methods:{
    openSelect:function(){
      this.popupVisible = !this.popupVisible
    },
    onTypeChange:function(picker, values){
      this.screening = values.toString()
    },
  }

}
</script>

<style lang="less" scoped>
.user-collect{
  .toppart{
    background-color: #fff;padding: 10px 15px;overflow: hidden;
    .userinfo{
      overflow: hidden;float: left;
      .pic{
        height: 2rem;width: 2rem;border-radius: 2rem;overflow: hidden;float: left;
      }
      .name{
        font-size: 0.7rem;line-height: 2rem;float: left;padding-left: 5px;
      }
    }
    .showtype{
      float: right;line-height: 2rem;font-size: 0.8rem;color: #008be4;
      padding-right: 20px;background-repeat: no-repeat;
      background-position: right center;
      background-size: 10px;
      background-image: url('/static/images/usercenter/icon-drop.png');
    }
  }
  .listpart{
    .item{
      .tit{
        line-height: 1.3rem;font-size: 0.7rem;color: #999999;
        text-indent: 30px;
      }
      .list{
        background-color: #fff;
        ul{
          li{
            position: relative;padding: 10px;height: 3.5rem;
            border-bottom: 1px solid #f6f6f6;
            &:last-child{border-bottom:none;}
            .pic{
              position: absolute;top: 10px;left: 10px;
              height: 3.5rem;width: 5rem;
            }
            .name{
              padding-left: 5.5rem;padding-right:2rem;font-size: 0.7rem;
              span{
                display: block;font-size: 0.6rem;color: #666666;
              }
            }
            .funcbtn{
              position: absolute;top: 12px;right: 10px;width: 18px;height: 18px;
              background-image: url('/static/images/usercenter/icon-unfav.png');
              background-size: 15px;background-repeat: no-repeat;
              background-position: center;
            }
            .price{
              color: #ff5a00;font-size: 0.8rem;
              position: absolute;right: 10px;bottom: 10px;
            }
          }
        }
      }
    }
  }
  .mint-popup-bottom{width: 100%;}
  .closepop{
    font-size: 0.7rem;line-height: 30px;border-bottom: 1px solid #ccc;
    padding: 0 10px;color: #008BE4;text-align: right;
  }
}
</style>