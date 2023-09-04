import { Box, FormControl, MenuItem, Select } from "@mui/material";
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
import {
  deteleCategoryData,
  getCategoryByIdData,
  getCategoryData,
} from "../../api";
// import CreateModal from "./CreatModal";
// import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import { useState } from "react";
import CreateModal from "./CreateModal";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "./EditModal";
// import EditModal from "./EditModal";
// import SubCategoryData from "./SubCategory";

const ChildCategory = () => {
  const theme = useTheme();
  const [subcategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState(3);
  const colors = tokens(theme.palette.mode);
  const { data, refetch } = useQuery(
    ["paramsSubCategory", category, setSubCategory],
    () => getCategoryByIdData(category, setSubCategory)
  );

  const { data: categoryData } = useQuery("categoryData", getCategoryData);

  const { mutate } = useMutation(async (userId) => {
    return await deteleCategoryData(userId)
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

  return (
    <Box m="20px">
      <Header title="Sub Kategoriyalar" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        Kategoriyalar
        <FormControl sx={{ width: 300, border: "2px solid gray" }}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            {categoryData?.objectKoinot?.map((evt, index) => (
              <MenuItem key={index} value={evt.id}>
                {evt.nameUz}
              </MenuItem>
            ))}
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
                    <i>Name Uz</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Name Ru</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal category={category} refetch={refetch} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategory?.objectKoinot?.children?.length > 0 &&
                subcategory?.objectKoinot?.children?.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.nameUz}</TableCell>
                    <TableCell>{worker.nameRu}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}>
                        <DeleteModal mutate={mutate} data={worker?.id} />
                        <EditModal
                          refetch={refetch}
                          category={category}
                          data={worker.id}
                        />
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

export default ChildCategory;
