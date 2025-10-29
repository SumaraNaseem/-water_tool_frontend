import React, { useEffect, useRef } from 'react';

const StationSchematic = ({ stationType = 'dry' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw based on station type
    switch (stationType) {
      case 'dry':
        drawDryStation(ctx, width, height);
        break;
      case 'submersible':
        drawSubmersibleStation(ctx, width, height);
        break;
      case 'hybrid':
        drawHybridStation(ctx, width, height);
        break;
      default:
        drawDryStation(ctx, width, height);
    }
  }, [stationType]);

  const drawDryStation = (ctx, width, height) => {
    // Pump chamber
    ctx.fillStyle = '#e3f2fd';
    ctx.strokeStyle = '#1565c0';
    ctx.lineWidth = 2;
    ctx.fillRect(50, 100, 200, 120);
    ctx.strokeRect(50, 100, 200, 120);
    
    // Wet well
    ctx.fillStyle = '#e0f2f1';
    ctx.strokeStyle = '#26a69a';
    ctx.fillRect(300, 120, 150, 100);
    ctx.strokeRect(300, 120, 150, 100);
    
    // Pumps
    ctx.fillStyle = '#1565c0';
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(80 + i * 60, 140, 40, 40);
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('P' + (i + 1), 100 + i * 60, 165);
      ctx.fillStyle = '#1565c0';
    }
    
    // Pipes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    // Suction pipe
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(300, 160);
    ctx.stroke();
    
    // Discharge pipe
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(500, 50);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Pumpkammare', 150, 90);
    ctx.fillText('Våtbrunn', 375, 110);
    ctx.fillText('Till nätverk', 500, 40);
  };

  const drawSubmersibleStation = (ctx, width, height) => {
    // Wet well (larger)
    ctx.fillStyle = '#e0f2f1';
    ctx.strokeStyle = '#26a69a';
    ctx.lineWidth = 2;
    ctx.fillRect(150, 80, 200, 160);
    ctx.strokeRect(150, 80, 200, 160);
    
    // Water level
    ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
    ctx.fillRect(155, 120, 190, 100);
    
    // Submersible pumps
    ctx.fillStyle = '#1565c0';
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(180 + i * 70, 180, 30, 50);
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('P' + (i + 1), 195 + i * 70, 210);
      ctx.fillStyle = '#1565c0';
    }
    
    // Discharge pipes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 80);
    ctx.lineTo(250, 30);
    ctx.lineTo(450, 30);
    ctx.stroke();
    
    // Guide rails
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
      ctx.beginPath();
      ctx.moveTo(170 + i * 70, 80);
      ctx.lineTo(170 + i * 70, 180);
      ctx.stroke();
      
      ctx.moveTo(220 + i * 70, 80);
      ctx.lineTo(220 + i * 70, 180);
      ctx.stroke();
    }
    
    // Labels
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Våtbrunn med dränkbara pumpar', 250, 70);
    ctx.fillText('Vattennivå', 100, 170);
    ctx.fillText('Till nätverk', 450, 20);
    ctx.fillText('Lyftanordning', 400, 100);
  };

  const drawHybridStation = (ctx, width, height) => {
    // Combine elements from both
    drawDryStation(ctx, width, height);
    
    // Add submersible section
    ctx.fillStyle = '#e0f2f1';
    ctx.strokeStyle = '#26a69a';
    ctx.lineWidth = 2;
    ctx.fillRect(480, 120, 100, 100);
    ctx.strokeRect(480, 120, 100, 100);
    
    // Additional submersible pump
    ctx.fillStyle = '#00897b';
    ctx.fillRect(500, 180, 25, 30);
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('P3', 512, 200);
    
    // Label
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Backup', 530, 110);
  };

  return (
    <div className="w-full h-64 bg-gray-50 border border-gray-200 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full h-full"
      />
    </div>
  );
};

export default StationSchematic;
