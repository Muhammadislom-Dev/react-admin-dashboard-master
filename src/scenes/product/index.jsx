import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
import {
  deteleProductData,
  fetchDistrictData,
  fetchRegionData,
  getCategory,
  getProductData,
} from "../../api";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { PAGE_SIZE } from "../team";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import CheckboxData from "./Checkbox";
import Telegram from "./Telegram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ProductModal from "./Modal";

const Product = () => {
  const [memberPage, setMemberPage] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accepted, setAccepted] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const {
    data: product,
    refetch,
    isLoading,
  } = useQuery(
    ["paramsProductData", accepted, category, district, region],
    () => getProductData(accepted, category, district, region)
  );
  const { data: regionData } = useQuery("exampleData", fetchRegionData);

  const { data: districtData } = useQuery(["districtData", region], () =>
    fetchDistrictData(region)
  );

  const { data: categoryData } = useQuery("get category", getCategory);

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
      <Box sx={{ display: "flex", alignItems: "center", gap: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          Mahsulotlar
          <FormControl sx={{ width: 250, border: "2px solid gray" }}>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={accepted}
              onChange={(e) => setAccepted(e.target.value)}>
              <MenuItem value="ACCEPTED">Tasdiqlangan mahsulotlar</MenuItem>
              <MenuItem value="REJECTED">Bekor qilingan mahsulotlar</MenuItem>
              <MenuItem value="EDITED">O'zgartirilgan mahsulotlar</MenuItem>
              <MenuItem value="CREATED">Yaratilgan mahsulotlar</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          Viloyatlar
          <FormControl sx={{ width: 180, border: "2px solid gray" }}>
            <Select
              labelId="demo-multiple-name-label1"
              id="demo-multiple-name"
              value={region}
              onChange={(e) => setRegion(e.target.value)}>
              <MenuItem value="">Viloyatlar</MenuItem>
              {regionData?.objectKoinot?.content?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          Tumanlar
          <FormControl sx={{ width: 180, border: "2px solid gray" }}>
            <Select
              labelId="demo-multiple-name-label1"
              id="demo-multiple-name"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}>
              {districtData?.objectKoinot?.content?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          Category
          <FormControl sx={{ width: 180, border: "2px solid gray" }}>
            <InputLabel id="demo-simple-select-label2">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label1"
              id="demo-multiple-name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">Category</MenuItem>
              {categoryData?.objectKoinot?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.nameUz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
                <TableCell></TableCell>
                <TableCell></TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {memberTableData?.length > 0 &&
                memberTableData?.map((worker) => (
                  <>
                    <TableRow key={worker.id}>
                      {worker.photos ? (
                        <img
                          src={worker?.photos[0]?.filePath}
                          height={50}
                          width={80}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      ) : null}
                      <TableCell>{worker?.name?.slice(0, 25)}</TableCell>
                      {/* <TableCell>
                        <CheckboxData data={worker.id} />
                      </TableCell>
                      <TableCell>
                        <Telegram data={worker.id} />
                      </TableCell> */}
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}>
                          <ProductModal data={worker?.id} />
                        </div>
                        {/* <Telegram data={worker.id} /> */}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}>
                          <DeleteModal mutate={mutate} data={worker?.id} />
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
