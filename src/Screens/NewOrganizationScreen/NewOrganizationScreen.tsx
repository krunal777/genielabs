import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, TextField, Alert, Button, CircularProgress, Stepper, Step, StepLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "./NewOrganizationScreen.css";
import api from "../../api";
import UserPool from "../../components/UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

interface Object3DRow {
  parts: FileList | null;
  file: File;
}

const NewOrganizationScreen: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [organizationName, setOrganizationName] = useState<string>("");
    const [adminPassword, setAdminPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [objects, setObjects] = useState<Object3DRow[]>([]);


    const handleResetData = () => {
        setObjects([]);
      };

    const submitData = async () => {
        setIsWaiting(true);
        
        // Prepare the FormData object
        const formData = new FormData();
        formData.append("organizationName", organizationName);
        formData.append("adminPassword", adminPassword);


        let partsLocator = 0
 objects.forEach((object) => {   
      formData.append('objects', object.file);  // Change is here
      let partsLocations: number[] = []
      if (object.parts) {
        Array.from(object.parts).forEach((part) => {
          formData.append('parts', part);  // Change is here
          partsLocations.push(partsLocator)
          partsLocator+=1
        });
       
      }
      else{
        partsLocations = [-1]
      }
      formData.append('mapping', JSON.stringify(partsLocations))

    });
        const entries = Array.from(formData.entries());
        
        for (const [key, value] of entries) {
            console.log(`${key}: ${value}`);
        }

        console.log(entries)
        
        try {
            // Making POST request to FastAPI endpoint
            const response = await api.post("/new_organization", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                // Successfully sent the data
                console.log("Data successfully sent:", response.data);
                navigate("/")
                // You can also navigate to another screen or update the UI here
            } else {
                // Handle error scenarios
                console.error("An error occurred while sending data:", response.data);
            }
        } catch (error) {
            // Handle error scenarios
            console.error("An exception occurred while sending data:", error);
            console.log(error)
        } finally {
            setIsWaiting(false);
        }
    };
    

    const handleSelectedParts = (event: any, object_index: number) => {
        setIsWaiting(true)
        let newObjects = [...objects];
        newObjects[object_index] = { ...newObjects[object_index], parts: event.target.files };
        setObjects(newObjects);
        setIsWaiting(false)
    }

    const handleSelectedFiles = (event: any) => {
        setIsWaiting(true)
        let objectRows: Object3DRow[] = [];
        let files = [...event.target.files];
        files.forEach((file) => {
            objectRows.push({ "parts": null, file: file });
        });
        setObjects([...objectRows]);
        setIsWaiting(false)
    }

    const steps = ["Step 1: Organization", "Step 2: 3D Objects Registration"];

    useEffect(() => {
        if (sessionStorage.getItem("loggedIn")) {
            navigate("/");
        }
    }, [navigate]);

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField 
                            autoFocus
                            label="Organization Name"
                            name="organizationName"
                            placeholder="Genielabs"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            fullWidth
                        />
                        <TextField 
                            label="Admin Password"
                            type="password"
                            name="adminPassword"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="******"
                            fullWidth
                        />
                    </>
                );
            case 1:
                return (
                    <div>
                        <center> <Typography>3D Objects Registration</Typography> </center>
                        <Button variant="contained" component="span" onClick={handleOpenFileInput}>
                            Upload 3D Objects
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleResetData}>
                            Reset Data
                        </Button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Object name</TableCell>
                                        <TableCell align="left">Size</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Parts</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {objects.map((object, index) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {object.file.name.split(".")[0]}
                                            </TableCell>
                                            <TableCell align="right">{object.file.size}</TableCell>
                                            <TableCell align="right">{object.file.type}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" component="span" onClick={() => handleOpenPartsInput(index)}>
                                                    Upload Parts
                                                </Button>
                                                {object.parts && (
                                                    <TableContainer component={Paper}>
                                                      <Table size="small" aria-label="file parts table">
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell>Part Name</TableCell>
                                                            <TableCell align="right">Size</TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          {Array.from(object.parts).map((part) => (
                                                            <TableRow>
                                                              <TableCell>{part.name.split(".")[0]}</TableCell>
                                                              <TableCell align="right">{part.size}</TableCell>
                                                            </TableRow>
                                                          ))}
                                                        </TableBody>
                                                      </Table>
                                                    </TableContainer>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                );
            case 2:
                return <Typography>Final Step Content</Typography>;
            default:
                return "Unknown step";
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (organizationName && adminPassword) {
            if (activeStep === steps.length - 1) {
                // Submit data to the backend if this is the last step
                submitData();
            } else {
                let username = organizationName + "_admin"
                UserPool.signUp(username, adminPassword, [new CognitoUserAttribute({
                    Name: 'custom:API_KEY',
                    Value: 'your_api_key_here' // replace with the actual API key
                })], [], (err, data) => {
                    if (err) {
                        setErrorMessage(err.message);
                        console.error(err);
                    } else {
                        handleNext();
                    }
                    setIsWaiting(false);
                });

            }
        } else {
            setErrorMessage("Invalid Organization Name or Admin Password");
        }
    };
    

    useEffect(() => {
        setErrorMessage("");
    }, [organizationName, adminPassword]);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const partsInputRefs: React.RefObject<HTMLInputElement>[] = objects.map(() => React.createRef());

    const handleOpenFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleOpenPartsInput = (index: number) => {
        if (partsInputRefs[index].current) {
            partsInputRefs[index].current!.click();
        }
    }

    return (
        <div className="newOrganizationScreen">
            <section className="section-center">
                <div className="loading-overlay" style={isWaiting ? { display: "flex" } : { display: "none" }}>
                    <CircularProgress />
                </div>
                <img className="logo" src='../Logo.svg' alt="Logo" />
                <Typography gutterBottom variant="h4" className="genielabs-header">New Organization Wizard</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Card variant="outlined">
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={1} className="form-grid" direction="column" alignItems="center">
                                <Grid item xs={12} className="textfield-item">
                                    {getStepContent(activeStep)}
                                </Grid>
                                <Grid item xs={12} className="btn-container">
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} variant="contained">
                                            Back
                                        </Button>
                                    )}
                                    <Button type="submit" variant="contained" color="primary">
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </Grid>
                            </Grid>
                            {errorMessage && (
                                <Alert severity="error" style={{ marginTop: 20 }}>
                                    {errorMessage}
                                </Alert>
                            )}
                        </form>
                    </CardContent>
                </Card>
                <input type="file" ref={fileInputRef} onChange={(event) => { handleSelectedFiles(event) }} multiple style={{ display: 'none' }} />
                {objects.map((_, index) => (
                    <input key={index} type="file" ref={partsInputRefs[index]} multiple onChange={(event) => handleSelectedParts(event, index)} style={{ display: 'none' }} />
                ))}
            </section>
        </div>
    );
};

export default NewOrganizationScreen;
