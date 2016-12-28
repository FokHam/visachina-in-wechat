<template>
<div class="wifi-country">
  <div class="backshadow" v-show="isShow" @click="closePage"></div>
  <div class="list-bd" :class="{active:isShow}">
    <div class="inner">
      <div class="continent">
        <ul>
          <li v-for="(item,index) in listData" :class="{on:continent == index}" @click="continent=index">{{item.continent}}</li>
        </ul>
      </div>
      <div class="country_list">
        <div class="item_list" v-for="(item,index) in listData" v-show="continent == index">
          <ul>
            <li v-for="(country,index) in item.countrys" :class="{on:csCuntry == country.name}" @click="choseCountry(country.name)">{{country.name}}</li>
          </ul>
        </div>        
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {  
  props:['isShow','cname'],
  created: function () {

  },
  data:function(){
    return{
      keyword:'',
      continent:0,
      csCuntry:'',


      listData:[
        {"continent":"亚洲","countrys":[
            {"name":"中国"},{"name":"韩国"},{"name":"日本"},{"name":"巴基斯坦"},{"name":"朝鲜"},{"name":"泰国"},{"name":"印度"},{"name":"尼泊尔"},{"name":"柬埔寨"}
          ]
        },
        {"continent":"北美洲","countrys":[
            {"name":"美国"},{"name":"加拿大"},{"name":"墨西哥"}
          ]
        },
        {"continent":"南美洲","countrys":[
            {"name":"巴西"},{"name":"刚果"},{"name":"墨西哥"},{"name":"委内瑞拉"},{"name":"哥伦比亚"},{"name":"圭亚那"}
          ]
        },
        {"continent":"欧洲","countrys":[
            {"name":"英国"},{"name":"德国"},{"name":"葡萄牙"},{"name":"尼日利亚"},{"name":"朝鲜"},{"name":"罗马尼亚"},{"name":"芬兰"},{"name":"瑞典"},{"name":"挪威"},{"name":"丹麦 "},{"name":"爱沙尼亚"},{"name":"奥地利"},{"name":"瑞士"}
          ]
        },
        {"continent":"非洲","countrys":[
            {"name":"埃塞俄比亚"},{"name":"厄立特里亚"},{"name":"索马里"}
          ]
        },
        {"continent":"大洋洲","countrys":[
            {"name":"澳大利亚"},{"name":"新西兰"},{"name":"巴布亚新几内亚"},{"name":"密克罗尼西亚"}
          ]
        }

      ]
      

    }
  },
  methods:{    
    closePage:function(){
      this.$emit('closePage')
    },
    choseCountry:function(name){
      this.csCuntry = name
      this.$emit('choseCountry',name)
    }
  }
}
</script>

<style lang="less" scoped>
.wifi-country{
  
  .backshadow{
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;height: 100%;width: 100%;top: 0;
  }
  .list-bd{
    position: fixed;bottom: -280px;left: 0;
    width: 100%;height: 280px;
    background-color: #fff;
    transition: ease-in-out .3s;
    &.active{bottom: 0;}
    .inner{position: relative;width: 100%;height: 280px;}
    .continent{
      position: absolute;left: 0;top: 0;
      background-color: #f6f6f6;
      width: 110px;height: 100%;
      li{
        height: 40px;line-height: 40px;font-size: 0.7rem;
        text-indent: 10px;
        &.on{
          background-color: #fff;
          background-image: url('/static/images/wifi/icon-pot.png');
          background-position: right center;
          background-size: 16px;
          background-repeat: no-repeat;
        }
      }

    }
    .country_list{
      padding-left: 110px;height: 280px;overflow-y: scroll;padding-right: 7px;
      .item_list{
        li{
          line-height: 38px;font-size: 12px;text-indent: 20px;
          border-bottom: 1px solid #f4f4f4;
          background-image: url('/static/images/wifi/icon-unchoose.png');
          background-position: right center;
          background-size: 20px;
          background-repeat: no-repeat;
          &.on{background-image: url('/static/images/wifi/icon-choose.png');}
        }
      }
    }
  }
}
</style>