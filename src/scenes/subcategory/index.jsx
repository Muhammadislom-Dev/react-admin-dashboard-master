import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { deteleCategoryData, getCategoryData, getEmailData } from "../../api";
import { toast } from "react-toastify";
import CreateCategory from "./CreateCategory";

const SubCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, refetch } = useQuery("emailData", getEmailData);

  console.log(data);
  return (
    <Box m="20px">
      <Header title="Email" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>
                    <i>Email</i>
                  </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.objectKoinot?.content?.length > 0 &&
                data?.objectKoinot?.content?.map((worker) => (
                  <>
                    <TableRow key={worker.id}>
                      <TableCell>{worker.email}</TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SubCategory;
