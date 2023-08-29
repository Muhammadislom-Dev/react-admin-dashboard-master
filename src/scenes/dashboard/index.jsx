import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import { API, getStaticsData } from "../../api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useQuery("static", getStaticsData);
  console.log(data);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
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
    </Box>
  );
};

export default Dashboard;
