import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/petfinder';
import favicon from '../../assets/favicon.png';
import Search from '../search';
import {NavLink, Link} from 'react-router-dom'; 

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  return (
    <nav>
      <div className="nav-logo">
        <img src={favicon} height={30} alt="Petlover" />
        <Search />
      </div>
      <ul className="nav-links">
        <li key="all">
          {/* This link should have an activeClassName and exact prop */}
          <Link
            to="/"
            activeClassName="nav-link-active"
          >
            All Pets
          </Link>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                {/* These links should have an activeClassName prop */}
                <Link
                  to={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  activeClassName="nav-link-active"
                >
                  {type.name}s
                </Link>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
