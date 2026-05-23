import React from 'react';
import {useAudioMonitor} from '../hooks/useAudioMonitor';
import WaveformBars from './WaveformBars';
import EventTimeline from './EventTimeline';
export default function RealityMonitor(){
const {isListening,permissionError,frame,history,start,stop}=useAudioMonitor();
return <section style={{marginTop:24,padding:20,border:'1px solid #1f2937',borderRadius:14,background:'#0c1117'}}>
<h2>Reality Monitor</h2>
<p>Live acoustic monitor with speech/noise estimation and visual corroboration.</p>
<div style={{display:'flex',gap:12,marginBottom:12}}>
<button onClick={start}>Start Listening</button>
<button onClick={stop}>Stop</button>
</div>
{permissionError && <p>{permissionError}</p>}
<p>Status: {isListening ? 'Listening' : 'Idle'}</p>
<WaveformBars history={history}/>
{frame && <div style={{marginTop:12}}>
<p><strong>{frame.label}</strong></p>
<p>Ambient: {frame.ambientLevel}</p>
<p>Peak: {frame.peakLevel}</p>
<p>Speech probability: {frame.speechProbability}%</p>
<p>Confidence: {frame.confidence}</p>
</div>}
<EventTimeline history={history}/>
<p style={{opacity:.7,fontSize:13}}>Speech enhancement and replay are probabilistic tools and do not determine reality.</p>
</section>}
