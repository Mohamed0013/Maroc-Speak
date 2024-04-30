import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
<>
    <List color={'white'} fontSize={"1.2em"} spacing={4}>
        <ListItem>
            <Link to={'/admin'}>
                <ListIcon as={CalendarIcon} />
                Dashboard
            </Link>
        </ListItem>
        
        
        <ListItem>
            <Link to={'/admin/users'}>
                <ListIcon as={AtSignIcon} />
                list Users
            </Link>
        </ListItem>
    </List>
    </>
  )
  
}
