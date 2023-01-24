import axios from "axios";
import {ErrorToast, SuccessToast, WarringToast} from "../helpers/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helpers/SessionHelper";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/task-slice";
import {SetSummary} from "../redux/state-slice/summary-slice";
import {SetProfile} from "../redux/state-slice/profile-slice";

const API_URL     = "http://localhost:8080/api/v1";
const AxiosHeader = {headers: {"token": getToken()}}

export function ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo) {
    store.dispatch(ShowLoader());

    const URL       = API_URL + "/profileUpdate";
    let PostBody    = {
        email    : email,
        firstName: firstName,
        lastName : lastName,
        mobile   : mobile,
        password : password,
        photo    : photo
    }
    let UserDetails = {email: email, firstName: firstName, lastName: lastName, mobile: mobile, photo: photo}

    return axios.post(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("Profile Update Success");
            setUserDetails(UserDetails);
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}

export function GetProfileDetails() {
    store.dispatch(ShowLoader())
    const URL = API_URL + "/profileDetails";
    axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            store.dispatch(SetProfile(res.data['data'][0]));
        } else {
            ErrorToast("Something Went Wrong");
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
    });
}

export function UpdateTaskStatusRequest(id, status) {
    store.dispatch(ShowLoader())
    const URL = API_URL + "/updateTaskStatus/" + id + "/" + status;
    return axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("Status Updated");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}

export function TaskDeleteRequest(id) {
    store.dispatch(ShowLoader())
    const URL = API_URL + "/deleteTask/" + id;
    return axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("Delete Successful");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}

export function SummaryRequest() {
    store.dispatch(ShowLoader());
    const URL = API_URL + "/taskStatusCount";
    axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            store.dispatch(SetSummary(res.data['data']));
        } else {
            ErrorToast("Something Went Wrong");
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
    });
}

export function TaskListByStatus(Status) {
    store.dispatch(ShowLoader())
    const URL = API_URL + "/listTaskByStatus/" + Status;
    axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (Status === "New") {
                store.dispatch(SetNewTask(res.data['data']));
            } else if (Status === "Completed") {
                store.dispatch(SetCompletedTask(res.data['data']));
            } else if (Status === "Canceled") {
                store.dispatch(SetCanceledTask(res.data['data']));
            } else if (Status === "Progress") {
                store.dispatch(SetProgressTask(res.data['data']));
            }
        } else {
            ErrorToast("Something Went Wrong");
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
    });
}

export function NewTaskRequest(title, description) {
    store.dispatch(ShowLoader());
    const URL    = API_URL + "/createTask";
    let PostBody = {"title": title, "description": description, status: "New"}

    return axios.post(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("New Task Created");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    })
}

export function RegistrationRequest(email, firstName, lastName, mobile, password, photo) {
    store.dispatch(ShowLoader());
    const URL    = API_URL + "/registration";
    let PostBody = {
        email    : email,
        firstName: firstName,
        lastName : lastName,
        mobile   : mobile,
        password : password,
        photo    : photo
    }

    return axios.post(URL, PostBody).then((res) => {
        if (res.status === 200) {
            store.dispatch(HideLoader());
            if (res.data['status'] === "fail") {
                if (res.data['data']['keyPattern']['email'] === 1) {
                    ErrorToast("Email Already Exist");
                    return false;
                } else {
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            } else {
                SuccessToast("Registration Success");
                return true;
            }
        } else {
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });
}

export function LoginRequest(email, password) {
    store.dispatch(ShowLoader());
    const URL    = API_URL + "/login";
    let PostBody = {"email": email, "password": password}

    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast("Login Success");
            return true;
        } else {
            WarringToast("Invalid Email or Password");
            return false;
        }
    }).catch((err) => {
        if (err.response.status === 401) {
            WarringToast("Invalid Email or Password");
        } else {
            ErrorToast("Something Went Wrong");
        }
        store.dispatch(HideLoader());
        return false;
    });
}

// Recover Password Step 01 Send OTP
export function RecoverVerifyEmailRequest(email) {
    store.dispatch(ShowLoader())
    const URL = API_URL + "/RecoverVerifyEmail/" + email;
    return axios.get(URL).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                ErrorToast("No user found");
                return false;
            } else {
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address.");
                return true;
            }
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}

// Recover Password Step 02 Verify OTP
export function RecoverVerifyOTPRequest(email, OTP) {
    store.dispatch(ShowLoader());
    const URL = API_URL + "/RecoverVerifyOTP/" + email + "/" + OTP;
    return axios.get(URL).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                ErrorToast(res.data['data']);
                return false;
            } else {
                setOTP(OTP);
                SuccessToast("Code Verification Success");
                return true;
            }
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}

// Recover Password Step 03 Reset Pass
export function RecoverResetPassRequest(email, OTP, password) {
    store.dispatch(ShowLoader());
    const URL    = API_URL + "/RecoverResetPass";
    let PostBody = {email: email, OTP: OTP, password: password}

    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(HideLoader());
        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                ErrorToast(res.data['data']);
                return false;
            } else {
                setOTP(OTP);
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return false;
    });
}