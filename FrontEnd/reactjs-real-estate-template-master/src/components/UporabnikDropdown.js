import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const UporabnikDropdown = ({ user, handleLogout }) => {
  const history = useHistory();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Profil: {user.ime} {user.priimek}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push('/nastavitve')}>Nastavitve</Dropdown.Item>
        <Dropdown.Item ><Link className="favoritesLink" to="/priljubljenje">Favorites</Link>
</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Odjava</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UporabnikDropdown;