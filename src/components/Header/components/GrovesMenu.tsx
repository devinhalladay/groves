import { Menu, MenuItem } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useUser } from '@context/user-context';
import React, { useState } from 'react';

const GrovesMenu = () => {
  const { currentUser } = useUser();

  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  return (
    <Popover2
      position="bottom-left"
      content={
        <Menu>
          <MenuItem icon="blank" text={`Welcome, ${currentUser.me.name}`} />
          <MenuItem icon="log-out" text="Logout" onClick={() => signOut()} />
        </Menu>
      }
    >
      <button className="groves-menu-button">
        <div className="icon icon--caret-down">
          <svg
            width="12"
            height="12"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.07069 3.53553L4.53516 7.07107L0.999622 3.53553"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>
      </button>
    </Popover2>
  );
};

export default GrovesMenu;
