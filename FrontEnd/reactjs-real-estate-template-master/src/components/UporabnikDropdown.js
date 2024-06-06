import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UporabnikDropdown = ({ user, handleLogout }) => {
  const history = useHistory();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <PersonOutlineIcon className='icon-margin-right' /> {user.ime} {user.priimek}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item ><Link className="favoritesLink" to="/priljubljenje"> <FavoriteBorderIcon className='icon-margin-right'/>Priljubljene</Link>
      </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}> <LogoutIcon className='icon-margin-right'/>Odjava</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UporabnikDropdown;