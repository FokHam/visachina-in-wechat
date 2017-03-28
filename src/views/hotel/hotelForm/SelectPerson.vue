<template>
  <div class="sp-page">
    <div class="sp-page-wrapper">
      <div class="tip">正在选择{{ selectType === "passenger" ? ("客房入住人") : ("订单联系人") }}</div>
      <div @click="editingPerson=true" class="add-button">
        <i class="icon-addperson-big"></i>
        <span>添加常用旅客</span>
      </div>
      <ul class="person-list wave-btm-bg">
        <li v-for="(person, index) in pList"
            @click="confirmPerson(person)"
            class="person-item">
          <div class="info-box">
            <p class="name">{{ person.surname + person.name }}
              <span class="detail">{{ person.spell_surname + person.spell_name }}</span>
            </p>
            <div v-if="person.spell_surname != ''&&person.phone!=''&&person.email!=''">
              <p class="item">{{ person.phone }}</p>
              <p class="item">{{ person.email }}</p>
            </div>
            <div v-else>
              <p class="item">请先完善旅客信息</p>
            </div>
          </div>
          <i class="icon-edit"
             @click.stop="editPerson(index)"></i>
        </li>
      </ul>
      <edit-person
        v-if="editingPerson"
        @submit="editConfirm"
        :info="selectedDetail">
      </edit-person>
    </div>
  </div>
</template>

<script>
  import EditPerson from './EditPerson'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'

  export default {
    created () {
      const _this = this;    
      window.addEventListener("popstate", function(e) {  
        _this.$emit('close');
      }, false);
      this.getList();
    },
    props: [
      "selectType"
    ],
    data: function () {
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
        Indicator.open('加载旅客列表')
        let url = "/api/member/passenger";
        this.$http.get(url).then((response) => {
          Indicator.close()
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
      confirmPerson (person) {
        if (person.spell_surname == '' || person.phone == '' || person.email == '') {
          Toast('请先完善联系人信息');
        }else{
          this.$store.commit("setHotelState", {
            type: "hotelPerson",
            data: person
          });
          this.$emit("confirm", person);
        }        
      }
    },
    components: {
      EditPerson
    },
    computed: {
      selectedPolicyHolderId () {
        return this.$store.state.insurance.selectedPolicyHolderId;
      },
      hotelState () {
        return this.$store.state.hotel;
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
