import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import { API, getStaticsData } from "../../api";
import LineChart from "../chart";
import LineChartUser from "../chart/line";
import LineChartPhone from "../chart/phone";
import LineChartProduct from "../chart/product";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDay();
  const conditionTime = `${year}-${month}-${day}`;
  const [value, setValue] = React.useState("2023-09-01");
  const [valueOne, setValueOne] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const { data } = useQuery(["static", value, valueOne], () =>
    getStaticsData(value, valueOne)
  );

  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
      m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <input
            type="date"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{
              padding: "10px 18px",
              border: "1px solid #fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
          <input
            type="date"
            onChange={(e) => setValueOne(e.target.value)}
            value={valueOne}
            style={{
              padding: "10px 18px",
              border: "1px solid #fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              width: "250px",
              borderRadius: "10px",
              padding: "10px",
              background: "#1F2A40",
              margin: "10px 0",
            }}>
            Ro'yhatdan o'tkanlar soni
            <Typography
              sx={{
                fontSize: "40px",
                lineHeight: "45px",
              }}>
              {data?.objectKoinot?.users}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "250px",
              borderRadius: "10px",
              padding: "10px",
              background: "#1F2A40",
              margin: "10px 0",
            }}>
            Mahsulotlar Soni
            <Typography
              sx={{
                fontSize: "40px",
                lineHeight: "45px",
              }}>
              {data?.objectKoinot?.products}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "250px",
              borderRadius: "10px",
              padding: "10px",
              background: "#1F2A40",
              margin: "10px 0",
            }}>
            Mahsulot ko'rishlar soni
            <Typography
              sx={{
                fontSize: "40px",
                lineHeight: "45px",
              }}>
              {data?.objectKoinot?.seenProducts}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "250px",
              borderRadius: "10px",
              padding: "10px",
              background: "#1F2A40",
              margin: "10px 0",
            }}>
            Telefon raqam ko'rishlar soni
            <Typography
              sx={{
                fontSize: "40px",
                lineHeight: "45px",
              }}>
              {data?.objectKoinot?.seenPhoneNumbers}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: "80vh", overflowY: "auto" }}>
          <LineChartUser value={value} valueOne={valueOne} />
          <LineChartProduct value={value} valueOne={valueOne} />
          <LineChart value={value} valueOne={valueOne} />
          <LineChartPhone value={value} valueOne={valueOne} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
