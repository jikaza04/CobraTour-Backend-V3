import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// doughnutData.js

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutData = {
  labels: ['Student', 'Faculty', 'Visitors'], // Updated labels
  datasets: [
    {
      label: 'Category Distribution', // Updated dataset label
      data: [50, 30, 20], // Example data for each category
      backgroundColor: [
        '#90071A', // Students
        '#DB8F8F', // Faculty
        '#B9B9B9', // Visitors
      ],
      borderColor: [
        '#90071A',
        '#DB8F8F',
        '#B9B9B9',
      ],
      borderWidth: 1,
    },
  ],
};

  
  
export const doughnutConfig = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 30, // Set width of the square legend box
          boxHeight: 30,
          borderRadius: 10, // Set height to make it square
          font: {
            size: 20, // Adjust font size for the legend
          },
          padding: 10, // Add spacing between labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
      title: {
        display: true,
        text: 'Student, Faculty, and Visitor Distribution',
      },
    },
  };
  
  