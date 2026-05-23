import React, {useEffect, useState} from 'react';
import {buildRealityCheckResponse} from '../modules/companion/reasoningEngine';
import {useSpeechInput} from '../hooks/useSpeechInput';

export default function CompanionPanel(){
 const [question,setQuestion]=useState('');
 const [reply,setReply]=useState(null);
 const speech = useSpeechInput();

 useEffect(()=>{
  if(speech.transcript){
    setQuestion(speech.transcript);
  }
 },[speech.transcript]);

 const ask = ()=>{
   setReply(buildRealityCheckResponse({question}));
 };

 return <section style={{marginTop:20,padding:18,border:'1px solid #223042',borderRadius:12,background:'#09121b'}}>
 <h3>Navigator Companion</h3>
 <p>Ask or speak a question and work through the evidence calmly.</p>
 <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Navigator, I think I heard something..." style={{width:'100%',padding:10,borderRadius:10,background:'#101a25',color:'#e7edf5',border:'1px solid #2a3442'}}/>
 <div style={{marginTop:10,display:'flex',gap:10,flexWrap:'wrap'}}>
 <button onClick={speech.startSpeech}>Speak</button>
 <button onClick={speech.stopSpeech}>Stop Voice</button>
 <button onClick={ask}>Ask Navigator</button>
 </div>
 <div style={{opacity:.75,fontSize:13,marginTop:8}}>
 Voice: {speech.isListening ? 'Listening' : 'Ready'}
 {speech.error ? ` • ${speech.error}` : ''}
 </div>
 {reply && <div style={{marginTop:14,padding:12,border:'1px solid #1f2937',borderRadius:10}}>
 <strong>{reply.title}</strong>
 <p>{reply.evidence}</p>
 <p>{reply.interpretation}</p>
 <ul>{reply.nextSteps.map((s,i)=><li key={i}>{s}</li>)}</ul>
 <div style={{opacity:.8}}>{reply.calmLine}</div>
 </div>}
 </section>
}
