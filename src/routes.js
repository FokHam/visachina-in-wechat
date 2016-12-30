import App from './App'
import Home from './views/home/Home'
import VisaIndex from './views/visa/VisaIndex'
import VisaDetail from './views/visa/VisaDetail'
import VisaInformation from './views/visa/VisaInformation'
import VisaOrder from './views/visa/VisaOrder'
import VisaApplyList from './views/visa/VisaApplyList'
import VisaApplyAdd from './views/visa/VisaApplyAdd'
import InsApplyList from './views/visa/InsApplyList'
import InsApplyEdit from './views/visa/InsApplyEdit'
import InsApplyPerson from './views/visa/InsApplyPerson'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import InsuranceDetail from './views/insurance/InsuranceDetail'
import InsuranceSpecific from './views/insurance/InsuranceSpecific'
import InsuranceCreateOrder from './views/insurance/InsuranceCreateOrder'
import WifiIndex from './views/wifi/WifiIndex'
import WifiHelp from './views/wifi/WifiHelp'
import WifiList from './views/wifi/WifiList'
import WifiDetail from './views/wifi/WifiDetail'
import WifiCounter from './views/wifi/WifiCounter'
import WifiOrder from './views/wifi/WifiOrder'
import HotelList from './views/hotel/HotelList'
import HotelDetail from './views/hotel/HotelDetail'
import HotelIntro from './views/hotel/HotelIntro'
import HotelForm from './views/hotel/HotelForm'
import HotelRoomSelect from './views/hotel/HotelRoomSelect'
import UserCenter from './views/usercenter/UserCenter'

var routes = [{
  path: "/",
  component: Home
},{
  path: "/home",
  component: Home
},{
  path: "/visa",
  component: VisaIndex
},{
  path: "/visaDetail/:id",
  component: VisaDetail
},{
  path: "/visaInformation/:id",
  component: VisaInformation
},{
  path: "/visaOrder/:id",
  component: VisaOrder
},{
  path: "/VisaApplyList",
  component: VisaApplyList
},{
  path: "/VisaApplyAdd/:id",
  component: VisaApplyAdd
},{
  path: "/InsApplyList",
  component: InsApplyList
},{
  path: "/InsApplyEdit/:id",
  component: InsApplyEdit
},{
  path: "/InsApplyPerson",
  component: InsApplyPerson
},{
  path: "/insurance",
  component: InsuranceIndex
},{
  path: "/insuranceList/:type",
  component: InsuranceList
},{
  path: "/insuranceDetail/:id",
  component: InsuranceDetail
},{
  path: "/insuranceSpecific/:id",
  component: InsuranceSpecific
},{
  path: "/insuranceCreateOrder/:id",
  component: InsuranceCreateOrder
},{
  path: "/wifi",
  component: WifiIndex
},{
  path: "/wifiHelp",
  component: WifiHelp
},{
  path: "/wifiList/:country",
  component: WifiList
},{
  path: "/wifiDetail/:id",
  component: WifiDetail
},{
  path: "/wifiCounter/:id",
  component: WifiCounter
},{
  path: "/wifiOrder/:id",
  component: WifiOrder
},{
  path: "/hotel",
  component: HotelList
},{
  path: "/hotelDetail/:id",
  component: HotelDetail
},{
  path: "/hotelIntro/:id",
  component: HotelIntro
},{
  path: "/hotelForm/:id",
  component: HotelForm
},{
  path: "/hotelRoomSelect",
  component: HotelRoomSelect
},{
  path: "/userCenter",
  component: UserCenter
}];

export default routes
