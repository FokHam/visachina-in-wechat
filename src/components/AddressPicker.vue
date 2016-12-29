<template>
    <mt-picker ref="picker" :slots="addressSlots" :className="'address-slot'" @change="addressSlotReset"></mt-picker>
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
        console.log(v);
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
        ]
      };
    }
  }
</script>

<style lang="less" scoped>
  .picker {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
  }
  .address-slot {
    font-size: 0.5rem!important;
    .picker-item {
      font-size: 0.8rem;
    }
  }
</style>
