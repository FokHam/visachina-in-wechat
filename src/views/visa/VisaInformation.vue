<template>  
<div class="visa-information" id="visa-information">
  <div class="column" v-for="item in materialsData.list">
    <div class="title">{{item.name_ca}}</div>
    <ul class="list">
      <li v-for="cate in item.cate">
        <div class="tit">{{cate.name}}</div>
        <div class="con">
          <p>{{cate.description}}</p>
        </div>
        <!--<div class="example">
          <span v-for="files in cate.files" @click="checkPic">{{files}}</span>
        </div>-->
      </li>      
    </ul>
  </div>
  <div class="example-dialog" v-show="exampleDis">
    <div class="backshadow" @click="closePic"></div>
    <div class="picshow">
      <div class="tit">{{picTxt}}</div>
      <div class="photo"><img :src="picUrl"></div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  name: 'visa-information',
  created: function () {
    document.body.scrollTop = 0
    document.title = this.materialsData.guest_class_name    
  },
  data:function(){
    return{
      materialsData:this.materialsData,
      exampleDis:false,
      picTxt:'法国签证申请表样本',
      picUrl:'/static/images/visa/a1.png'
    }
  },
  methods:{    
    checkPic:function(){
      this.exampleDis = true
    },
    closePic:function(){
      this.exampleDis = false
    }
    
  },
  computed: {
    materialsData () {
      return this.$store.state.visa.materialsData;
    }    
  }
}
</script>

<style lang="less" scoped>
.visa-information{
  .column{
    padding:0 10px;
    background-color: #fff;
    margin-bottom: 15px;
    border-bottom: 1px solid #C0C0C0;
    .title{
      font-size: 0.7rem;color: #fff;display: inline-block;margin: 15px 0 10px;
      background-color: #008BE4;border-radius: 3px;padding: 8px 24px;
    }
    .list{
        li{
          padding-bottom: 10px;
          .tit{
            font-size: 0.7rem;padding-left: 5px;border-left: 2px solid #008BE4;
            margin-bottom: 10px;
          }
          .con{
            margin-bottom: 5px;
            p{font-size: 0.6rem;color: #666666;margin-bottom: 3px;}
          }
          .example{
            margin-bottom: 5px;
            span{
              display: inline-block;font-size: 0.6rem;
              border:1px solid #008BE4;color: #008BE4;
              padding: 5px 15px;margin-right: 5px;border-radius: 2px;
            }
          }
        }
      }



    &:last-child{margin-bottom: 0;}
  }
  .example-dialog{
    position: fixed;height: 100%;width: 100%;top: 0;left: 0;
    .backshadow{
      position: absolute;height: 100%;width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      top: 0;left: 0;
    }
    .picshow{
      position: absolute;
      z-index: 99;width: 100%;
      height: 250px;top: 50%;margin-top: -125px;left: 0;
      .tit{
        color: #fff;text-align: center;font-size: 0.7rem;line-height: 30px;
      }
      .photo{
        height: 220px;text-align: center;background-color: #fff;
        img{height: 220px;width: auto;}
      }
    }
  }
}
</style>