import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ totalSteps, stepsDone }) => {
    const remainingSteps = totalSteps >= stepsDone ? totalSteps - stepsDone : 0;
    const stepsData = [stepsDone, remainingSteps];

    const data = {
        labels: ["Steps Done", "Remaining Steps"],
        datasets: [
            {
                data: stepsData,
                backgroundColor: ["#36a2eb", "#ff6384"], // Colors for the pie slices
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        family: "'Arial', sans-serif",
                        size: 14,
                        style: "italic",
                        weight: "bold"
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || "";
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
                bodyFont: {
                    family: "'Arial', sans-serif",
                    size: 12,
                },
                titleFont: {
                    family: "'Arial', sans-serif", 
                    size: 14,
                    weight: "bold"
                }
            },
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        }
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
