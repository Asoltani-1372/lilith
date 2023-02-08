import { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from "../../api/profile";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';



const states = [
  {
    value: 'tehran',
    label: 'تهران'
  },
  {
    value: 'mashhad',
    label: 'مشهد'
  },
  {
    value: 'Yazd',
    label: 'یزد'
  }
];



export const AccountProfileDetails = (props: any) => {
  const  id  = useSelector((state :any) => state.UserID)
  console.log(id , "this is iddd")
  const [values, setValues] = useState({
    // firstName: 'عباس',
    // lastName: 'عباس پور',
    // email: 'demo@devias.io',
    // phone: '',
    // state: 'tehran',
    // country: 'ایران'
  });



  const getAccountProfileDetails = async () => {
    console.log(id , "22222222222")
    const ProfileDetails: any = await getProfile(`/person/${id.id}`);
    setValues(ProfileDetails);
  }

  useEffect( () => {
    getAccountProfileDetails();
  } ,[])

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="نام"
                name="firstName"
                onChange={handleChange}
                required
                value={"values.firstName"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="نام خانوادگی"
                name="lastName"
                onChange={handleChange}
                required
                value={"values.lastName"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="پست الکترونیکی"
                name="email"
                onChange={handleChange}
                required
                value={"values.email"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="شماره تماس"
                name="phone"
                onChange={handleChange}
                type="number"
                value={"values.phone"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="کشور"
                name="country"
                onChange={handleChange}
                required
                value={"values.country"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="شهر"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={"values.state"}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
