import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

import UserDetail from "../../components/visit/UserDetail";
import UserMedicine from "../../components/visit/UserMedicine";
import UserIllnessSurgery from "../../components/visit/UserIllnessSurgery";

const steps = ["اطلاعات بیمار", "داروهای مصرفی", "بیماری های خاص و جراحی"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<any>());

  const [visit, setVisit] = useState({
    userDetail: {
      Height: 187,
      Weight: 87,
      Wrist: 19,
      BellyArea: 100,
      HipArea: 80,
      SleepHour: 5,
      Activity: 1,
      Appetite: 1,
      TopPressure: 12,
      BottomPressure: 8,
      Pulse: 70,
      HistricalEat: false,
      Diabete: undefined,
      Lipidemia: undefined,
    },
    Medicine: [{id: 1994,title: "The Shawshank Redemption"}],
    OtherMedicine : "",
    Disease : [{id: 1994,title: "The Shawshank Redemption"}],
    OtherDisease : "",
    Surgery : ""
  });

  const userDetailHandler = (e: any) => {
    let newUserDetail = {
      ...visit.userDetail,
      [e.target.name]: e.target.value,
    };
    setVisit((prev) => ({ ...prev, userDetail: { ...newUserDetail } }));
  };

  const UserMedicineHandler = (newMedicine: any) => {
    setVisit((prevVisit)=> ({...prevVisit , ...newMedicine}))
  };

  const UserIllnessSurgeryHandler = (newUserIllnessSurgery: any) => {
    setVisit((prevVisit)=> ({...prevVisit , ...newUserIllnessSurgery}))

  };

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const StepComponentHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <UserDetail
            userDetail={visit.userDetail}
            userDetailHandler={userDetailHandler}
          />
        );
      case 1:
        return <UserMedicine Medicine={visit.Medicine} OtherMedicine={visit.OtherMedicine}  UserMedicineHandler={UserMedicineHandler} />;
      case 2:
        return <UserIllnessSurgery Disease={visit.Disease} OtherDisease={visit.OtherDisease} Surgery={visit.Surgery} UserIllnessSurgeryHandler={UserIllnessSurgeryHandler} />;
    }
  };

  return (
      <Container maxWidth={false}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: any;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                ثبت با موفقیت انجام شد.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>ثبت ویزیت جدید</Button>
              </Box>
            </>
          ) : (
            <>
              <Grid sx={{ m: 5 }}>
                {StepComponentHandler()}
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  maxWidth: "10%",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  بازگشت
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "ثبت" : "بعدی"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
  );
}