import { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
    const chartRef = useRef(null); // Reference to the canvas element
    const chartInstance = useRef(null); // Reference to the chart instance

    useEffect(() => {
        // Chart configuration
        const config = {
            type: 'bar',
            data: {
                labels: ['Very Satisfied', 'Satisfied', 'Neutral','Not Satisfied','Not Very Satisfied' ],
                datasets: [
                    {
                        label: 'Web Satisfaction',
                        data: [65, 59, 80, 81, 56, 55, 40],
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
    }, []);

    return (
        <div style={{ width: '500px', height: '400px' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;