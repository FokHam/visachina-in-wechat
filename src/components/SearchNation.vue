<template>
  <div class="search-nation">
    <div class="topipt">
      <div class="layer">
        <div class="ipt">
          <input type="text" placeholder="搜索国家" v-model="keyword">
          <div class="clearinput" @click="clearinput" v-show="keyword"></div>
        </div>
        <div class="cancel" @click="closePage">取消</div>
      </div>
    </div>
    <div class="searchresult" v-show="keyword">
      <ul v-show="searchData.length != 0">
        <li v-for="item in searchData"
          @click="chooseNationality(item.name, item.nationality)">
          {{ item.name }}
        </li>
      </ul>
      <div class="backshadow"
        :class="{white: searchData.length !== 0}"
        @touchmove.prevent>
      </div>
    </div>
    <div class="country-list" v-show="searchData.length == 0">
      <div class="wordsrecord">
        <div class="item hot">
          <div class="tit">常用国家</div>
          <div class="namelist">
            <ul>
              <li v-for="item in hotList"
                @click="chooseNationality(item.name, item.nationality)">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="countrylist">
        <div class="item" v-for="continent in nationList">
          <div class="tit"> {{ continent.continent }} </div>
          <div class="namelist">
            <ul>
              <li v-for="country in continent.country"
                @click="chooseNationality(country.name, country.nationality)">
                <span>{{ country.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keyword: "",
        searchData: [],
        nationList: [
          {
            "continent": "亚洲",
            "country": [
              {
                "nationality": "OM",
                "name": "阿曼"
              },
              {
                "nationality": "PK",
                "name": "巴基斯坦"
              },
              {
                "nationality": "KP",
                "name": "朝鲜"
              },
              {
                "nationality": "TL",
                "name": "东帝汶"
              },
              {
                "nationality": "PH",
                "name": "菲律宾"
              },
              {
                "nationality": "GE",
                "name": "格鲁吉亚"
              },
              {
                "nationality": "KR",
                "name": "韩国"
              },
              {
                "nationality": "KZ",
                "name": "哈萨克斯坦"
              },
              {
                "nationality": "KH",
                "name": "柬埔寨"
              },
              {
                "nationality": "LB",
                "name": "黎巴嫩"
              },
              {
                "nationality": "LA",
                "name": "老挝"
              },
              {
                "nationality": "MM",
                "name": "缅甸"
              },
              {
                "nationality": "MN",
                "name": "蒙古"
              },
              {
                "nationality": "BD",
                "name": "孟加拉"
              },
              {
                "nationality": "MY",
                "name": "马来西亚"
              },
              {
                "nationality": "NP",
                "name": "尼泊尔"
              },
              {
                "nationality": "JP",
                "name": "日本"
              },
              {
                "nationality": "LK",
                "name": "斯里兰卡"
              },
              {
                "nationality": "SA",
                "name": "沙特阿拉伯"
              },
              {
                "nationality": "TR",
                "name": "土耳其"
              },
              {
                "nationality": "TH",
                "name": "泰国"
              },
              {
                "nationality": "TM",
                "name": "土库曼斯坦"
              },
              {
                "nationality": "BN",
                "name": "文莱"
              },
              {
                "nationality": "SG",
                "name": "新加坡"
              },
              {
                "nationality": "SY",
                "name": "叙利亚"
              },
              {
                "nationality": "IN",
                "name": "印度"
              },
              {
                "nationality": "IR",
                "name": "伊朗"
              },
              {
                "nationality": "IQ",
                "name": "伊拉克"
              },
              {
                "nationality": "YE",
                "name": "也门"
              },
              {
                "nationality": "VN",
                "name": "越南"
              },
              {
                "nationality": "IL",
                "name": "以色列"
              },
              {
                "nationality": "CN",
                "name": "中国"
              },
              {
                "nationality": "AE",
                "name": "阿联酋"
              },
              {
                "nationality": "TW",
                "name": "中国台湾"
              },
              {
                "nationality": "UZ",
                "name": "乌兹别克"
              },
              {
                "nationality": "ID",
                "name": "印尼"
              },
              {
                "nationality": "BH",
                "name": "巴林"
              },
              {
                "nationality": "BT",
                "name": "不丹"
              },
              {
                "nationality": "HK",
                "name": "香港"
              },
              {
                "nationality": "JO",
                "name": "约旦"
              },
              {
                "nationality": "KG",
                "name": "吉尔吉斯斯坦"
              },
              {
                "nationality": "KW",
                "name": "科威特"
              },
              {
                "nationality": "MO",
                "name": "澳门"
              },
              {
                "nationality": "MV",
                "name": "马尔代夫"
              },
              {
                "nationality": "PS",
                "name": "加沙地带"
              },
              {
                "nationality": "QA",
                "name": "卡塔尔"
              },
              {
                "nationality": "TJ",
                "name": "塔吉克斯坦"
              },
              {
                "nationality": "AF",
                "name": "阿富汗"
              }
            ]
          },
          {
            "continent": "欧洲",
            "country": [
              {
                "nationality": "AT",
                "name": "奥地利"
              },
              {
                "nationality": "IE",
                "name": "爱尔兰"
              },
              {
                "nationality": "IS",
                "name": "冰岛"
              },
              {
                "nationality": "BY",
                "name": "白俄罗斯"
              },
              {
                "nationality": "BG",
                "name": "保加利亚"
              },
              {
                "nationality": "PL",
                "name": "波兰"
              },
              {
                "nationality": "BE",
                "name": "比利时"
              },
              {
                "nationality": "DE",
                "name": "德国"
              },
              {
                "nationality": "DK",
                "name": "丹麦"
              },
              {
                "nationality": "RU",
                "name": "俄罗斯"
              },
              {
                "nationality": "FR",
                "name": "法国"
              },
              {
                "nationality": "FI",
                "name": "芬兰"
              },
              {
                "nationality": "NL",
                "name": "荷兰"
              },
              {
                "nationality": "CZ",
                "name": "捷克"
              },
              {
                "nationality": "HR",
                "name": "克罗地亚"
              },
              {
                "nationality": "RO",
                "name": "罗马尼亚"
              },
              {
                "nationality": "LU",
                "name": "卢森堡"
              },
              {
                "nationality": "LT",
                "name": "立陶宛"
              },
              {
                "nationality": "MC",
                "name": "摩纳哥"
              },
              {
                "nationality": "NO",
                "name": "挪威"
              },
              {
                "nationality": "PT",
                "name": "葡萄牙"
              },
              {
                "nationality": "SE",
                "name": "瑞典"
              },
              {
                "nationality": "CH",
                "name": "瑞士"
              },
              {
                "nationality": "SK",
                "name": "斯洛伐克"
              },
              {
                "nationality": "SI",
                "name": "斯洛文尼亚"
              },
              {
                "nationality": "CY",
                "name": "塞浦路斯"
              },
              {
                "nationality": "UA",
                "name": "乌克兰"
              },
              {
                "nationality": "ES",
                "name": "西班牙"
              },
              {
                "nationality": "GR",
                "name": "希腊"
              },
              {
                "nationality": "HU",
                "name": "匈牙利"
              },
              {
                "nationality": "IT",
                "name": "意大利"
              },
              {
                "nationality": "GB",
                "name": "英国"
              },
              {
                "nationality": "AD",
                "name": "安道尔"
              },
              {
                "nationality": "AL",
                "name": "阿尔巴尼亚"
              },
              {
                "nationality": "AM",
                "name": "亚美尼亚"
              },
              {
                "nationality": "AX",
                "name": "奥兰群岛"
              },
              {
                "nationality": "AZ",
                "name": "阿塞拜疆"
              },
              {
                "nationality": "BA",
                "name": "波斯尼亚和黑塞哥维那"
              },
              {
                "nationality": "BV",
                "name": "布韦岛（挪）"
              },
              {
                "nationality": "EE",
                "name": "爱沙尼亚"
              },
              {
                "nationality": "EU",
                "name": "厄立特里亚"
              },
              {
                "nationality": "FO",
                "name": "法罗群岛"
              },
              {
                "nationality": "GG",
                "name": "格恩西岛"
              },
              {
                "nationality": "GI",
                "name": "直布罗陀"
              },
              {
                "nationality": "GS",
                "name": "南乔治亚岛"
              },
              {
                "nationality": "JE",
                "name": "泽西岛"
              },
              {
                "nationality": "KV",
                "name": "科索沃"
              },
              {
                "nationality": "LI",
                "name": "列支敦士登"
              },
              {
                "nationality": "LV",
                "name": "拉脱维亚"
              },
              {
                "nationality": "MD",
                "name": "摩尔多瓦"
              },
              {
                "nationality": "ME",
                "name": "门的内哥罗"
              },
              {
                "nationality": "MK",
                "name": "马其顿"
              },
              {
                "nationality": "MT",
                "name": "马耳他"
              },
              {
                "nationality": "RS",
                "name": "塞尔维亚"
              },
              {
                "nationality": "SJ",
                "name": "斯瓦尔巴特群岛"
              },
              {
                "nationality": "SM",
                "name": "圣马力诺"
              },
              {
                "nationality": "VA",
                "name": "梵蒂冈"
              }
            ]
          },
          {
            "continent": "北美洲",
            "country": [
              {
                "nationality": "BS",
                "name": "巴哈马"
              },
              {
                "nationality": "CU",
                "name": "古巴"
              },
              {
                "nationality": "CR",
                "name": "哥斯达黎加"
              },
              {
                "nationality": "HN",
                "name": "洪都拉斯"
              },
              {
                "nationality": "CA",
                "name": "加拿大"
              },
              {
                "nationality": "US",
                "name": "美国"
              },
              {
                "nationality": "PE",
                "name": "秘鲁"
              },
              {
                "nationality": "MX",
                "name": "墨西哥"
              },
              {
                "nationality": "AG",
                "name": "安提瓜和巴布达"
              },
              {
                "nationality": "AI",
                "name": "安圭拉"
              },
              {
                "nationality": "AW",
                "name": "阿鲁巴"
              },
              {
                "nationality": "BB",
                "name": "巴巴多斯岛"
              },
              {
                "nationality": "BL",
                "name": "圣巴泰勒米岛"
              },
              {
                "nationality": "BM",
                "name": "百慕大"
              },
              {
                "nationality": "BQ",
                "name": "荷兰加勒比区"
              },
              {
                "nationality": "BZ",
                "name": "伯利兹"
              },
              {
                "nationality": "CW",
                "name": "库拉索"
              },
              {
                "nationality": "DM",
                "name": "多米尼加"
              },
              {
                "nationality": "DO",
                "name": "多米尼加共和国"
              },
              {
                "nationality": "GD",
                "name": "格林纳达"
              },
              {
                "nationality": "GL",
                "name": "格陵兰"
              },
              {
                "nationality": "GP",
                "name": "瓜德罗普岛"
              },
              {
                "nationality": "GT",
                "name": "危地马拉"
              },
              {
                "nationality": "HT",
                "name": "海地"
              },
              {
                "nationality": "KN",
                "name": "圣基茨和尼维斯"
              },
              {
                "nationality": "KY",
                "name": "开曼群岛"
              },
              {
                "nationality": "LC",
                "name": "圣卢西亚岛"
              },
              {
                "nationality": "MF",
                "name": "法属圣马丁"
              },
              {
                "nationality": "MQ",
                "name": "马提尼克岛"
              },
              {
                "nationality": "MS",
                "name": "蒙特塞拉特"
              },
              {
                "nationality": "NI",
                "name": "尼加拉瓜"
              },
              {
                "nationality": "PA",
                "name": "巴拿马"
              },
              {
                "nationality": "PM",
                "name": "圣皮埃尔岛和密克隆"
              },
              {
                "nationality": "PR",
                "name": "波多黎各"
              },
              {
                "nationality": "SV",
                "name": "萨尔瓦多"
              },
              {
                "nationality": "SX",
                "name": "荷属圣马丁"
              },
              {
                "nationality": "TC",
                "name": "特克斯和凯科斯群岛"
              },
              {
                "nationality": "TT",
                "name": "特立尼达和多巴哥"
              },
              {
                "nationality": "VC",
                "name": "圣文森特和格林纳丁斯"
              },
              {
                "nationality": "VG",
                "name": "英属维尔京群岛"
              },
              {
                "nationality": "VI",
                "name": "维尔京群岛"
              }
            ]
          },
          {
            "continent": "南美洲",
            "country": [
              {
                "nationality": "AR",
                "name": "阿根廷"
              },
              {
                "nationality": "BO",
                "name": "玻利维亚"
              },
              {
                "nationality": "BR",
                "name": "巴西"
              },
              {
                "nationality": "TG",
                "name": "多哥"
              },
              {
                "nationality": "CO",
                "name": "哥伦比亚"
              },
              {
                "nationality": "UY",
                "name": "乌拉圭"
              },
              {
                "nationality": "VE",
                "name": "委内瑞拉"
              },
              {
                "nationality": "JM",
                "name": "牙买加"
              },
              {
                "nationality": "CL",
                "name": "智利"
              },
              {
                "nationality": "AN",
                "name": "荷属安的列斯群岛"
              },
              {
                "nationality": "EC",
                "name": "厄瓜多尔"
              },
              {
                "nationality": "FK",
                "name": "福克兰群岛"
              },
              {
                "nationality": "GF",
                "name": "法属圭亚那"
              },
              {
                "nationality": "GY",
                "name": "圭亚那"
              },
              {
                "nationality": "PY",
                "name": "巴拉圭"
              },
              {
                "nationality": "SR",
                "name": "苏里南"
              }
            ]
          },
          {
            "continent": "大洋洲",
            "country": [
              {
                "nationality": "AU",
                "name": "澳大利亚"
              },
              {
                "nationality": "GU",
                "name": "关岛"
              },
              {
                "nationality": "FJ",
                "name": "斐济"
              },
              {
                "nationality": "NZ",
                "name": "新西兰"
              },
              {
                "nationality": "AS",
                "name": "美属萨摩亚"
              },
              {
                "nationality": "CC",
                "name": "科科斯群岛"
              },
              {
                "nationality": "CK",
                "name": "库克群岛"
              },
              {
                "nationality": "CX",
                "name": "圣诞岛"
              },
              {
                "nationality": "FM",
                "name": "密克罗尼西亚"
              },
              {
                "nationality": "HM",
                "name": "赫德岛和麦克唐纳群岛"
              },
              {
                "nationality": "KI",
                "name": "基里巴斯"
              },
              {
                "nationality": "MH",
                "name": "马绍尔群岛"
              },
              {
                "nationality": "MP",
                "name": "北马里亚纳群岛"
              },
              {
                "nationality": "NC",
                "name": "新喀里多尼亚"
              },
              {
                "nationality": "NF",
                "name": "诺福克岛"
              },
              {
                "nationality": "NR",
                "name": "瑙鲁"
              },
              {
                "nationality": "NU",
                "name": "纽埃岛"
              },
              {
                "nationality": "PF",
                "name": "法属波利尼西亚"
              },
              {
                "nationality": "PG",
                "name": "巴布亚新几内亚"
              },
              {
                "nationality": "PN",
                "name": "皮特凯恩"
              },
              {
                "nationality": "PW",
                "name": "帕劳"
              },
              {
                "nationality": "SB",
                "name": "所罗门群岛"
              },
              {
                "nationality": "TK",
                "name": "托克劳群岛"
              },
              {
                "nationality": "TO",
                "name": "汤加"
              },
              {
                "nationality": "TV",
                "name": "图瓦卢"
              },
              {
                "nationality": "UM",
                "name": "美国本土外小岛屿"
              },
              {
                "nationality": "WF",
                "name": "瓦利斯群岛和富图纳群岛"
              },
              {
                "nationality": "WS",
                "name": "萨摩亚"
              }
            ]
          },
          {
            "continent": "非洲",
            "country": [
              {
                "nationality": "EG",
                "name": "埃及"
              },
              {
                "nationality": "ET",
                "name": "埃塞俄比亚"
              },
              {
                "nationality": "BI",
                "name": "布隆迪"
              },
              {
                "nationality": "BJ",
                "name": "贝宁"
              },
              {
                "nationality": "GQ",
                "name": "赤道几内亚"
              },
              {
                "nationality": "CV",
                "name": "佛得角"
              },
              {
                "nationality": "CG",
                "name": "刚果布"
              },
              {
                "nationality": "CD",
                "name": "刚果金"
              },
              {
                "nationality": "ZW",
                "name": "津巴布韦"
              },
              {
                "nationality": "GH",
                "name": "加纳"
              },
              {
                "nationality": "GW",
                "name": "几内亚比绍"
              },
              {
                "nationality": "GA",
                "name": "加蓬"
              },
              {
                "nationality": "CM",
                "name": "喀麦隆"
              },
              {
                "nationality": "KM",
                "name": "科摩罗"
              },
              {
                "nationality": "KE",
                "name": "肯尼亚"
              },
              {
                "nationality": "CI",
                "name": "科特迪瓦"
              },
              {
                "nationality": "LR",
                "name": "利比里亚"
              },
              {
                "nationality": "LY",
                "name": "利比亚"
              },
              {
                "nationality": "RW",
                "name": "卢旺达"
              },
              {
                "nationality": "MG",
                "name": "马达加斯加"
              },
              {
                "nationality": "ML",
                "name": "马里"
              },
              {
                "nationality": "MA",
                "name": "摩洛哥"
              },
              {
                "nationality": "MU",
                "name": "毛里求斯"
              },
              {
                "nationality": "MR",
                "name": "毛里塔尼亚"
              },
              {
                "nationality": "MW",
                "name": "马拉维"
              },
              {
                "nationality": "MZ",
                "name": "莫桑比克"
              },
              {
                "nationality": "ZA",
                "name": "南非"
              },
              {
                "nationality": "NA",
                "name": "纳米比亚"
              },
              {
                "nationality": "NE",
                "name": "尼日尔"
              },
              {
                "nationality": "NG",
                "name": "尼日利亚"
              },
              {
                "nationality": "SD",
                "name": "北苏丹"
              },
              {
                "nationality": "SL",
                "name": "塞拉利昂"
              },
              {
                "nationality": "SN",
                "name": "塞内加尔"
              },
              {
                "nationality": "SC",
                "name": "塞舌尔"
              },
              {
                "nationality": "TN",
                "name": "突尼斯"
              },
              {
                "nationality": "TZ",
                "name": "坦桑尼亚"
              },
              {
                "nationality": "UG",
                "name": "乌干达"
              },
              {
                "nationality": "VU",
                "name": "瓦努阿图"
              },
              {
                "nationality": "ZM",
                "name": "赞比亚"
              },
              {
                "nationality": "TD",
                "name": "乍得"
              },
              {
                "nationality": "CF",
                "name": "中非"
              },
              {
                "nationality": "SS",
                "name": "南苏丹"
              },
              {
                "nationality": "AO",
                "name": "安哥拉"
              },
              {
                "nationality": "BF",
                "name": "布基纳法索"
              },
              {
                "nationality": "BW",
                "name": "博茨瓦纳"
              },
              {
                "nationality": "DJ",
                "name": "吉布提"
              },
              {
                "nationality": "DZ",
                "name": "阿尔及利亚"
              },
              {
                "nationality": "EH",
                "name": "西撒哈拉"
              },
              {
                "nationality": "ER",
                "name": "厄立特里亚"
              },
              {
                "nationality": "GM",
                "name": "冈比亚"
              },
              {
                "nationality": "GN",
                "name": "几内亚"
              },
              {
                "nationality": "IO",
                "name": "英属印度洋领地"
              },
              {
                "nationality": "LS",
                "name": "莱索托"
              },
              {
                "nationality": "RE",
                "name": "留尼汪"
              },
              {
                "nationality": "SO",
                "name": "索马里"
              },
              {
                "nationality": "ST",
                "name": "圣多美和普林西比"
              },
              {
                "nationality": "SZ",
                "name": "斯威士兰"
              },
              {
                "nationality": "SH",
                "name": "圣赫勒拿"
              },
              {
                "nationality": "YT",
                "name": "马约特"
              }
            ]
          }
        ],
        hotList: [
          {
            "nationality": "CN",
            "name": "中国"
          },{
            "nationality": "HK",
            "name": "香港"
          },{
            "nationality": "MO",
            "name": "澳门"
          },{
            "nationality": "TW",
            "name": "台湾"
          },{
            "nationality": "JP",
            "name": "日本"
          },{
            "nationality": "KR",
            "name": "韩国"
          },{
            "nationality": "TH",
            "name": "泰国"
          },{
            "nationality": "SG",
            "name": "新加坡"
          },{
            "nationality": "MY",
            "name": "马来西亚"
          },{
            "nationality": "US",
            "name": "美国"
          },{
            "nationality": "GB",
            "name": "英国"
          },{
            "nationality": "AU",
            "name": "澳大利亚"
          }
        ]
      };
    },
    created () {
      this.keyword = "";
    },
    methods: {
      clearinput () {
        this.keyword = "";
        this.searchData = [];
      },
      closePage () {
        this.$emit("closePage");
      },
      chooseNationality (n, id) {
        this.$emit("chooseNationality", n, id);
      }
    },
    watch: {
      keyword () {
        if (this.keyword !== "") {
          let k = this.keyword;
          let tempArr = [];
          this.nationList.map(function (continent) {
            continent.country.map(function (c) {
              if (c.name.indexOf(k) !== -1) {
                tempArr.push(c);
              }
            });
          });
          this.searchData = tempArr;
        }else {
          this.searchData = [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-nation{
    background: #ececec;
    .topipt{
      width: 100%;
      z-index: 999;
      position: relative;
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
    .wordsrecord{margin-bottom: 10px;}
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
