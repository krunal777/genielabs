/* eslint-disable */
import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import BlockIcon from '@material-ui/icons/Block';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

function showDoneIcon() {
  return Math.random() < 0.6; // 60% chance to return true
}

const extractDate = (dateTimeStr: string): string => {
  const dateObj = new Date(dateTimeStr);
  return dateObj.toISOString().split('T')[0];
}

const extractTime = (dateTimeStr: string): string => {
  const dateObj = new Date(dateTimeStr);
  return dateObj.toTimeString().split(' ')[0];
}

export default function ModerationScreen() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<[ColumnType] | []>([]);

  useEffect(() => {
      api.get("/get_revisions?limit=10").then(res => {
        if (res.data) {
          setTableData(res.data);
        }
      });
  }, []);

  const Columns = [
    "Status",  "Model", "Prompt", "Date", 
    "Time", "Creation ID"
  ];

  interface ColumnType {
    "Status": string, 
    preview_s3_path: string,
    prompt: string,
    creation_time: string,
    "User ID": string,
    uuid: string
  }

  return (
    <div className="screen">
      {tableData.length > 0 ? (
        <TableContainer component={Paper} style={{ width: "100%", height: "70vh" }}>
          <Table aria-label="flexible table" style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {Columns.map(item => (
                  <TableCell align="center" key={item} style={{fontWeight:"bold", fontSize:18}}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row['uuid']}>
    <TableCell align="center">
      {showDoneIcon() ? <DoneOutlineIcon /> : <BlockIcon />}
    </TableCell>

                  <TableCell align="center">
                    <img 
                      src={row.preview_s3_path} 
                      alt = {row.preview_s3_path}
                      style={{
                        height: hoveredImage === row.preview_s3_path ? 200 : 100,
                        width: hoveredImage === row.preview_s3_path ? 150 : 75,
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={() => setHoveredImage(row.preview_s3_path)}
                      onMouseLeave={() => setHoveredImage(null)}
                    />
                  </TableCell>
                  <TableCell align="center">{row.prompt}</TableCell>
                  <TableCell align="center">{extractDate(row.creation_time)}</TableCell>
                  <TableCell align="center">{extractTime(row.creation_time)}</TableCell>
                  <TableCell align="center">{row.uuid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : "Loading..."}
    </div>
  );
}
