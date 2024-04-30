import { Navigate, Outlet } from "react-router-dom"
import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from '../components/admin/Sidebar'
import Adminnav from '../components/admin/Navbar'
import { useStateContext } from "../contexts/ContextProvider"

export default function Admin_layout() {

  const {notification, token} = useStateContext()
  if (!token){
    return <Navigate to={'/login'} />
  }

  const Adminside = {
    'bg': 'rgb(255,94,94)',
    'bg': 'linear-gradient(45deg, rgba(255,94,94,1) 0%, rgba(218,5,56,1) 35%, rgba(255,0,18,1) 100%)',
  }

  return (
    <div>
    <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.50"}>
      <GridItem as={"aside"}
        colSpan={{base : 6, lg : 1, xl : 1}}
        sx={Adminside}
        minH={{lg : '100vh'}}
        p={{base : '20px', lg : '30px'}}
      >
        <Sidebar />
      </GridItem>

    {/* main */}
    <GridItem as={'main'}
      colSpan={{base : 6, lg : 5, xl : 5}}
      p={'40px'}
    >
      <Adminnav />
      <Outlet />
      
      </GridItem>
    </Grid>

    {notification && <div className='notification'>{notification}</div>}
    
    </div>

  )
}
