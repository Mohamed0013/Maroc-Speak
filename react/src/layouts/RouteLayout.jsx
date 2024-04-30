import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function RootLayout() {
  const { notification } = useStateContext();
  const GridStyle = {
    'bg': 'rgb(255,94,94)',
    'bg': 'linear-gradient(45deg, rgba(255,94,94,1) 0%, rgba(218,5,56,1) 35%, rgba(255,0,18,1) 100%)',
  }

  const { sidebar, toggleSide } = useStateContext();


  return (
    <div>
    <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.50"}>
    <div id={sidebar ? '' : 'sidebr'}>
      <GridItem as={"aside"}
        colSpan={{base : 6, lg : 1, xl : 1}}
        sx={GridStyle}
        minH={{lg : '100vh'}}
        maxW={{lg : sidebar ? '' : '70px'}}
        p={{base : '20px', lg : '1px'}}
      >
        
        <Sidebar key={sidebar}/>
        <div id={sidebar ? 'btn_menu_dv_open' : 'btn_menu_dv_close'}>
        <button id='btn_menu' onClick={toggleSide}>
          {sidebar && <><ArrowLeftIcon /></>}
          {!sidebar && <><ArrowRightIcon /> </>}
          </button>
      </div>
      </GridItem>
      </div>

    {/* main */}
      <GridItem as={'main'}
        colSpan={{base : 6, lg : 5, xl : 5}}
        p={'10px'}
      >
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>

    {notification && <div className='notification'>{notification}</div>}
    
    </div>
    
  )
}
