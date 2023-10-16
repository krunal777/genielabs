/* eslint-disable */
import React, { useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, TextField, Alert, Button, CircularProgress } from "@mui/material";

import UserPool from "../../components/UserPool";
import api from "../../api";
import { UseAppContext } from "../../contexts/appContext";
import "./SignInScreen.css";  // Importing the styles

const SignInScreen: React.FC = () => {
    const appContext = UseAppContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    useEffect(() => {
        if (sessionStorage.getItem("loggedIn")) {
            navigate("/");
        }

        const stored3DObjects = sessionStorage.getItem("available3DObjects");
        if (stored3DObjects) {
            try {
                const parsedObjects = JSON.parse(stored3DObjects);
                appContext.setAvailable3DObjects(parsedObjects);
            } catch (e) {
                console.error("Error parsing stored 3D objects:", e);
            }
        }

        const storedOrganizationName = sessionStorage.getItem("organizationName");
        if (storedOrganizationName) {
            appContext.setOrganizationName(storedOrganizationName);
        }
    }, [navigate, appContext]);

    useEffect(() => {
        if (errorMessage && (username || password)) {
            setErrorMessage("");
        }
    }, [username, password]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsWaiting(true)

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (session: CognitoUserSession) => {
                sessionStorage.setItem("accessToken", session.getAccessToken().getJwtToken());
                sessionStorage.setItem("idToken", session.getIdToken().getJwtToken())
                sessionStorage.setItem("API_KEY", session.getIdToken().payload["custom:API_KEY"])


                api.get("/fetch_user_data").then(res => {
                    if (res.status === 200)
                    {
                        sessionStorage.setItem("loggedIn", "true");

                    if (res.data.objects_3d) {
                        appContext.setAvailable3DObjects(res.data.objects_3d);
                    }

                    if (res.data.organization && res.data.organization.name) {
                        appContext.setOrganizationName(res.data.organization.name);
                    }
                }
                }, err =>{
                    console.log(err)
                    setErrorMessage(err.message);
                    setIsWaiting(false)
                });
            },
            onFailure: (err) => {
                setErrorMessage(err.message);
                setIsWaiting(false)
            },
            newPasswordRequired: (data) => {
                setErrorMessage("New password required");
                setIsWaiting(false)
            }
        });
    };

    return (
        <div className="signInScreen">
        <section className="section-center">
            <div className="loading-overlay" style={isWaiting ? {display:"flex"} : {display:"none"}}>
            <CircularProgress />
            </div>
            <img className="logo" src='../Logo.svg' alt="Logo"/>
            <Typography gutterBottom variant="h4" className="genielabs-header">Sign In</Typography>
            <Card variant="outlined">
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={1} className="form-grid" direction="column" alignItems="center">
                            <Grid item xs={12} className="textfield-item">
                                <TextField 
                                    autoFocus
                                    label="Username"
                                    name="username"
                                    placeholder="username@example.com"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} className="textfield-item">
                                <TextField 
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="******"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} className="btn-container">
                                <Button type="submit" variant="contained" color="primary">
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
                    </form>
                </CardContent>
            </Card>
        </section>
        </div>
    );
};

export default SignInScreen;