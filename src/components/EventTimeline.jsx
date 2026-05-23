import React from 'react';

export default function EventTimeline({history=[]}){
 const flagged = history.filter(h=>h.speechProbability>45).slice(-6).reverse();
 return <section style={{marginTop:16}}>
 <h3>Recent Audio Events</h3>
 {flagged.length===0 && <p>No notable speech-like events recorded.</p>}
 {flagged.map((f,i)=><div key={i} style={{padding:10,border:'1px solid #1f2937',borderRadius:10,marginBottom:8}}>
 <strong>{f.label}</strong>
 <div>Speech probability: {f.speechProbability}%</div>
 <div>Confidence: {f.confidence}</div>
 </div>)}
 </section>
}
