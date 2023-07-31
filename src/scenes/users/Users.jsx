import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import UserCreateModal from "./components/UserCreateModal/UserCreateModal";
import { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { tokens } from "../../theme";
import { useQuery } from "react-query";
import { API, getBlogPostData } from "../../api";
import { PAGE_SIZE } from "../team";

const Users = () => {
  const theme = useTheme();
  const [memberPage, setMemberPage] = useState(1);
  const colors = tokens(theme.palette.mode);
  const {
    data,
    isLoading: singleStatisticsLoading,
    refetch,
  } = useQuery("getUsersData", async () => {
    const res = await API.getUserData()
      .then((res) => res.data)
      .catch((err) => console.log("userlar mavjud emas", err));
    return res;
  });
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
        height={"80vh"}
      >
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }
  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of Invoice Balances" />
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
        }}
      >
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{
                backgroundColor: "rgb(220, 220, 220)",
              }}
            >
              <TableRow>
                <TableCell>
                  <b>
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>firstName</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>lastName</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>username</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>phoneNumber</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>address</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <UserCreateModal refetch={refetch} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberTableData?.length > 0 &&
                memberTableData?.map((company) => (
                  <>
                    <TableRow key={company.id}>
                      <img
                        src={company.photo?.filePath}
                        height={50}
                        width={80}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      <TableCell>{company.firstName}</TableCell>
                      <TableCell>{company.lastName}</TableCell>
                      <TableCell>{company.username}</TableCell>
                      <TableCell>{company.phoneNumber}</TableCell>
                      <TableCell>{company.address}</TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* <EditModal id={company.id} /> */}
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

export default Users;
