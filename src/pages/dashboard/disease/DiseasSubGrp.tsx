import react, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  ButtonGroup,
  Modal,
  Backdrop,
  Fade,
  Paper,
  Typography,
  TextField,
  Stack,
  Container,
} from "@mui/material";
import { DiseaseListResults } from "../../../components/disease/disease/DiseaseListResults";
import { DiseaseListToolbar } from "../../../components/disease/disease/DiseaseListToolbar";
import DashLayout from "../../layouts/dashboard";
import {
  getProfile,
  createProfile,
  getSingleProfile,
} from "../../../api/profile";
import { NavLink, useParams } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "primary.main",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

export default function DiseasSubGrp(props: any) {
  const [diseaseList, setDiseaseList]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(true);
  const [open, setOpen] = useState(false);
  const [disease, setDiseas]: any = useState("");
  const [desc, setDesc]: any = useState("");
  let { id } = useParams();

  const getDocs = async () => {
    const disease = await getSingleProfile("/DiseaseType", `${id}/Diseases`);
    setDiseaseList(disease);
    setIsLoading(false);
  };
  useEffect(() => {
    getDocs();
  }, []);

  useEffect(() => {
    getDocs();
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const saveDiseas = async (e: any) => {
    const payload = {
      name: disease,
      diseaseTypeId: id,
      description: desc,
    };
    const mainC: any = await createProfile(`/Disease`, payload);
    setOpen(false);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              بیماری
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button onClick={handleOpen} color="primary" variant="contained">
                افزودن گروه بیماری جدید
              </Button>
            </Box>
          </Box>
          {/* <CustomerListToolbar /> */}
          <Box sx={{ mt: 3 }}>
            <DiseaseListResults customers={diseaseList} isLoading={isLoading} />
          </Box>
        </Container>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid spacing={2} sx={style} container>
            <Grid item>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                افزودن بیماری
              </Typography>
            </Grid>
            <Grid>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </Grid>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="بیماری"
                variant="outlined"
                fullWidth
                value={disease}
                onChange={(e: any) => setDiseas(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="توضیحات"
                variant="outlined"
                fullWidth
                value={desc}
                onChange={(e: any) => setDesc(e.target.value)}
              />
            </FormControl>
            <Divider />
            <Grid sx={{ mt: 2 }}>
              <Button variant="contained" onClick={saveDiseas}>
                ثبت
              </Button>
              <Button variant="text" onClick={() => setOpen(false)}>
                انصراف
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
}
