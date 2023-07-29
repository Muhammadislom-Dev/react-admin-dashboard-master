import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { deteleTagData, getTagData } from "../../api";
import CreateModal from "./CreatModal";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import EditModal from "./EditModal";
import { useMemo } from "react";
import { useState } from "react";
import Pagination from "../../components/Pagination";

export const PAGE_SIZE = 10;

const Team = () => {
  const [memberPage, setMemberPage] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data,
    refetch,
    isLoading: singleWorkerLoading,
  } = useQuery("tagData", getTagData);
  const { mutate } = useMutation(async (userId) => {
    return await deteleTagData(userId)
      .then((res) => {
        toast.success("Malumotlar yangilandi!");
        refetch();
      })
      .catch((err) => {
        console.log("Mutation error", err);
        console.log("Xatolik yuzberdi delete qilishda!");
      });
  });

  const memberTableData = useMemo(() => {
    const firstPageIndex = (memberPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return (
      !!data?.objectKoinot.content &&
      data?.objectKoinot.content?.slice(firstPageIndex, lastPageIndex)
    );
  }, [memberPage, data?.objectKoinot.content]);

  if (singleWorkerLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}>
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }
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
              {memberTableData?.length > 0 &&
                memberTableData.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.tag}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}>
                        <EditModal data={worker?.id} />
                        <DeleteModal mutate={mutate} data={worker?.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Pagination
            className="pagination-bar"
            currentPage={memberPage}
            totalCount={
              !!data?.objectKoinot.content && data?.objectKoinot.content?.length
            }
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setMemberPage(page)}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Team;
