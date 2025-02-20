import { useState } from "react";
import BarChart from './Javascript/BarChart.jsx';
import TotalFeedback from "./AdminIcons/TotalFeedback.svg";
import LocationsFeedback from "./AdminIcons/LocationsFeedback.svg";
import WebsitesFeedback from "./AdminIcons/WebsitesFeedback.svg";

const AdminDashboard = () => {
    const [activeTable, setActiveTable] = useState("Locations-Feedback");

    return (
        <header className="header-margin inter">
            <label className="text-4xl font-semibold">STATISTICS</label>
            <section className="admin-chart-layout my-5">
                <div className="admin-charts">
                    <BarChart/>
                </div>
                <div className="inline-block">
                    <div className="admin-filter-container">
                        <h1 className="font-bold text-lg">Total Feedbacks</h1>
                        <span className="flex justify-start items-start gap-4">
                            <img src={TotalFeedback} alt="AdminBuilding" className="w-12" />
                            <p className="text-maroon-custom font-bold text-3xl">1000</p>
                        </span>
                        <span className="flex justify-start items-start gap-5">
                            <div>
                                <h1 className="font-bold text-lg">Locations Feedback</h1>
                                <span className="flex items-center gap-4">
                                    <img src={LocationsFeedback} alt="AdminBuilding" className="w-12" />
                                    <p className="text-maroon-custom font-bold text-3xl">1000</p>
                                </span>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">Web Feedback</h1>
                                <span className="flex items-center gap-4">
                                    <img src={WebsitesFeedback} alt="AdminBuilding" className="w-12" />
                                    <p className="text-maroon-custom font-bold text-3xl">1000</p>
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
            </section>

            <section className="flex justify-end items-center text-white gap-3">
                <button 
                    className="admin-filter-container-button"
                    onClick={() => setActiveTable("Locations-Feedback")}
                >
                    Locations Feedback
                </button>
                <button 
                    className="admin-filter-container-button"
                    onClick={() => setActiveTable("Web-Feedback")}
                >
                    Web Feedback
                </button>
            </section>

            {/* Locations Feedback Table */}
            {activeTable === "Locations-Feedback" && (
                <table className="table-feedback my-4">
                    <thead>
                            <th>Id</th>
                            <th>Location</th>
                            <th>Classification</th>
                            <th>Satisfaction</th>
                            <th>Feedback</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>Phinmahall</td>
                            <td>Student</td>
                            <td>Dissatisfied</td>
                            <td>Baho Ang Cr atay</td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Merlo</td>
                            <td>Faculties</td>
                            <td>Satisfied</td>
                            <td>This Web Helps me a lot</td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>Marketing</td>
                            <td>Guest</td>
                            <td>Satisfied</td>
                            <td>This helps A lot</td>
                        </tr>
                    </tbody>
                </table>
            )}

            {/* Web Feedback Table */}
            {activeTable === "Web-Feedback" && (
                <table className="table-feedback my-4">
                    <thead>
                        <>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Classification</th>
                            <th>Satisfaction</th>
                            <th>Feedback</th>
                        </>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>ivandaleclarion@gmail.com</td>
                            <td>Student</td>
                            <td>Dissatisfied</td>
                            <td>Baho Ang Cr atay</td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Chanel@gmail.com</td>
                            <td>Faculties</td>
                            <td>Satisfied</td>
                            <td>This Web Helps me a lot</td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>NashAguas@gmail.com</td>
                            <td>Guest</td>
                            <td>Satisfied</td>
                            <td>This helps A lot</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </header>
    );
};

export default AdminDashboard;
