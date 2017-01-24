<template>
<div class="search-page">
  <div class="topipt">
    <div class="layer">
      <div class="ipt">
        <input type="text" placeholder="你想去哪儿？" v-model="keyword">
        <div class="clearinput" @click="clearinput" v-show="keyword!=''"></div>
      </div>
      <div class="cancel" @click="closePage">取消</div>
    </div>
  </div>
  <div class="searchresult" v-show="keyword != ''">
    <ul v-show="searchdata.length != 0">
      <li v-for="item in searchdata" @click="choseCity(item.name)">{{item.name}}</li>      
    </ul>
    <div class="backshadow" :class="{white:searchdata.length != 0}" @touchmove="stopscroll"></div>
  </div>
  <div class="country-list" v-show="searchdata.length == 0">
    <div class="wordsrecord">
      <div class="item history" v-if="historylist.length!=0">
        <div class="tit">历史搜索</div>
        <div class="namelist">
          <ul>
            <li v-for="item in historylist" @click="choseCity(item.name)"><span>{{item.name}}</span></li>
          </ul>
        </div>
      </div>
      <div class="item hot">
        <div class="tit">热门搜索</div>
        <div class="namelist">
          <ul>
            <li v-for="item in hotcities" @click="choseCity(item.name)"><span>{{item.name}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    if (localStorage.hotelHistory) {
      this.historylist = JSON.parse(localStorage.hotelHistory)
    }
    this.getCountryList();
  },
  data:function(){
    return{
      keyword:'',
      searchdata:[],
      hotcities:{},
      historylist:[]
    }
  },
  methods:{
    getCountryList:function(){
      var url = '/api/hotel/hot-city'
      this.$http.get(url).then(function(result){        
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.hotcities = rst.data
        }else {
          console.log(rst.msg)
        }
      }, function(result){
        console.log("请求失败")
      });
    },
    keywordsChange:function(v){
      if (v != '') {
        var url = '/api/hotel/search-city',send={"keyword":v}
        this.$http.get(url,{params:send}).then(function(result){
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            if (rst.data) {
              this.searchdata = rst.data.rows
            }else{
              this.searchdata = []
            }            
          }else {
            console.log(rst.msg)
          }
        });
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
    choseCity:function(n){
      this.setHistory(n)
      this.$emit('choseCity',n)
    },
    setHistory:function(c){
      var new_rec = {"name":c}
      if (!new RegExp(c).test(localStorage.hotelHistory)) {
        if(localStorage.hotelHistory){
          var hisObj = JSON.parse(localStorage.hotelHistory)
          hisObj.unshift(new_rec)
          localStorage.hotelHistory = JSON.stringify(hisObj.slice(0,4))
        }else {
          localStorage.hotelHistory = JSON.stringify([new_rec])
        }
        this.historylist = JSON.stringify(localStorage.hotelHistory)
      }      
    },
    stopscroll:function(e){
      e.preventDefault() 
    }
  },
  watch:{
    keyword: function (val, oldVal) {
      this.keywordsChange(val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-page{
  background: #ececec;
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
  .country-list{
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
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    overflow-y: scroll;
    overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
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
      &.white{
        background-color: #fff;
      }
    }

  }
}
</style>
