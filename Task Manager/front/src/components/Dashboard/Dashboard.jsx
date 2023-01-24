import React, {Fragment, useEffect} from 'react';
import {SummaryRequest} from "../../APIRequest/APIRequest";
import {useSelector} from "react-redux";

const Dashboard = () => {
    useEffect(() => {
        SummaryRequest();
    }, []);

    const SummaryList = useSelector((state) => state.summary.value);

    return (
        <Fragment>
            <div className="content-body container-fluid">
                <div className="row p-0 m-0">
                    {
                        SummaryList.map((item, i) =>
                            <div className="col-12 col-lg-3 col-sm-6 col-md-3 p-2" key={i.toString()}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="animated fadeInUp">Total {item._id}</h5>
                                        <h6 className="text-secondary animated fadeInUp">{item.sum}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;