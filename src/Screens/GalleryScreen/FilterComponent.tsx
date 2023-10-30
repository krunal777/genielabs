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


export default function FilterComponent() {
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
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);



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
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };


  }, [isOpen]);

  

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


  return (
    <div className="moderation_wrapper gallery_wrapper">
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
            <div className="custom-dropdown suspect_level" >
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
    </div>
  );
}
