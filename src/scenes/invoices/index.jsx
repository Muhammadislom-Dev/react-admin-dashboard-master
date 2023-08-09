import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import CreateModal from "./CreatModal";
import { getBlogPostData } from "../../api";
import { useMutation, useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useMemo, useState } from "react";
import { PAGE_SIZE } from "../team";
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "./EditModal";

const Invoices = () => {
  const theme = useTheme();
  const [memberPage, setMemberPage] = useState(1);
  const colors = tokens(theme.palette.mode);
  const {
    data,
    isLoading: singleStatisticsLoading,
    refetch,
  } = useQuery("blogPostData", getBlogPostData);

  const memberTableData = useMemo(() => {
    const firstPageIndex = (memberPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return (
      !!data?.objectKoinot.content &&
      data?.objectKoinot.content?.slice(firstPageIndex, lastPageIndex)
    );
  }, [memberPage, data?.objectKoinot.content]);
  if (singleStatisticsLoading) {
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
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Name</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal refetch={refetch} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberTableData?.length > 0 &&
                memberTableData?.map((company) => (
                  <>
                    <TableRow key={company.id}>
                      <img
                        src={company.photo.filePath}
                        height={50}
                        width={80}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      <TableCell>{company.name}</TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}>
                          <EditModal id={company.id} refetch={refetch} />
                          {/* <DeleteModal mutate={mutate} data={worker?.id} /> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
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

export default Invoices;
