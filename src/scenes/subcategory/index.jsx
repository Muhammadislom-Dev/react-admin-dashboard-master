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
import { deteleCategoryData, getCategoryData } from "../../api";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import CreateCategory from "./CreateCategory";
import EditModal from "./EditModal";
// import EditModal from "./EditModal";

const SubCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data,
    isLoading: singleCompanyLoading,
    refetch,
  } = useQuery("categoryData", getCategoryData);

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
                  <CreateCategory refetch={refetch} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.objectKoinot?.length > 0 &&
                data?.objectKoinot.map((worker) => (
                  <>
                    {worker.children.map((children) => (
                      <TableRow key={children.id}>
                        <TableCell>{children.nameUz}</TableCell>
                        <TableCell>{children.nameRu}</TableCell>
                        <TableCell align="right">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}>
                            <DeleteModal mutate={mutate} data={children?.id} />
                            <EditModal edit={children.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
