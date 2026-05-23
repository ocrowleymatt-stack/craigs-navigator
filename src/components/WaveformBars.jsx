import React from 'react';

export default function WaveformBars({history=[]}){
  const points = history.slice(-48);
  return <div className="waveform" aria-label="Live audio level visualisation">
    {points.map((p,i)=><span key={i} style={{height:`${Math.max(4, Math.min(96, p.peakLevel/2.6))}%`}} title={`Peak ${p.peakLevel}`} />)}
  </div>;
}
