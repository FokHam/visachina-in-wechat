import App from './App'
import Home from './views/home/Home'
import VisaIndex from './views/visa/VisaIndex'
import VisaDetail from './views/visa/VisaDetail'
import VisaInformation from './views/visa/VisaInformation'
import VisaOrder from './views/visa/VisaOrder'
import VisaInvoice from './views/visa/VisaInvoice'
import VisaOrderDetail from './views/visa/VisaOrderDetail'
import VisaProgress from './views/visa/VisaProgress'
import ProgressDetail from './views/visa/ProgressDetail'
import VisaSuccess from './views/visa/Success'
import VisaRefund from './views/visa/VisaRefund'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import InsuranceDetail from './views/insurance/InsuranceDetail'
import InsuranceSpecific from './views/insurance/InsuranceSpecific'
import InsuranceCreateOrder from './views/insurance/InsuranceCreateOrder'
import InsuranceSelectInsuredPerson from './views/insurance/InsuranceSelectInsuredPerson'
import InsuranceEditInsuredPerson from './views/insurance/InsuranceEditInsuredPerson'
import InsuranceSelectPolicyHolder from './views/insurance/InsuranceSelectPolicyHolder'
import InsuranceEditPolicyHolder from './views/insurance/InsuranceEditPolicyHolder'
import InsuranceOrderDetail from './views/insurance/InsuranceOrderDetail'
import InsuranceSuccess from './views/insurance/Success'
import WifiIndex from './views/wifi/WifiIndex'
import WifiHelp from './views/wifi/WifiHelp'
import WifiList from './views/wifi/WifiList'
import WifiDetail from './views/wifi/WifiDetail'
import WifiOrder from './views/wifi/WifiOrder'
import WifiOrderDetail from './views/wifi/OrderDetail'
import WifiSuccess from './views/wifi/Success'
import HotelList from './views/hotel/HotelList'
import HotelDetail from './views/hotel/HotelDetail'
import HotelMap from './views/hotel/HotelMap'
import HotelIntro from './views/hotel/HotelIntro'
import HotelForm from './views/hotel/HotelForm'
import HotelRoomSelect from './views/hotel/HotelRoomSelect'
import HotelOrderDetail from './views/hotel/HotelOrderDetail'
import HotelSuccess from './views/hotel/Success'
import UserCenter from './views/usercenter/UserCenter'
import Collection from './views/usercenter/Collection'
import CommonInformation from './views/usercenter/CommonInformation'
import InsurancePolicy from './views/usercenter/InsurancePolicy'
import BindPhone from './views/usercenter/BindPhone'
import OrderList from './views/usercenter/OrderList'

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
  path: "/visaInformation",
  component: VisaInformation
},{
  path: "/visaOrder/:id",
  component: VisaOrder
},{
  path: "/visaInvoice",
  component: VisaInvoice
},{
  path: "/visaOrderDetail/:id",
  component: VisaOrderDetail
},{
  path: "/visaProgress",
  component: VisaProgress
},{
  path: "/progressDetail/:id",
  component: ProgressDetail
},{
  path: "/visaSuccess/:id",
  component: VisaSuccess
},{
  path: "/visaRefund/:id/:gid",
  component: VisaRefund
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
  path: "/insuranceSelectInsuredPerson/:id",
  component: InsuranceSelectInsuredPerson
},{
  path: "/insuranceSelectPolicyHolder/:id",
  component: InsuranceSelectPolicyHolder
},{
  path: "/insuranceOrderDetail/:id",
  component: InsuranceOrderDetail
},{
  path: "/insuranceSuccess/:id",
  component: InsuranceSuccess
},{
  path: "/wifi",
  component: WifiIndex
},{
  path: "/wifiHelp",
  component: WifiHelp
},{
  path: "/wifiList",
  component: WifiList
},{
  path: "/wifiDetail/:id/:city",
  component: WifiDetail
},{
  path: "/wifiOrder/:id/:city",
  component: WifiOrder
},{
  path: "/wifiOrderDetail/:id",
  component: WifiOrderDetail
},{
  path: "/wifiSuccess/:id",
  component: WifiSuccess
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
  path: "/hotelMap/:id/:lat/:lng",
  component: HotelMap
},{
  path: "/hotelOrderDetail/:id",
  component: HotelOrderDetail
},{
  path: "/hotelSuccess/:id",
  component: HotelSuccess
},{
  path: "/userCenter",
  component: UserCenter
},{
  path: "/collection",
  component: Collection
},{
  path: "/commonInformation",
  component: CommonInformation
},{
  path: "/insurancePolicy",
  component: InsurancePolicy
},{
  path: "/bindPhone",
  component: BindPhone
},{
  path: "/orderList/:status",
  component: OrderList
},{
  path: "/orderList",
  component: OrderList
}];

export default routes
