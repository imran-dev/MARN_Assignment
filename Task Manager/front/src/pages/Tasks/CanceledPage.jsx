import React, {Fragment, lazy, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Canceled = lazy(() => import('../../components/Tasks/Canceled/Canceled'));

const CanceledPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Canceled/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CanceledPage;