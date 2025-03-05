import { useRef, useEffect, useState } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '/src/config/firebase';  // Adjust path if needed

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
    const chartRef = useRef(null);  // Canvas reference
    const chartInstance = useRef(null);  // Chart instance reference
    const [satisfactionCounts, setSatisfactionCounts] = useState({
        "Very Satisfied": 0,
        "Satisfied": 0,
        "Neutral": 0,
        "Not Satisfied": 0,
        "Not Very Satisfied": 0,
    });

    useEffect(() => {
        // Fetch data from both "Locations Feedback" and "Web Feedback"
        const fetchData = async () => {
            const counts = {
                "Very Satisfied": 0,
                "Satisfied": 0,
                "Neutral": 0,
                "Not Satisfied": 0,
                "Not Very Satisfied": 0,
            };

            const feedbackCollections = ["Locations Feedback", "Web Feedback"];
            feedbackCollections.forEach((collectionName) => {
                const q = query(collection(db, collectionName));
                onSnapshot(q, (snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        const feedback = doc.data();
                        if (counts[feedback.satisfactionLevel] !== undefined) {
                            counts[feedback.satisfactionLevel]++;
                        }
                    });

                    // Update state with the latest counts
                    setSatisfactionCounts({ ...counts });
                });
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Prepare chart configuration
        const config = {
            type: 'bar',
            data: {
                labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Not Satisfied', 'Not Very Satisfied'],
                datasets: [
                    {
                        label: 'User Satisfaction',
                        data: [
                            satisfactionCounts["Very Satisfied"],
                            satisfactionCounts["Satisfied"],
                            satisfactionCounts["Neutral"],
                            satisfactionCounts["Not Satisfied"],
                            satisfactionCounts["Not Very Satisfied"]
                        ],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        };

        // Get the canvas context
        const ctx = chartRef.current.getContext('2d');

        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, config);

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [satisfactionCounts]);  // Re-run chart creation when satisfactionCounts changes

    return (
        <div className='h-96 max-w-full min-w-96    lg:w-500 lg:h-400'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;
