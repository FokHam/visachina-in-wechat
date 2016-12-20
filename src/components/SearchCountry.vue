<template>
<div v-if="isShow" class="search-page">
  <div class="topipt">
    <div class="layer">
      <div class="ipt">
        <input type="text" placeholder="你想去哪儿？" @keyup="keywordsChange()" v-model="keyword">
        <div class="clearinput" @click="clearinput" v-show="keyword!=''"></div>
      </div>
      <div class="cancel" @click="closePage">取消</div>
    </div>
  </div>
  <div class="searchresult" v-show="searchdata.length != 0">
    <ul>
      <li v-for="item in searchdata">{{item.name}}</li>      
    </ul>
    <div class="backshadow" @click="clearinput"></div>
  </div>
  <div class="wordsrecord">
    <div class="item history">
      <div class="tit">历史搜索</div>
      <div class="namelist">
        <ul>
          <li @click="choseCountry('新西兰')"><span>新西兰</span></li>
          <li @click="choseCountry('希腊')"><span>希腊</span></li>
          <li @click="choseCountry('意大利')"><span>意大利</span></li>
          <li @click="choseCountry('土耳其')"><span>土耳其</span></li>
        </ul>
      </div>
    </div>
    <div class="item hot">
      <div class="tit">热门搜索</div>
      <div class="namelist">
        <ul>
          <li><span>马耳他</span></li>
          <li><span>美国</span></li>
          <li><span>加拿大</span></li>
          <li><span>马来西亚</span></li>
          <li><span>乌兹别克斯坦</span></li>
          <li><span>希腊</span></li>
          <li><span>意大利</span></li>
          <li><span>埃塞俄比亚</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="countrylist">
    <div class="item">
      <div class="tit">亚洲</div>
      <div class="namelist">
        <ul>
          <li><span>中国</span></li>
          <li><span>日本</span></li>
          <li><span>韩国</span></li>
          <li><span>朝鲜</span></li>
          <li><span>泰国</span></li>
          <li><span>印度</span></li>
          <li><span>巴基斯坦</span></li>
          <li><span>新加坡</span></li>
          <li><span>菲律宾</span></li>
          <li><span>老挝</span></li>
          <li><span>哈萨克斯坦</span></li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">欧洲</div>
      <div class="namelist">
        <ul>
          <li><span>英国</span></li>
          <li><span>德国</span></li>
          <li><span>意大利</span></li>
          <li><span>保加利亚</span></li>
          <li><span>丹麦</span></li>
          <li><span>葡萄牙</span></li>
          <li><span>法国</span></li>
          <li><span>罗马尼亚</span></li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">北美洲</div>
      <div class="namelist">
        <ul>
          <li><span>英国</span></li>
          <li><span>德国</span></li>
          <li><span>意大利</span></li>
          <li><span>保加利亚</span></li>
          <li><span>丹麦</span></li>
          <li><span>葡萄牙</span></li>
          <li><span>法国</span></li>
          <li><span>罗马尼亚</span></li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">南美洲</div>
      <div class="namelist">
        <ul>
          <li><span>英国</span></li>
          <li><span>德国</span></li>
          <li><span>意大利</span></li>
          <li><span>保加利亚</span></li>
          <li><span>丹麦</span></li>
          <li><span>葡萄牙</span></li>
          <li><span>法国</span></li>
          <li><span>罗马尼亚</span></li>
        </ul>
      </div>
    </div>
    
  </div>

  


</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {  
  props:['isShow'],
  beforeCreate(){
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();
  },
  data:function(){
    return{
      keyword:'',
      searchdata:[]
      

    }
  },
  methods:{
    keywordsChange:function(){
      if (this.keyword != '') {
        console.log(this.keyword)
        this.searchdata = [{"name":"中国"},{"name":"美国"},{"name":"德国"},{"name":"澳大利亚"},{"name":"西班牙"},{"name":"巴基斯坦"},{"name":"泰国"}]
      }else {
        this.searchdata = []
      }      
    },
    clearinput:function(){
      this.keyword = ''
      this.searchdata = []
    },
    closePage:function(){
      this.$emit('closePage')
    },
    choseCountry:function(name){
      this.$emit('choseCountry',name)
    }
  }
}
</script>

<style lang="less" scoped>
.search-page{
  position: fixed;
  height: 100%;width: 100%;top: 0;left: 0;background: #ececec;
  z-index: 999;
  overflow-y:scroll;
  overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
  .topipt{
    position: fixed;top: 0;left: 0;width: 100%;z-index: 999;
    .layer{
      position: relative;
      padding: 10px 48px 10px 10px;
      background-image: url('/static/images/visa/searchbg.png');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      .ipt{
        position: relative;
        input{
          height: 28px;line-height: 28px;
          border-radius: 4px;border: 1px solid #BFBFBF;
          width: 100%;font-size: 0.6rem;
          background-image: url('/static/images/visa/icon-search.png');
          background-size: 22px;
          background-position: 8px center;
          background-repeat: no-repeat;
          text-indent: 35px;
        }
        .clearinput{
          height: 20px;
          width: 20px;          
          position: absolute;
          right: 5px;
          top: 5px;
          background-image: url('/static/images/visa/icon-close.png');
          background-size: 11px;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
      .cancel{
        position: absolute;
        color: #fff;right: 10px;top: 10px;
        font-size: 0.7rem;line-height: 28px;
      }
    }
  }
  .wordsrecord{margin-bottom: 10px;padding-top: 60px !important;}
  .wordsrecord,.countrylist{
    background-color: #fff;
    padding: 10px 5px;
    .item{
      padding-bottom: 15px;
      .tit{color: #999999;font-size: 0.7rem;padding: 0 5px;padding-bottom: 8px;}
      .namelist{
        overflow: hidden;        
        li{
          float: left;
          width: 25%;
          overflow: hidden;
          padding-bottom: 6px;
          span{
            font-size: 0.6rem;
            margin: 0 5px;
            display: block;
            border: 1px solid #666666;
            border-radius: 4px;
            text-align: center;
            height: 25px;line-height: 25px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
  .searchresult {
    position: absolute;    
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ul {
      background: #fff;
      padding: 50px 10px 0 10px;
      position: relative;
      z-index: 99;
      li {
        font-size: 0.7rem;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #dddddd;
        text-indent: 10px;
        &:last-child{
          border-bottom: none;
        }
      }
    }
    .backshadow{
      position: absolute;height: 100%;width: 100%;
      left: 0;top: 0;background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>