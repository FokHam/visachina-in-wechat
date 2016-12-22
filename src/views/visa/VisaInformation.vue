<template>  
<div class="visa-information" id="visa-information">
  <div class="column">
    <div class="title">个人基本资料</div>
    <ul class="list">
      <li>
        <div class="tit">签证申请表</div>
        <div class="con">
          <p>1.真实完整填写（出行时间真实，填写的联系电话需保持畅通）
并由本人中文签字 。</p>
        </div>
        <div class="example"><span @click="checkPic">法国-签证申请表.doc</span><span @click="checkPic">签证申请表.doc</span></div>
      </li>
      <li>
        <div class="tit">因私护照原件</div>
        <div class="con">
          <p>1.护照完整无破损、无水渍 ；</p>
          <p>2.有效期离出发日期应至少还有6个月 ;</p>
          <p>3.至少有两页完整连续的空白页，不包含备注页 ;</p>
          <p>4.护照号码是G开头的，请在尾页签名 ;</p>
          <p>5.有旧护照请提供 。</p>
        </div>
        <div class="example"><span @click="checkPic">护照原件复印.doc</span></div>
      </li>
    </ul>
  </div>
  <div class="column">
    <div class="title">公司资料</div>
    <ul class="list">
      <li>
        <div class="tit">签证申请表</div>
        <div class="con">
          <p>1.真实完整填写（出行时间真实，填写的联系电话需保持畅通）
并由本人中文签字 。</p>
        </div>
        <div class="example"></div>
      </li>
      <li>
        <div class="tit">因私护照原件</div>
        <div class="con">
          <p>1.护照完整无破损、无水渍 ；</p>
          <p>2.有效期离出发日期应至少还有6个月 ;</p>
          <p>3.至少有两页完整连续的空白页，不包含备注页 ;</p>
          <p>4.护照号码是G开头的，请在尾页签名 ;</p>
          <p>5.有旧护照请提供 。</p>
        </div>
        <div class="example"><span @click="checkPic">护照原件复印.doc</span></div>
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
import { Indicator } from 'mint-ui'
export default{
  name: 'visa-information',
  beforeCreate:function(){
    document.title = "签证资料"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();
    
  },
  data:function(){
    return{
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