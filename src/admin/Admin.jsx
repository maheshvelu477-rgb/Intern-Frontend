//src/admin/Admin.jsx

import React from 'react';
import Nav from './Nav';

export default function Admin() {
    return (
        <>
        <div class='d-flex'>
         <Nav />
         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">4
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>

            <div className="row g-4">
                <div className="col-md-6 col-lg-3">
                    <div className="dashboard-card text-center">
                        <h4>Total Users</h4>
                        <p className="fs-1 fw-bold">1,250</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="dashboard-card text-center">
                        <h4>Revenue</h4>
                        <p className="fs-1 fw-bold">$56,780</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="dashboard-card text-center">
                        <h4>Orders</h4>
                        <p className="fs-1 fw-bold">345</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="dashboard-card text-center">
                        <h4>Page Views</h4>
                        <p className="fs-1 fw-bold">8,900</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 dashboard-card">
                <h3>Recent Activity</h3>
                <p>This is a placeholder for charts, recent logs, or a data table.</p>
            </div>
        </main>
        </div>
        </>
    );
}
