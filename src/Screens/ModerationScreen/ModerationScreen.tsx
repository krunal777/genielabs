/* eslint-disable */
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import BlockIcon from "@material-ui/icons/Block";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ModerationRecord from "../../components/ModerationRecord/ModerationRecord";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Approve_icon from "../../images/approved.svg";
import blocked_icon from "../../images/blocked.svg";

import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// time 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { CSVLink } from 'react-csv';



const names = ["Avatar clothing", "Weapons", "Environment"];

function showDoneIcon() {
  return Math.random() < 0.6; // 60% chance to return true
}

const extractDate = (dateTimeStr: string): string => {
  const dateObj = new Date(dateTimeStr);
  return dateObj.toISOString().split("T")[0];
};

const extractTime = (dateTimeStr: string): string => {
  const dateObj = new Date(dateTimeStr);
  return dateObj.toTimeString().split(" ")[0];
};


export default function ModerationScreen() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<[ColumnType] | []>([]);

  const [rowData, setRowData] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");

  const [generator, setGenerator] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof generator>) => {
    const {
      target: { value },
    } = event;
    setGenerator(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownRefLevel = useRef<HTMLDivElement | null>(null);

  const handleGetItem = () => {
    console.log("first")
  }

  
  const Columns = [
    "Suspect level",
    "Generator",
    "Model",
    "Prompt",
    "Date",
    "Time",
    "User ID",
  ];

  interface ColumnType {
    Status: string;
    preview_s3_path: string;
    prompt: string;
    creation_time: string;
    "User ID": string;
    uuid: string;
  }

  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);

  const toggleDropdownUser = () => {
    setIsOpen(!isOpen);
  };
  
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [startDate, setStartDate] = useState(new Date());

  const [isOpenLevel, setIsOpenLevel] = useState(false);

  const toggleDropdownLevel = () => {
    setIsOpenLevel(!isOpenLevel);
  };

  const closeDropdownLevel = () => {
    setIsOpenLevel(false);
  };

  useEffect(() => {
    api.get("/get_revisions?limit=10").then((res) => {
      if (res.data) {
        setTableData(res.data);
      }
    });

    // outside click close
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
        closeDropdownLevel();
      }
    };

    const handleClickOutsideLevel = (event: MouseEvent) => {
      if (dropdownRefLevel.current && !dropdownRefLevel.current.contains(event.target as Node)) {
        closeDropdown();
        closeDropdownLevel();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    if(isOpenLevel) 
    {
      window.addEventListener('click', handleClickOutsideLevel);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('click', handleClickOutsideLevel);
    };
  }, [isOpen,isOpenLevel]);


  // sorting
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState(tableData);

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // Sort the data based on 'time'
    const sorted = tableData.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.creation_time.localeCompare(b.creation_time);
      } else {
        return b.creation_time.localeCompare(a.creation_time);
      }
    });

    console.log(sorted);
    // setSortedData(sorted);
  };




  return (
    <div className="moderation_wrapper">
      <div className="top_heading">
        <h2>Moderation Log</h2>
        <button className="start_over_btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.8216 15C19.5618 18.8327 15.9539 21.6 11.6996 21.6C6.39768 21.6 2.09961 17.302 2.09961 12C2.09961 6.69809 6.39768 2.40002 11.6996 2.40002C14.8094 2.40002 17.5739 3.87872 19.3283 6.17137M20.0153 7.20002C19.8081 6.84187 19.5785 6.49834 19.3283 6.17137M19.3283 6.17137L17.0996 8.40002H21.8996V3.60002L19.3283 6.17137ZM19.4996 8.00002L20.9996 6.00002"
              stroke="#343434"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Start over
        </button>
      </div>

      {/* record */}
      <ModerationRecord />
      {/* record */}

      <div className="filter_wrapper">
        <div className="col_filter">
          <input id="search-text" placeholder="Enter text" />
        </div>
        <div className="col_filter">
          {/* <InputLabel id="demo-multiple-checkbox-label">Generator</InputLabel> */}
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            displayEmpty
            value={generator}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>Generator</span>;
              }
              return selected.join(", ");
            }}
            
            inputProps={{ "aria-label": "Without label" }}
            IconComponent = {KeyboardArrowDownIcon}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={generator.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
            <Button variant="contained" className="apply_btn">Apply</Button>
          </Select>
        </div>
        <div className="col_filter">
          <div className="custom-dropdown" ref={dropdownRef}>
              <div className="dropdown-trigger" onClick={toggleDropdownUser}>
                  User ID
              </div>
              {isOpen && (
                <div className="dropdown-content">
                    <input
                      type="text"
                      placeholder="Enter user ID"
                    />
                    <Button variant="contained" className="apply_btn">Apply</Button>
                </div>
              )}
          </div>
        </div>
        <div className="col_filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Date" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="col_filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="col_filter">
            <div className="custom-dropdown suspect_level" ref={dropdownRefLevel}>
                <button className="dropdown-trigger" onClick={toggleDropdownLevel}>
                  Suspect level
                </button>
                {isOpenLevel && (
                  <div className="dropdown-content">
                    {/* Dropdown content here */}
                    <ul>
                      <li>
                        <span>
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M2.75 9.54876C2.75 6.61764 2.75 5.15208 3.09606 4.65904C3.44211 4.16599 4.82013 3.69429 7.57617 2.75089L8.10125 2.57115C9.5379 2.07938 10.2562 1.8335 11 1.8335C11.7438 1.8335 12.4621 2.07938 13.8988 2.57115L14.4238 2.75089C17.1799 3.69429 18.5579 4.16599 18.9039 4.65904C19.25 5.15208 19.25 6.61764 19.25 9.54876C19.25 9.99151 19.25 10.4716 19.25 10.9922C19.25 16.1605 15.3643 18.6685 12.9263 19.7335C12.265 20.0224 11.9343 20.1668 11 20.1668C10.0657 20.1668 9.73501 20.0224 9.07368 19.7335C6.63571 18.6685 2.75 16.1605 2.75 10.9922C2.75 10.4716 2.75 9.99151 2.75 9.54876Z" stroke="#40B059" strokeWidth="1.5"/><path d="M8.7085 11.3665L10.018 12.8332L13.2918 9.1665" stroke="#40B059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        Approved
                      </li>
                      <li>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                              <path d="M2.75 9.54876C2.75 6.61764 2.75 5.15208 3.09606 4.65904C3.44211 4.16599 4.82013 3.69429 7.57617 2.75089L8.10125 2.57115C9.5379 2.07938 10.2562 1.8335 11 1.8335C11.7438 1.8335 12.4621 2.07938 13.8988 2.57115L14.4238 2.75089C17.1799 3.69429 18.5579 4.16599 18.9039 4.65904C19.25 5.15208 19.25 6.61764 19.25 9.54876C19.25 9.99151 19.25 10.4716 19.25 10.9922C19.25 16.1605 15.3643 18.6685 12.9263 19.7335C12.265 20.0224 11.9343 20.1668 11 20.1668C10.0657 20.1668 9.73501 20.0224 9.07368 19.7335C6.63571 18.6685 2.75 16.1605 2.75 10.9922C2.75 10.4716 2.75 9.99151 2.75 9.54876Z" stroke="#FFA438" strokeWidth="1.5"/>
                              <path d="M11 7.3335V11.0002" stroke="#FFA438" strokeWidth="1.5" strokeLinecap="round"/>
                              <circle cx="11.0002" cy="13.7502" r="0.916667" fill="#FFA438"/>
                            </svg>
                        </span>
                        Warned
                      </li>
                      <li>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M2.75 9.54876C2.75 6.61764 2.75 5.15208 3.09606 4.65904C3.44211 4.16599 4.82013 3.69429 7.57617 2.75089L8.10125 2.57115C9.5379 2.07938 10.2562 1.8335 11 1.8335C11.7438 1.8335 12.4621 2.07938 13.8988 2.57115L14.4238 2.75089C17.1799 3.69429 18.5579 4.16599 18.9039 4.65904C19.25 5.15208 19.25 6.61764 19.25 9.54876C19.25 9.99151 19.25 10.4716 19.25 10.9922C19.25 16.1605 15.3643 18.6685 12.9263 19.7335C12.265 20.0224 11.9343 20.1668 11 20.1668C10.0657 20.1668 9.73501 20.0224 9.07368 19.7335C6.63571 18.6685 2.75 16.1605 2.75 10.9922C2.75 10.4716 2.75 9.99151 2.75 9.54876Z" stroke="#F75656" strokeWidth="1.5"/>
                            <path d="M13.2918 8.7085L8.70852 13.2918M8.7085 8.70848L13.2918 13.2918" stroke="#F75656" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </span>
                        Blocked
                      </li>
                      <li>
                        <Button variant="contained" className="apply_btn">Apply</Button>
                      </li>
                    </ul>                    
                  </div>
                )}
            </div>
        </div>
      </div>

      <div className="table_wrap">
        <div className="table_operation">
          <div className="top_button">
            <button className="icon_btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.822 14.9999C19.5623 18.8326 15.9544 21.5999 11.7001 21.5999C6.39816 21.5999 2.1001 17.3018 2.1001 11.9999C2.1001 6.69797 6.39816 2.3999 11.7001 2.3999C14.8099 2.3999 17.5744 3.8786 19.3288 6.17125M20.0158 7.1999C19.8086 6.84175 19.579 6.49822 19.3288 6.17125M19.3288 6.17125L17.1001 8.3999H21.9001V3.5999L19.3288 6.17125ZM19.5001 7.9999L21.0001 5.9999" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>    
            <CSVLink data={tableData} filename="data.csv">
              <button className="export icon_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {" "}
                  <path
                    d="M3.6001 15.2198V18.9257C3.6001 19.4873 3.82135 20.026 4.21517 20.4231C4.609 20.8202 5.14314 21.0434 5.7001 21.0434H18.3001C18.8571 21.0434 19.3912 20.8202 19.785 20.4231C20.1788 20.026 20.4001 19.4873 20.4001 18.9257V15.2198M12.0435 14.9566L12.0435 2.95663M12.0435 2.95663L7.24346 7.54179M12.0435 2.95663L16.8434 7.54179"
                    stroke="#343434"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </svg>
                Export
              </button>
            </CSVLink>
            
            <button className="setting icon_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.75602 4.25546L10.0271 2.42882C10.214 2.16017 10.5206 2 10.8479 2H12.653C12.9791 2 13.2847 2.15898 13.4719 2.426L14.7297 4.22032M8.75602 4.25546C8.40917 4.75031 7.83262 4.99279 7.22068 4.94956M8.75602 4.25546C8.40748 4.74912 7.83262 4.9948 7.22068 4.94956M7.22068 4.94956L4.97158 4.80836C4.65073 4.78821 4.33977 4.92355 4.13585 5.17208L2.99534 6.56208C2.77914 6.82557 2.71204 7.18104 2.8173 7.50522L3.47315 9.52504M3.47315 9.52504C3.56207 9.81338 3.57345 10.1223 3.50981 10.414M3.47315 9.52504C3.56334 9.81286 3.5743 10.1211 3.50939 10.417M3.50981 10.414C3.44533 10.7023 3.3071 10.9745 3.10185 11.1949M3.50981 10.414L3.50939 10.417M3.10185 11.1949L1.61575 12.7933C1.38735 13.0389 1.29732 13.3827 1.376 13.7088L1.77856 15.377C1.85699 15.702 2.09263 15.9663 2.40653 16.0813L4.44838 16.8297C4.73328 16.9399 4.97941 17.1191 5.16569 17.3449M3.10185 11.1949C3.30836 10.9763 3.44533 10.705 3.50939 10.417M5.16569 17.3449C5.35071 17.5713 5.47672 17.8445 5.52561 18.1404M5.16569 17.3449C5.35239 17.5713 5.47883 17.8438 5.52561 18.1404M5.16569 17.3449L5.16274 17.3416C5.15052 17.3268 5.13745 17.3114 5.12481 17.297M5.52561 18.1404L5.87327 20.2759C5.92654 20.6031 6.13849 20.8827 6.43917 21.0223L8.0671 21.7781C8.35817 21.9132 8.6964 21.9005 8.97646 21.7438L10.8902 20.6731M10.8902 20.6731C11.1553 20.5242 11.4512 20.4495 11.747 20.4491M10.8902 20.6731C10.9952 20.6134 11.1052 20.5657 11.2181 20.5299C11.3897 20.4756 11.5684 20.4488 11.747 20.4491M11.747 20.4491C11.9009 20.4495 12.0547 20.4698 12.2047 20.51C12.3442 20.5474 12.48 20.6018 12.6085 20.6731M11.747 20.4491C12.0442 20.4487 12.3417 20.5234 12.6085 20.6731M12.6085 20.6731L14.612 21.7576C14.8932 21.9099 15.2304 21.9185 15.519 21.7806L17.1391 21.0068C17.4387 20.8637 17.6478 20.5812 17.6971 20.2529L18.0085 18.178M18.0085 18.178C18.0553 17.8805 18.1796 17.6052 18.3642 17.3768M18.0085 18.178C18.0536 17.8798 18.1788 17.6049 18.3642 17.3768M18.3642 17.3768C18.5476 17.1508 18.7907 16.9707 19.074 16.8593M18.3642 17.3768C18.5471 17.1499 18.7895 16.9693 19.074 16.8593M19.074 16.8593L21.1369 16.0508C21.4449 15.9301 21.6733 15.6649 21.7469 15.3425L22.1326 13.6539C22.2061 13.3323 22.1162 12.9952 21.8924 12.7528L20.3973 11.134M20.3973 11.134C20.1883 10.9128 20.0424 10.6485 19.9716 10.3677M20.3973 11.134C20.2991 11.0307 20.2148 10.9177 20.1461 10.798C20.0677 10.662 20.0092 10.5173 19.9716 10.3677M19.9716 10.3677C19.9021 10.0889 19.9063 9.79349 19.9944 9.50752L20.641 7.43487C20.7414 7.11307 20.6729 6.76235 20.4588 6.50196L19.3464 5.14894C19.1401 4.89805 18.8249 4.76298 18.5009 4.7867L16.2776 4.94956M16.2776 4.94956C15.9733 4.97104 15.6741 4.91308 15.4078 4.78839M16.2776 4.94956C15.9729 4.97228 15.6741 4.91385 15.4078 4.78839M15.4078 4.78839C15.1397 4.6621 14.9046 4.4679 14.7297 4.22032M15.4078 4.78839C15.1393 4.66256 14.9037 4.46888 14.7297 4.22032M3.50939 10.417L3.51024 10.4126M15.1359 12.0106C15.1359 13.8756 13.59 15.3874 11.6834 15.3874C9.77677 15.3874 8.23089 13.8756 8.23089 12.0106C8.23089 10.1457 9.77677 8.63386 11.6834 8.63386C13.59 8.63386 15.1359 10.1457 15.1359 12.0106Z"
                  stroke="#343434"
                  strokeWidth="1.5"
                />
              </svg>
              Settings
            </button>
          </div>
        </div>
        <div className="screen">
           <div className="filter_wrapper">
              
           </div>       

          {tableData.length > 0 ? (
            <TableContainer
              component={Paper}
              style={{ width: "100%", height: "70vh" }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                style={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    {Columns.map((item) => (
                      <TableCell
                        align="center"
                        key={item}
                        style={{ fontWeight: "bold", fontSize: 18 }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row["uuid"]}>
                      <TableCell align="center">
                        {/* {showDoneIcon() ? <DoneOutlineIcon />: <BlockIcon />} */}
                        {showDoneIcon() ? (
                          <div className="level_status">
                            <img src={Approve_icon} alt="" />
                            <span>Approved</span>
                          </div>
                        ) : (
                          <div className="level_status">
                            <img src={blocked_icon} alt="" />
                            <span>Blocked</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell align="center">Avatar clothing</TableCell>
                      <TableCell align="center">
                        <div className="avtar_img">
                          <img
                            src={row.preview_s3_path}
                            alt={row.preview_s3_path}
                            // onMouseEnter={() => setHoveredImage(row.preview_s3_path)}
                            // onMouseLeave={() => setHoveredImage(null)}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">{row.prompt}</TableCell>
                      <TableCell align="center">
                        {extractDate(row.creation_time)}
                      </TableCell>
                      <TableCell align="center">
                        {extractTime(row.creation_time)}
                      </TableCell>
                      <TableCell align="center">{row.uuid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div  className='loader_wrapper'>
              <div className='loader'></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



