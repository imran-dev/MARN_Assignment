import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";

const NotFound = lazy(() => import('../components/NotFound/NotFound'));

const NotFoundPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default NotFoundPage;