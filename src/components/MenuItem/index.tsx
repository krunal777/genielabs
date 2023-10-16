import React from 'react';
import './style.css';

interface MenuItemProps {
  value: string;
  logoClass: string;
  menuIcon: string;
  isDisabled?: boolean;  
}

function MenuItem(props: MenuItemProps) {
  return (
    <div className={`MenuItem ${props.isDisabled ? 'disabled' : ''}`}>
      <img src={props.menuIcon} alt="" />
      {props.value}
    </div>
  );
}

export default MenuItem;
