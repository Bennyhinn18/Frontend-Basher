import React, { useEffect, useState, useRef } from 'react';
import { fetchPointsHistory } from '../api'; // Adjust the import path as needed
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon'; // Import the Luxon adapter
import { DateTime } from 'luxon';

const PointsChart = ({ duration }) => {
    const [dates, setDates] = useState([]);
    const [points, setPoints] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPointsHistory();
            if (data.length > 0) {
                const mappedData = mapPointsToDates(data, duration);
                setDates(mappedData.dates);
                setPoints(mappedData.points);
                drawChart(mappedData.dates, mappedData.points);
            }
        };

        fetchData();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [duration]);

    const mapPointsToDates = (data, duration) => {
        const now = DateTime.now();
        let days;

        switch (duration) {
            case '7d':
                days = 7;
                break;
            case '14d':
                days = 14;
                break;
            case '30d':
                days = 30;
                break;
            case 'all':
            default:
                days = data.length;
                break;
        }

        const dates = Array.from({ length: days }, (_, i) => now.minus({ days: days - i - 1 }).toISODate());
        const points = Array(days).fill(0);

        data.forEach(entry => {
            const entryDate = DateTime.fromISO(entry.timestamp).toISODate();
            const index = dates.indexOf(entryDate);
            if (index !== -1) {
                points[index] += entry.points; // Sum up points for each date
            }
        });

        return { dates, points };
    };

    const drawChart = (dates, points) => {
        const ctx = chartRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#F6B81D'); // your color at the top
        gradient.addColorStop(1, '#f6ba237a'); // your color at the bottom

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Points',
                    data: points,
                    fill: true,
                    borderColor: "#fff",
                    borderWidth: "0",
                    backgroundColor: gradient,
                    pointColor: "#F6B81D",
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "#F6B81D",
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverBackgroundColor: "#F6B81D",
                    pointHoverBorderColor: "#fff",
                    pointHoverRadius: 7,
                    lineTension: 0
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: true
                        }
                    }
                }
            }
        });
    };

    return (
        <div className="points-chart">
            <h3>Points Graph</h3>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PointsChart;
