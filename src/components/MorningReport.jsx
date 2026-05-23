import React from 'react';
import {buildMorningReport} from '../modules/sleep/sleepEngine';

export default function MorningReport({overnightEvents=[]}){
 const report = buildMorningReport({overnightEvents});
 return <section style={{marginTop:20,padding:18,border:'1px solid #223042',borderRadius:12,background:'#0a131d'}}>
 <h3>{report.title}</h3>
 <p>{report.sleepSummary}</p>
 <p>{report.audioSummary}</p>
 <div style={{padding:12,borderRadius:10,background:'#101a25'}}>{report.guidance}</div>
 </section>
}
