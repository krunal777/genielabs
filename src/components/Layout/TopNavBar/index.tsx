/* eslint-disable */
import './style.css';
import { UseAppContext } from '../../../contexts/appContext';

function TopNavBar() {
  const appContext = UseAppContext();

  return (
    <div className="TopNavBar">
      {sessionStorage.getItem("API_KEY") == "4e20eed8-c3f0-4309-b73a-aa5f742ce217" ?  <img src="/Rival_rides_logo.png" style={{height:80}}/> : <img src="images/game_name.svg" style={{height:40}}/> 
     }
      <span>Game name</span>
    </div>
  );
}

export default TopNavBar;
