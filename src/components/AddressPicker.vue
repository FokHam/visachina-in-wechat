<template>
<div class="addresscom">
  <div class="backshadow" @click="close"></div>
  <div class="addresspicker">
    <div class="confirm" @click="confirm">完成</div>
    <mt-picker ref="picker" :slots="addressSlots" :className="'address-slot'" @change="addressSlotReset"></mt-picker>
  </div>
</div>   
</template>

<script>
  import areaData from "../address.js"
  import Vue from "vue"

  export default {
    mounted () {
      this.addressSlotReset(this.$refs.picker, this.$refs.picker.getValues());
    },
    methods: {
      addressSlotReset(picker, v) {
        this.selectedAddress = v;
        let that = this;
        let getAreaId = function (i) {
          let index = picker.getSlotValues(i).indexOf(v[i]);
          return that.addressList[i][index] && that.addressList[i][index]["area_id"];
        }
        let getParentId = function (i) {
          let index = picker.getSlotValues(i).indexOf(v[i]);
          return that.addressList[i][index] && that.addressList[i][index]["parent_id"];
        }

        //判断市、区的parent_id与前一级的area_id是否一致
        for (let i = 1; i < 3; i += 1) {
          let prevAid = getAreaId(i - 1),
              thisPid = getParentId(i);
          if (thisPid !== prevAid) {
            //不一致时重新获取
            this.addressList[i] = [];
            for (let j = 0, len = areaData.data.length; j < len; j += 1) {
              if (areaData.data[j].parent_id === prevAid) {
                this.addressList[i].push(areaData.data[j]);
              }
            }
            picker.setSlotValues(i, that.addressList[i].map(function (obj) {
              return obj.name;              
            }));
          }
        }
      },
      confirm:function(){
        this.$emit('confirm',this.selectedAddress)
      },
      close:function(){
        this.$emit('close')
      }
    },
    data() {
      let pList = [];
      areaData.data.forEach(function (currentValue) {
        if (currentValue.parent_id === 40) {
          pList.push(currentValue);
        }
      });
      return {
        addressList: [
          pList, [], []
        ],
        addressSlots: [
          {
            values: pList.map(function (obj) {
              return obj.name;
            }),
            textAlign: "center",
            flex: "5%",
            className: "address-slot"
          }, {
            values: ["市"],
            textAlign: "center",
            flex: 1,
            className: "address-slot"

          }, {
            values: ["区"],
            textAlign: "center",
            flex: 1,
            className: "address-slot"
          }
        ],
        selectedAddress:[]
      };
    }
  }
</script>

<style lang="less" scoped>
  .addresscom{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
  }
  .backshadow{
    background:rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    width: 100%;height: 100%;

  }
  .addresspicker{
    position: absolute;
    bottom: 0;
    left: 0;width: 100%;
    background: #fff;
    .confirm{
      padding: 0 20px;
      line-height: 40px;
      text-align: right;
      color: #008BE4;
      font-size: 0.7rem;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .picker {    
    width: 100%;    
  }
  .address-slot {
    font-size: 0.5rem!important;
    .picker-item {
      font-size: 0.8rem;
    }
  }
</style>
