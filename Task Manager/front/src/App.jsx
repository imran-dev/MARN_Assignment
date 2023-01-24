import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/Tasks/CreatePage";
import NewPage from "./pages/Tasks/NewPage";
import ProgressPage from "./pages/Tasks/ProgressPage";
import CompletedPage from "./pages/Tasks/CompletedPage";
import CanceledPage from "./pages/Tasks/CanceledPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import {getToken} from "./helpers/SessionHelper";
import SendOTPPage from "./pages/AccountRecover/Send-OTP-Page";
import VerifyOTPPage from "./pages/AccountRecover/Verify-OTP-Page";
import CreatePasswordPage from "./pages/AccountRecover/Create-Password-Page";

const App = () => {
    if (getToken()) {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<DashboardPage/>}/>
                        <Route exact path='/Create' element={<CreatePage/>}/>
                        <Route exact path='/All' element={<NewPage/>}/>
                        <Route exact path='/Progress' element={<ProgressPage/>}/>
                        <Route exact path='/Completed' element={<CompletedPage/>}/>
                        <Route exact path='/Canceled' element={<CanceledPage/>}/>
                        <Route exact path='/Profile' element={<ProfilePage/>}/>
                        <Route exact path='*' element={<NotFoundPage/>}/>
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<Navigate to="/Login" replace/>}/>
                        <Route exact path='/Login' element={<LoginPage/>}/>
                        <Route exact path='/Registration' element={<RegistrationPage/>}/>
                        <Route exact path='/ForgetPassword' element={<ForgetPasswordPage/>}/>

                        <Route exact path="/SendOTP" element={<SendOTPPage/>}/>
                        <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}/>
                        <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}/>

                        <Route exact path='*' element={<NotFoundPage/>}/>
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
            </Fragment>
        );
    }
};

export default App;