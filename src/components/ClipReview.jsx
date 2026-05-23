import React from 'react';
import {createEnhancedClipPlaceholder,ENHANCEMENT_LIMITS,enhancementProfile} from '../modules/audio/enhancedReplay';

export default function ClipReview({clips=[]}){
 const profile = enhancementProfile();
 return <section style={{marginTop:18}}>
 <h3>Clip Review</h3>
 {clips.length===0 && <p>No clips captured yet.</p>}
 {clips.map(c=>{
 const enhanced=createEnhancedClipPlaceholder(c);
 return <div key={c.id} style={{padding:12,border:'1px solid #1f2937',borderRadius:10,marginBottom:10}}>
 <strong>{c.type}</strong>
 <div>{new Date(c.createdAt).toLocaleString()}</div>
 <div style={{display:'grid',gap:12,gridTemplateColumns:'1fr 1fr',marginTop:10}}>
 <div>
 <div>Raw</div>
 <audio controls src={c.url} style={{width:'100%'}}/>
 </div>
 <div>
 <div>{profile.name}</div>
 <audio controls src={enhanced.url} style={{width:'100%'}}/>
 </div>
 </div>
 <ul style={{opacity:.7,fontSize:13}}>{ENHANCEMENT_LIMITS.map((l,i)=><li key={i}>{l}</li>)}</ul>
 </div>})}
 </section>
}
