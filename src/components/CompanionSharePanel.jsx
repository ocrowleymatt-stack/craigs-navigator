import React, {useMemo, useState} from 'react';
import {buildCompanionReport,defaultShareSelection,shareCategories} from '../modules/companion/shareEngine';

export default function CompanionSharePanel(){
 const [selection,setSelection] = useState(defaultShareSelection());
 const report = useMemo(()=>buildCompanionReport({selection}),[selection]);
 const toggle = id => setSelection(prev => ({...prev,[id]:!prev[id]}));

 return <section style={{marginTop:20,padding:18,border:'1px solid #223042',borderRadius:12,background:'#09121b'}}>
 <h3>Companion Sharing</h3>
 <p>Review and approve what leaves Navigator.</p>
 {shareCategories.map(c=><label key={c.id} style={{display:'block',marginBottom:8}}>
 <input type='checkbox' checked={selection[c.id]} onChange={()=>toggle(c.id)}/> {c.label}
 <span style={{opacity:.6,fontSize:12}}> ({c.sensitivity})</span>
 </label>)}
 <div style={{marginTop:14,padding:12,border:'1px solid #1f2937',borderRadius:10}}>
 <strong>Preview</strong>
 {report.sections.map((s,i)=><div key={i} style={{marginTop:8}}><strong>{s.label}</strong><div>{s.value}</div></div>)}
 </div>
 </section>
}
