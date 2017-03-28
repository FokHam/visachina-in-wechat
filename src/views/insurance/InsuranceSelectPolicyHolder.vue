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
            @click="togglePolicyHolder(person.id, index)"
            class="person-item">
          <i :class="{ on: person.id === selectedPolicyHolderId }" class="icon-radio"></i>
          <div class="info-box">
            <div>
              <p class="name">{{ person.surname + person.name }}<span class="detail">{{ person.phone }}</span></p>
              <p class="item" v-if="person.spell_surname!=''&& person.sexual!=null&&person.id_type!=''&&person.id_number!=''&&person.birthday!=''&&person.phone!=''&&person.email!=''">{{ person.email }}</span></p> 
              <p class="item" v-else>请先完善投保人信息</p>       
            </div>
          </div>
          <i class="icon-edit"
             @click.stop="editPerson(index)"></i>
        </li>
      </ul>
      <div class="confirm-button"
        @click="confirm">
        确定
      </div>
      <edit-policy-holder
        v-if="editingPerson"
        @confirm="editConfirm"
        :policyHolderDetail="selectedDetail">
      </edit-policy-holder>
    </div>
  </div>
</template>

<script>
  import EditPolicyHolder from './InsuranceEditPolicyHolder'
  import { Toast } from 'mint-ui'

  export default {
    created () {
      this.getList();
    },
    data: function () {
      let typeList = ["身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        editingPerson: false,
        selectedDetail: {},
        pList: []
      };
    },
    methods: {
      editPerson (n) {
        this.selectedDetail = this.pList[n];
        this.editingPerson = true;
      },
      getList () {
        let url = "/api/member/passenger";
        this.$http.get(url).then((response) => {
          console.log(JSON.parse(response.body));
          let body = JSON.parse(response.body);
          if (body.status === 1) {
            this.pList = body.data;
          }
        }, (response) => {
          console.log("服务器错误！");
        });
      },
      confirm () {
        let that = this;
        that.pList.map(function (obj) {
          if (obj.id === that.$store.state.insurance.selectedPolicyHolderId) {
            that.$store.commit("confirmPolicyHolder", obj);
          }
        });
        this.$router.go(-1);
      },
      togglePolicyHolder (id, n) {
        if (this.pList[n].spell_surname!=''&&this.pList[n].sexual!=null&&this.pList[n].id_type!=''&&this.pList[n].id_number!=''&&this.pList[n].birthday!=''&&this.pList[n].phone!=''&&this.pList[n].email!='') {
            this.$store.commit("togglePolicyHolder", id);
        } else {
            Toast("请先完善该投保人信息");
        }
      },
      editConfirm () {
        this.getList();
        this.editingPerson = false;
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
  p,span,a{font-size: 0.7rem;}
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
