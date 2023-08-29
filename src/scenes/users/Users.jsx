import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import UserCreateModal from "./components/UserCreateModal/UserCreateModal";
import { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { tokens } from "../../theme";
import { useQuery } from "react-query";
import { getUserData } from "../../api";
import { PAGE_SIZE } from "../team";
import Pagination from "../../components/Pagination";
import UserEditModal from "./UserEditModal";

const Users = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState("ROLE_USER");
  const [memberPage, setMemberPage] = useState(1);
  const colors = tokens(theme.palette.mode);
  const {
    data,
    isLoading: singleStatisticsLoading,
    refetch,
  } = useQuery(["paramsDataUser", formData], () => getUserData(formData));

  const memberTableData = useMemo(() => {
    const firstPageIndex = (memberPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return (
      !!data?.objectKoinot?.content &&
      data?.objectKoinot.content?.slice(firstPageIndex, lastPageIndex)
    );
  }, [memberPage, data?.objectKoinot?.content]);
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
      <Header title="Users" subtitle="List of Invoice Balances" />
      <Box>
        <FormControl sx={{ width: 300, border: "2px solid gray" }}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}>
            <MenuItem value="ROLE_MODERATOR">ROLE_MODERATOR</MenuItem>
            <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
            <MenuItem value="ROLE_USER">ROLE_USER</MenuItem>
            <MenuItem value="ROLE_SUPPER_ADMIN">ROLE_SUPPER_ADMIN</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
            <TableHead>
              <TableRow>
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
                          }}>
                          <UserEditModal id={company.id} />
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
