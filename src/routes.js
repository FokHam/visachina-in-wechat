import App from './App'
import Home from './views/home/Home'
import VisaList from './views/visa/VisaList'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import InsuranceDetail from './views/insurance/InsuranceDetail'
import InsuranceSpecific from './views/insurance/InsuranceSpecific'
import InsuranceCreateOrder from './views/insurance/InsuranceCreateOrder'
import WifiList from './views/wifi/WifiList'
import HotelList from './views/hotel/HotelList'

var routes = [{
  path: "/",
  component: Home
},{
  path: "/home",
  component: Home
},{
  path: "/visa",
  component: VisaList
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
  component: WifiList
},{
  path: "/hotel",
  component: HotelList
}];

export default routes
