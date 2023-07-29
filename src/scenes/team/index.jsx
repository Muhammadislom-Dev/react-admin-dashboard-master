import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useQuery } from "react-query";
import { getTagData } from "../../api";
import CreateModal from "./CreatModal";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading: singleWorkerLoading } = useQuery(
    "tagData",
    getTagData
  );
  return (
    <Box m="20px">
      <Header title="TAG" subtitle="Tag Name" />
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
        }}>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{
                backgroundColor: "rgb(220, 220, 220)",
              }}>
              <TableRow>
                <TableCell>
                  <b>
                    <i>Tag Name</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.objectKoinot.content?.length > 0 &&
                data?.objectKoinot.content.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.tag}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}>
                        <Button
                          color="error"
                          // onClick={handleDelete.bind(null, worker?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Team;
