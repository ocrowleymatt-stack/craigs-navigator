import React from 'react';

export default function ClipReview({clips=[]}){
 return <section style={{marginTop:18}}>
 <h3>Clip Review</h3>
 {clips.length===0 && <p>No clips captured yet.</p>}
 {clips.map(c=><div key={c.id} style={{padding:12,border:'1px solid #1f2937',borderRadius:10,marginBottom:10}}>
 <strong>{c.type}</strong>
 <div>{new Date(c.createdAt).toLocaleString()}</div>
 <audio controls src={c.url} style={{width:'100%',marginTop:8}}/>
 <div style={{opacity:.7,fontSize:13,marginTop:6}}>Enhanced replay pipeline coming next.</div>
 </div>)}
 </section>
}
