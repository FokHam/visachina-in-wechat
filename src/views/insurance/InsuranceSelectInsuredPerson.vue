<template>
  <div class="sp-page">
    <div class="sp-page-wrapper">
      <div class="tip"
        @click="getList">最多可选择10个被保人</div>
      <div @click="editingPerson=true" class="add-button">
        <i class="icon-addperson-big"></i>
        <span>添加被保人</span>
      </div>
      <ul class="person-list wave-btm-bg">
        <li v-for="(person, index) in pList"
            @click="toggleInsuredPerson(person.id)"
            class="person-item">
          <i :class="{ on: selectedPersonIds && (selectedPersonIds.indexOf(person.id) !== -1) }" class="icon-radio"></i>
          <div class="info-box">
            <p class="name">{{ person.surname + " " + person.name }}<span class="detail">{{ (person.spell_surname ? person.spell_surname : "") + " " + person.spell_name }}</span></p>
            <p class="item">{{ idTypeList[person.id_type] }} <span class="detail">{{ person.id_number }}</span></p>
            <p class="item">出生日期 <span class="detail">{{ person.birthday }}</span></p>
          </div>
          <i class="icon-edit"
             @click.stop="editPerson(index)"></i>
        </li>
      </ul>
      <div class="confirm-button"
        @click="confirm">
        确定
      </div>
    </div>
    <edit-insured-person
      v-if="editingPerson"
      v-on:confirm="editConfirm"
      :insuredPersonDetail="selectedDetail">
    </edit-insured-person>
  </div>
</template>

<script>
  import EditInsuredPerson from './InsuranceEditInsuredPerson'
  import { Toast } from 'mint-ui'

  export default {
    created () {
      this.getList();
    },
    data: function () {
      let typeList = ["", "身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        editingPerson: false,
        idTypeList: typeList,
        pList: [],
        selectedDetail: {}
      }
    },
    methods: {
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
      editConfirm () {
        this.getList();
        this.editingPerson = false;
      },
      confirm () {
        let arr = [],
            that = this;
        that.$store.state.insurance.selectedInsuredPersonIds.map(function (v) {
          that.pList.map(function (obj) {
            if (obj.id === v) {
              arr.push(obj);
            }
          });
        });
        that.$store.commit("confirmInsuredPerson", arr);
        this.$router.go(-1);
      },
      toggleInsuredPerson (id) {
        this.$store.commit("toggleInsuredPerson", id);
      },
      editPerson (n) {
        this.selectedDetail = this.pList[n];
        this.editingPerson = true;
      }
    },
    components: {
      EditInsuredPerson
    },
    computed: {
      selectedPersonIds () {
        return this.$store.state.insurance.selectedInsuredPersonIds;
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
