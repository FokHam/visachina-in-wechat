import App from './App'
import Home from './views/home/Home'
import VisaIndex from './views/visa/VisaIndex'
import VisaDetail from './views/visa/VisaDetail'
import VisaInformation from './views/visa/VisaInformation'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import InsuranceDetail from './views/insurance/InsuranceDetail'
import InsuranceSpecific from './views/insurance/InsuranceSpecific'
import InsuranceCreateOrder from './views/insurance/InsuranceCreateOrder'
import WifiList from './views/wifi/WifiList'
import HotelList from './views/hotel/HotelList'
import HotelDetail from './views/hotel/HotelDetail'
import HotelIntro from './views/hotel/HotelIntro'
import HotelForm from './views/hotel/HotelForm'

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
  path: "/VisaInformation/:id",
  component: VisaInformation
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
},{
  path: "/hotelDetail/:id",
  component: HotelDetail
},{
  path: "/hotelIntro/:id",
  component: HotelIntro
},{
  path: "/hotelForm/:id",
  component: HotelForm
}];

export default routes
