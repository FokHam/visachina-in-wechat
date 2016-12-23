<template>
  <div class="sp-page">
    <div class="sp-page-wrapper">
      <div class="tip">最多可选择1个投保人</div>
      <div @click="editingPerson=true" class="add-button">
        <i class="icon-addperson-big"></i>
        <span>添加投保人</span>
      </div>
      <ul class="person-list wave-btm-bg">
        <li v-for="(person, index) in pList"
            @click="togglePolicyHolder(person.id)"
            class="person-item">
          <i :class="{ on: person.id === selectedPolicyHolderId }" class="icon-radio"></i>
          <div class="info-box">
            <p class="name">{{ person.cName }}<span class="detail">{{ person.phone }}</span></p>
            <p class="item">{{ person.email }}</span></p>
          </div>
          <i class="icon-edit"
             @click.stop="editingPerson=true"></i>
        </li>
      </ul>
      <div class="confirm-button"
        @click="confirm">
        确定
      </div>
      <edit-policy-holder
        v-if="editingPerson"
        v-on:confirm="editingPerson=false">
      </edit-policy-holder>
    </div>
  </div>
</template>

<script>
  import EditPolicyHolder from './EditPolicyHolder'

  export default {
    data: function () {
      return {
        editingPerson: false,
        idTypeList: ["身份证", "军官证", "护照"],
        pList: [
          {
            id: 77,
            cName: "黄旭光",
            eName: "Huangxuguang",
            gender: 1,
            idType: 0,
            idNo: "441581199104280019",
            birthday: "1991-04-28",
            phone: "13480101603",
            email: "hoxtonlau@gmail.com"
          },{
            id: 11,
            cName: "刘德华",
            eName: "Liudehua",
            gender: 1,
            idType: 0,
            idNo: "441581199104280019",
            birthday: "1991-04-28",
            phone: "13512312361",
            email: "ldehua@126.com"
          },{
            id: 61,
            cName: "张学友",
            eName: "Zhangxueyou",
            gender: 1,
            idType: 0,
            idNo: "441581199104280019",
            birthday: "1991-04-28",
            phone: "15822138888",
            email: "zxueyou@hotmail.com"
          },
        ]
      };
    },
    methods: {
      confirm () {
        this.$emit("confirm");
        let that = this;
        that.pList.map(function (obj) {
          if (obj.id === that.$store.state.insurance.selectedPolicyHolderId) {
            that.$store.commit("confirmPolicyHolder", obj);
          }
        });
      },
      togglePolicyHolder (id) {
        this.$store.commit("togglePolicyHolder", id);
      }
    },
    components: {
      EditPolicyHolder
    },
    computed: {
      selectedPolicyHolderId () {
        return this.$store.state.insurance.selectedPolicyHolderId;
      }
    }
  }
</script>

<style lang="less" scoped>
  .sp-page {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    overflow-y: scroll;
    background-color: #f6f6f6;
  }
  .icon-radio {
    position: absolute;
    top: 0.7rem;
    left: 0rem;
    width: 0.8rem;
    height: 0.8rem;
    background: url(/static/images/insurance/unselected.png) no-repeat;
    background-size: contain;
    &.on {
      background-image: url(/static/images/insurance/selected.png);
    }
  }
  .icon-edit {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    right: 0rem;
    top: 0.7rem;
    background: url(/static/images/insurance/edit.png) no-repeat;
    background-size: contain;
  }
  .tip {
    text-align: center;
    line-height: 1.8rem;
    font-size: 0.7rem;
    color: #ffe6eb;
    background: linear-gradient(to right, #F057AD , #BE6AEF);
  }
  .add-button {
    display: block;
    position: relative;
    background: #fff;
    line-height: 2.5rem;
    span {
      margin-left: 3.2rem;
      font-size: 0.8rem;
      color: #008BE4;
    }
    .icon-addperson-big {
      position: absolute;
      left: 1.2rem;
      top: 0; bottom: 0;
      margin: auto;
      width: 1.5rem;
      height: 1.3rem;
      background: url(/static/images/insurance/add-big.png) no-repeat;
      background-size: contain;
    }
  }
  .person-list {
    background-color: #fff;
    margin: 0.5rem 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    .person-item {
      padding: 0.7rem 0;
      margin: 0 0.7rem;
      position: relative;
      border-top: 1px solid #eee;
      &:first-child {
        border-top: none;
      }
      .info-box {
        position: relative;
        margin-left: 1.2rem;
        line-height: 1;
        p {
          margin-bottom: 0.3rem;
        }
        p, span {
          color: #666;
        }
        .name {
          font-size: 0.8rem;
        }
        .detail {
          margin-left: 0.3rem;
        }
      }
    }
  }
  .confirm-button {
    margin: 1.8rem 0.5rem;
    background-color: #008be4;
    text-align: center;
    color: #fff;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    font-size: 0.85rem;
  }
</style>
