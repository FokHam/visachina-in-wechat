<template>
<div class="user-collect" id="user-collect">
  <div class="toppart">
    <div class="userinfo">
      <div class="pic"><img :src="userInfo.wx_head_img"></div>
      <div class="name">{{userInfo.wx_name}}</div>
    </div>
    <div class="showtype" @click="typedis=true">{{screening}}</div>
  </div>
  <div class="listpart">
    <div class="item" v-show="screening=='全部'||screening=='签证'">
      <div class="tit">签证</div>
      <div class="list" v-if="pageData.visa.length > 0">
        <ul>
          <li v-for="item in pageData.visa">
            <router-link :to="'/visaDetail/'+item.products"></router-link>
            <div class="pic">
              <img :src="'/static/images/visa/type'+item.type+'.png'" onerror="javascript:this.src='/static/images/visa/defaultpic.png';">
            </div>              
            <div class="name">{{item.name}}</div>              
            <div class="funcbtn" @click="unCollect('visa',item.products)"></div>
            <div class="price">￥{{item.price}}</div>            
          </li>
        </ul>
      </div>
      <div class="empty" v-else>
        暂无相关收藏
      </div>
    </div>

    <div class="item" v-show="screening=='全部'||screening=='酒店'">
      <div class="tit">酒店</div>
      <div class="list" v-if="pageData.hotel.length > 0">
        <ul>         
          <li v-for="item in pageData.hotel">
            <router-link :to="'/hotelDetail/'+item.products"></router-link>
            <div class="pic">
              <img :src="item.image">
            </div>              
            <div class="name">{{item.name}}<span></span></div>              
            <div class="funcbtn" @click="unCollect('hotel',item.products)"></div>
            <div class="price">￥{{item.price}}</div>            
          </li>
        </ul>
      </div>
      <div class="empty" v-else>
        暂无相关收藏
      </div>
    </div>

    <div class="item" v-show="screening=='全部'||screening=='WIFI'">
      <div class="tit">WIFI</div>
      <div class="list" v-if="pageData.wifi.length > 0">
        <ul>
          <li v-for="item in pageData.wifi">
            <router-link :to="'/wifiDetail/'+item.products+'/'+item.attrs"></router-link>
            <div class="pic">
              <img :src="item.image">
            </div>
            <div class="name">{{item.name}}{{'（'+item.city_name+'取还）'}}</div>
            <div class="funcbtn" @click="unCollect('wifi',item.products,item.attrs)"></div>
            <div class="price">￥{{item.price}}</div>            
          </li>          
        </ul>
      </div>
      <div class="empty" v-else>
        暂无相关收藏
      </div>
    </div>
    <div class="item" v-show="screening=='全部'||screening=='保险'">
      <div class="tit">保险</div>
      <div class="list" v-if="pageData.insur.length > 0">
        <ul>
          <li v-for="item in pageData.insur">
            <router-link :to="'/insuranceDetail/'+item.products"></router-link>
              <div class="pic">
                <img :src="item.image" style="height:100%;width:auto;">
              </div>              
              <div class="name">{{item.name}}</div>
              <div class="funcbtn" @click="unCollect('insurance',item.products)"></div>
              <div class="price">￥{{item.price}}</div>
          </li>          
        </ul>
      </div>
      <div class="empty" v-else>
        暂无相关收藏
      </div>
    </div>
  </div>
  <picker
  v-if="typedis"
  :listdata="typelist"
  @confirm="visatypeSet"
  @close="typedis=false">
  </picker>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import Picker from '../../components/Picker'
export default{
  name:'user-collect',
  beforeCreate(){
    document.title = '我的收藏'
  },
  created: function () {
    this.getData('visa')
    this.getData('hotel')
    this.getData('wifi')
    this.getData('insurance')
  },
  data:function(){
    return{
      userInfo:JSON.parse(localStorage.userInfo),
      screening:'全部',
      typedis:false,
      typelist: ['全部','签证','酒店','WIFI','保险'],
      pageData:{
        "visa":[],
        "hotel":[],
        "wifi":[],
        "insur":[]
      }
    }
  },
  methods:{
    getData:function(type){
      var url = '/api/member/collect?type=' + type
      this.$http.get(url).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          var d = []
          if (rst.data) {
            d = rst.data
          }
          switch (type) {
            case 'visa':
            this.pageData.visa = d
            break;
            case 'hotel':
            this.pageData.hotel = d
            break;
            case 'wifi':
            this.pageData.wifi = d
            break;
            case 'insurance':
            this.pageData.insur = d
            break;             
          }          
        }else {
          console.log(rst.msg)
        }
      });
    },
    unCollect:function(type,id,area){
      var url = '/api/member/collect_create',send = {type:type,product_id:id}
      if (type == 'wifi') {
        send.attrs = area
      }      
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          Toast('移除收藏成功')
          this.getData(type)
        }else {
          console.log(rst.msg)
        }
      });
    },
    visatypeSet:function(v){
      this.typedis = false
      this.screening = v
    },
  },
  components: {
    Picker
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
            a{
              display: block;
              height: 100%;
              position: absolute;
              width: 100%;
              z-index: 1;
              top: 0;
              left: -2rem;
            }
            .pic{
              position: absolute;top: 10px;left: 10px;
              height: 3.5rem;width: 5rem;
              overflow:hidden;
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
      .empty {
        background-color: #fff;
        text-align: center;
        font-size: 0.7rem;
        color: #ccc;
        line-height: 3.5rem;
      }
    }
  }
  .mint-popup-bottom{width: 100%;}
  .closepop{
    font-size: 0.7rem;line-height: 1.5rem;border-bottom: 1px solid #ccc;
    padding: 0 0.5rem;color: #008BE4;text-align: right;
  }
}
</style>