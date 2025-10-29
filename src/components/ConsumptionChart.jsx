import React, { useEffect, useRef } from 'react';

const ConsumptionChart = ({ results }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!results || !chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Import Chart.js dynamically
    import('chart.js/auto').then(({ Chart }) => {
      const ctx = chartRef.current.getContext('2d');
      
      const hours = Array.from({length: 24}, (_, i) => i + ':00');
      const pattern = [
        0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 0.8, 1.2, 1.5, 1.3, 1.1, 1.0,
        1.0, 0.9, 0.9, 1.0, 1.1, 1.3, 1.5, 1.4, 1.2, 0.9, 0.6, 0.4
      ];
      
      const designFlow = results.qdimTotal || results.qdim_total;
      const avgFlow = parseFloat(results.qMedel) || 0;
      
      const avgData = pattern.map(f => avgFlow * f);
      const designData = pattern.map(f => designFlow * f * 0.7);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: hours,
          datasets: [{
            label: 'Medelflöde',
            data: avgData,
            borderColor: '#0066cc',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          }, {
            label: 'Dimensionerande flöde',
            data: designData,
            borderColor: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            tension: 0.4,
            fill: false,
            borderWidth: 3,
            borderDash: [5, 5],
            pointRadius: 3,
            pointHoverRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12
                }
              }
            }
          },
          scales: {
            x: { 
              title: { 
                display: true, 
                text: 'Tid (h)',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgba(0,0,0,0.1)'
              }
            },
            y: { 
              title: { 
                display: true, 
                text: 'Flöde (l/s)',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.1)'
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    });

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [results]);

  return (
    <div className="w-full h-64 relative">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default ConsumptionChart;
