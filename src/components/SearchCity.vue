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
      var url = '/api/hotel/hotcity'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        console.log(result.body)
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
        var url = '/api/hotel/search_city',send={"keyword":v}
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
      padding: 0.5rem 2.4rem 0.5rem 0.5rem;
      background-image: url('/static/images/visa/searchbg.png');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      .ipt{
        position: relative;
        display: flex;
        input{
          height: 1.5rem;line-height: 1.5rem;
          border-radius: 0.2rem;border:none;
          width: 100%;font-size: 0.6rem;
          background-image: url('/static/images/visa/icon-search.png');
          background-size: 1.1rem;
          background-position: 0.4rem center;
          background-repeat: no-repeat;
          text-indent: 1.75rem;
        }
        .clearinput{
          height: 1.5rem;
          width: 1.5rem;
          position: absolute;
          right: 0;
          top: 0;
          background-image: url('/static/images/visa/icon-close.png');
          background-size: 0.6rem;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
      .cancel{
        position: absolute;
        color: #fff;right: 0.5rem;top: 0.5rem;
        font-size: 0.7rem;line-height: 1.5rem;
      }
    }
  }
  .country-list{
  }
  .wordsrecord{margin-bottom: 0.5rem;padding-top: 3rem !important;}
  .wordsrecord,.countrylist{
    background-color: #fff;
    padding: 0.5rem 0.25rem;
    .item{
      padding-bottom: 0.75rem;
      .tit{color: #999999;font-size: 0.7rem;padding: 0 0.25rem;padding-bottom: 0.4rem;}
      .namelist{
        overflow: hidden;
        li{
          float: left;
          width: 25%;
          overflow: hidden;
          padding-bottom: 0.3rem;
          span{
            font-size: 0.6rem;
            margin: 0 0.25rem;
            display: block;
            border: 1px solid #666666;
            border-radius: 2rem;
            text-align: center;
            height: 1.25rem;line-height: 1.25rem;
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
      padding: 2.5rem 0.5rem 0 0.5rem;
      position: relative;
      z-index: 99;
      li {
        font-size: 0.7rem;
        height: 1.5rem;
        line-height: 1.5rem;
        border-bottom: 1px solid #dddddd;
        text-indent: 0.5rem;
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
