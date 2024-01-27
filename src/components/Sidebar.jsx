import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
            <NavLink to="/">
                <ListIcon as={CalendarIcon} color="white"/>
                Dashboard
            </NavLink>   
        </ListItem>   
        <ListItem>
            <NavLink to="/upload">
                <ListIcon as={EditIcon} color="white"/>
                Upload Video
            </NavLink>    
        </ListItem>
        <ListItem>
            <NavLink to="/profile">
                <ListIcon as={AtSignIcon} color="white"/>
                Profile
            </NavLink>                   
        </ListItem>      
        <ListItem>
            <NavLink to="/test">
                <ListIcon as={AtSignIcon} color="white"/>
                Test
            </NavLink>                   
        </ListItem>
        <ListItem>
            <NavLink to="/drop">
                <ListIcon as={AtSignIcon} color="white"/>
                Drop
            </NavLink>                   
        </ListItem>
    </List>
  )
}
