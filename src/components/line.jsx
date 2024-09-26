import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Grid } from '@mui/material';


const Dashboard1 = () => {
  

    // Bar Chart State
    const [barSeries] = useState([{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
    }]);

    const barOptions = {
        chart: {
            height: 350,
            type: 'bar',
        },
        colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560'],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['John', 'Doe'],
                ['Joe', 'Smith'],
                ['Jake', 'Williams'],
                'Amber',
                ['Peter', 'Brown'],
                ['Mary', 'Evans'],
                ['David', 'Wilson'],
                ['Lily', 'Roberts'],
            ],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        }
    };

    return (
        <Box sx={{ backgroundColor: '#292929', padding: 2 }}>
            
                <Grid item xs={12} md={4}>
                    <Box sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <ReactApexChart options={barOptions} series={barSeries} type="bar" height={350} />
                    </Box>
                </Grid>
            
        </Box>
    );
};

export default Dashboard1;





