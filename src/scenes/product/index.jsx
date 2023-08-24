import { Box, CircularProgress } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { deteleProductData, getProductData } from "../../api";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import ProductCreate from "./ProductCreate";
import { useMemo } from "react";
import { PAGE_SIZE } from "../team";
import { useState } from "react";
import Pagination from "../../components/Pagination";

const Product = () => {
  const [memberPage, setMemberPage] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: product,
    refetch,
    isLoading,
  } = useQuery("productData", getProductData);

  const { mutate } = useMutation(async (userId) => {
    return await deteleProductData(userId)
      .then((res) => {
        toast.success("Malumot muvaffaqiyatli o'chirildi!");
        toast.success("Ma'lumotlar yangilandi!");
        refetch();
        window.location.reload();
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
      !!product?.content &&
      product?.content?.slice(firstPageIndex, lastPageIndex)
    );
  }, [memberPage, product?.content]);

  if (isLoading) {
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
      <Header title="Mahsulotlar" />
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
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Name Uz</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>{/* <i>Name Uz</i> */}</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberTableData?.length > 0 &&
                memberTableData?.map((worker) => (
                  <>
                    <TableRow key={worker.id}>
                      <img
                        src={worker.photos[0]?.filePath}
                        height={50}
                        width={80}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <TableCell>{worker.name.slice(0, 25)}</TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}>
                          <DeleteModal mutate={mutate} data={worker?.id} />
                          <ProductCreate refetch={refetch} edit={worker.id} />
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
            totalCount={!!product?.content && product?.content?.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setMemberPage(page)}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Product;
