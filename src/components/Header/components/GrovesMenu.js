import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '@context/auth-context';
import { useUser } from '@context/user-context';
import { Menu, MenuItem, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const GrovesMenu = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { currentUser } = useUser();

  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  return (
    <Popover position="bottom-left">
      <button className="groves-menu-button">
        <div className="icon icon--caret-down">
          <svg
            width="12"
            height="12"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.07069 3.53553L4.53516 7.07107L0.999622 3.53553"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>
      </button>

      <Menu>
        <MenuItem icon={IconNames.CLEAN} text={`Welcome, ${currentUser.me.name}`} />
        <MenuItem icon={IconNames.LOG_OUT} text="Logout" onClick={logout} />
      </Menu>
    </Popover>
  );
};

export default GrovesMenu;
