import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const SendOTP     = lazy(() => import('../../components/AccountRecover/Send-OTP'));
const SendOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOTP/>
        </Suspense>
    );
};

export default SendOTPPage;