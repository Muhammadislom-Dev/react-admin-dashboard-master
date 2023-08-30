import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import { API, getStaticsData } from "../../api";
import LineChart from "../chart";
import LineChartUser from "../chart/line";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useQuery("static", getStaticsData);
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
        <LineChart />
        <LineChartUser />
      </Box>
    </Box>
  );
};

export default Dashboard;
