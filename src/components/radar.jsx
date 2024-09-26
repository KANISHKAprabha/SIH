import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Grid, Box, Typography } from '@mui/material';

const WAFVisualization = () => {
   
    // Area Chart State
    const [areaSeries] = useState([
        {
            name: 'WAF Requests',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Blocked Requests',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ]);

    const areaOptions = {
        chart: {
            height: 350,
            type: 'area',
        },
        dataLabels: {
            enabled: true ,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z"
            ],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    };

    return (
     
                <Box sx={{ boxShadow: 3, padding: 2 }}>
                    <ReactApexChart options={areaOptions} series={areaSeries} type="area" height={350} />
                </Box>
    
    );
};

export default WAFVisualization;
