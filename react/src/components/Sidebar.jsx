import { AddIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

export default function Sidebar() {

    const { user, token, setUser, sidebar, toggleSide } = useStateContext();

    useEffect(() => {
        if (token){
        axiosClient.get('/user').then(({ data }) => {
          setUser(data);
        });
        }
      }, [token, setUser]);

      // const [sidebar, setSidebar] = useState(false);

      // const toggleSide = () => {
      //   setSidebar(!sidebar);
      // };

  return (
    <>
        <List color={'white'} fontSize={"1.2em"} spacing={4}>
        
        <ListItem id="ListItemSidbar_sid">
        <Link to={'/'} className="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
            </svg> {sidebar && <>
          &nbsp;
          Dashboard
            </>
        }</Link>
      </ListItem>

    {user.role == 'student' &&
        <ListItem id="ListItemSidbar_sid">
        <Link className="d-flex align-items-center" to={'/dashboard'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
        </svg> {sidebar && <>
          &nbsp;
          Progression
            </>
        }
        </Link>
      </ListItem>
    }
   {
      user.role=='prof' &&
      <>
        <ListItem id="ListItemSidbar_sid">
        <Link className="d-flex align-items-center" to={'/categories'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
        </svg> {sidebar && <>
          &nbsp;
          Categories
            </>
        }</Link>
      </ListItem>


      <ListItem id="ListItemSidbar_sid" cursor="pointer">
        <Link to={'/prof_courses'}>
        <ListIcon as={HamburgerIcon} />
        {sidebar && <>
          &nbsp;
          Courses
            </>
        }
        </Link>
        </ListItem>

        <ListItem id="ListItemSidbar_sid" cursor="pointer">
        <Link className="d-flex align-items-center" to={'/Profquiz'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
  <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z"/>
  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
</svg> {sidebar && <>
          &nbsp;
          Quiz
            </>
        }
        </Link>
        </ListItem>

        <ListItem id="ListItemSidbar_sid" cursor="pointer">
        <Link className="d-flex align-items-center" to={'/Profactivities'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-emoji-grin" viewBox="0 0 16 16">
  <path d="M12.946 11.398A6.002 6.002 0 0 1 2.108 9.14c-.114-.595.426-1.068 1.028-.997C4.405 8.289 6.48 8.5 8 8.5s3.595-.21 4.864-.358c.602-.07 1.142.402 1.028.998a5.95 5.95 0 0 1-.946 2.258m-.078-2.25C11.588 9.295 9.539 9.5 8 9.5s-3.589-.205-4.868-.352c.11.468.286.91.517 1.317A37 37 0 0 0 8 10.75a37 37 0 0 0 4.351-.285c.231-.407.407-.85.517-1.317m-1.36 2.416c-1.02.1-2.255.186-3.508.186s-2.488-.086-3.507-.186A5 5 0 0 0 8 13a5 5 0 0 0 3.507-1.436ZM6.488 7c.114-.294.179-.636.179-1 0-1.105-.597-2-1.334-2C4.597 4 4 4.895 4 6c0 .364.065.706.178 1 .23-.598.662-1 1.155-1 .494 0 .925.402 1.155 1M12 6c0 .364-.065.706-.178 1-.23-.598-.662-1-1.155-1-.494 0-.925.402-1.155 1a2.8 2.8 0 0 1-.179-1c0-1.105.597-2 1.334-2C11.403 4 12 4.895 12 6"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14"/>
</svg> {sidebar && <>
          &nbsp;
          Activities
            </>
        }
        </Link>
        </ListItem>


    </>
}


      {user.role == 'student' &&
      <>
      <ListItem id="ListItemSidbar_sid">
            <Link to={'/addcourse'}>
                <ListIcon as={CalendarIcon} />
                {sidebar && <>
          &nbsp;
          Courses
            </>
        }
            </Link>
        </ListItem>
        </>
}
       
    </List>
    </>
    
  )
  
}
