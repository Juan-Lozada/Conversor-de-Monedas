import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import  ChartData from "../API/ChartData";

Chart.register(CategoryScale);

export default function ChartComponent() {
    const [chartInfo, setChartInfo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await ChartData();
            setChartInfo(data);
        }

        fetchData();
    }, []);

    return (
        <div className="App">
            <p>Using Chart.js in React</p>
            {chartInfo && (
                <Chart
                    type="bar"
                    data={chartInfo}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
