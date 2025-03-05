import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";  // Ensure this points to your Firebase config
import BarChart from './Javascript/BarChart.jsx';
import TotalFeedback from "./AdminIcons/TotalFeedback.svg";
import LocationsFeedback from "./AdminIcons/LocationsFeedback.svg";
import WebsitesFeedback from "./AdminIcons/WebsitesFeedback.svg";

const AdminDashboard = () => {
    const [activeTable, setActiveTable] = useState("Locations-Feedback");
    const [locationFeedbacks, setLocationFeedbacks] = useState([]);
    const [webFeedbacks, setWebFeedbacks] = useState([]);

    // Fetch Locations Feedback
    useEffect(() => {
        const q = query(collection(db, "Locations Feedback"));  // Collection with space in the name
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            setLocationFeedbacks(data);
        });
        return unsubscribe;
    }, []);

    // Fetch Web Feedback
    useEffect(() => {
        const q = query(collection(db, "Web Feedback"));  // Collection with space in the name
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            setWebFeedbacks(data);
        });
        return unsubscribe;
    }, []);

    return (
        <header className="header-margin inter">
            <label className="text-4xl font-semibold">STATISTICS</label>
            <section className="admin-chart-layout my-5">
                <div className="admin-charts">
                    <BarChart />
                </div>
                <div className="inline-block">
                    <div className="admin-filter-container">
                        <h1 className="font-bold text-lg">Total Feedbacks</h1>
                        <span className="flex justify-start items-start gap-4">
                            <img src={TotalFeedback} alt="TotalFeedback" className="w-12" />
                            <p className="text-maroon-custom font-bold text-3xl">
                                {locationFeedbacks.length + webFeedbacks.length}
                            </p>
                        </span>
                        <span className="flex justify-start items-start gap-5">
                            <div>
                                <h1 className="font-bold text-lg">Locations Feedback</h1>
                                <span className="flex items-center gap-4">
                                    <img src={LocationsFeedback} alt="LocationsFeedback" className="w-12" />
                                    <p className="text-maroon-custom font-bold text-3xl">{locationFeedbacks.length}</p>
                                </span>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">Web Feedback</h1>
                                <span className="flex items-center gap-4">
                                    <img src={WebsitesFeedback} alt="WebsitesFeedback" className="w-12" />
                                    <p className="text-maroon-custom font-bold text-3xl">{webFeedbacks.length}</p>
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
            <section className="overflow-x-auto lg:overflow-visible">
                <table className="table-feedback  my-4">
                    <thead>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Classification</th>
                            <th>Satisfaction</th>
                            <th>Feedback</th>
                    </thead>
                    <tbody>
                        {locationFeedbacks.map((feedback, index) => (
                            <tr key={index}>
                                <td>{feedback.webId}  </td>
                                <td>{feedback.email}</td>
                                <td>{feedback.location}</td>
                                <td>{feedback.classification || "N/A"}</td>
                                <td>{feedback.satisfactionLevel || "N/A"}</td>
                                <td>{feedback.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section> 
            )}

            {/* Web Feedback Table */}
            {activeTable === "Web-Feedback" && (
                <table className="table-feedback overflow-auto lg:overflow-hidden my-4">
                    <thead>     
                            <th>Id</th>     
                            <th>Email</th>
                            <th>Classification</th>
                            <th>Satisfaction</th>
                            <th>Feedback</th>
                    </thead>
                    <tbody>
                        {webFeedbacks.map((feedback, index) => (
                            <tr key={index}>
                                <td>{feedback.webId}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.classification}</td>
                                <td>{feedback.satisfactionLevel}</td>
                                <td>{feedback.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </header>
    );
};

export default AdminDashboard;
