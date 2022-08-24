import React, { useState } from "react";
import { useSelector } from 'react-redux';
import config from "../../config.json";
import SelectFile from './../components/modals/SelectFile';
import SelectFolder from './../components/modals/SelectFolder';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const permission = useSelector(state => state.profile.permissions).includes('dashboard_page');
    if (permission === false) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>شما به این قسمت دسترسی ندارید</div>
            </div>
        );
    } else {
        return (
            <div style={{ textAlign: "center" }}>
                <SelectFile data={(data) => setData(data)} />
                <SelectFolder data={(data) => setData(data)} />
                <img src={config.logo_url} alt="error" className="img-fluid" />
                <p className="mt-5">در حال کار هستیم انرژی داشته باشید</p>
            </div>
        );
    }
}

export default Dashboard;
