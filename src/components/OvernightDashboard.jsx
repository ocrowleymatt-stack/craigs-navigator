import React from 'react';
import {buildOvernightSummary} from '../modules/overnight/overnightEngine';

export default function OvernightDashboard({events=[]}){
 const summary = buildOvernightSummary(events);
 return <section style={{marginTop:20,padding:16,border:'1px solid #1f2937',borderRadius:12,background:'#091018'}}>
 <h3>Overnight Review</h3>
 <p>{summary}</p>
 <div style={{opacity:.75,fontSize:13}}>This dashboard highlights audio events for review. Logged events are prompts for inspection, not conclusions.</div>
 {events.slice(-5).reverse().map(e=><div key={e.id} style={{marginTop:10,padding:10,border:'1px solid #223042',borderRadius:10}}>
 <strong>{e.label}</strong>
 <div>{new Date(e.createdAt).toLocaleString()}</div>
 <div>Speech probability: {e.speechProbability}%</div>
 <div>Confidence: {e.confidence}</div>
 </div>)}
 </section>
}
