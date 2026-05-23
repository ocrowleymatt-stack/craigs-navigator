import React from 'react';
import {useAudioMonitor} from '../hooks/useAudioMonitor';
import {useClipRecorder} from '../hooks/useClipRecorder';
import WaveformBars from './WaveformBars';
import EventTimeline from './EventTimeline';
import ClipReview from './ClipReview';
export default function RealityMonitor(){
const audio=useAudioMonitor();
const recorder=useClipRecorder();
return <section style={{marginTop:24,padding:20,border:'1px solid #1f2937',borderRadius:14,background:'#0c1117'}}>
<h2>Reality Monitor</h2>
<div style={{display:'flex',gap:12,marginBottom:12,flexWrap:'wrap'}}>
<button onClick={audio.start}>Start Listening</button>
<button onClick={audio.stop}>Stop Listening</button>
<button onClick={recorder.startClip}>Record Clip</button>
<button onClick={recorder.stopClip}>Stop Clip</button>
</div>
<p>Status: {audio.isListening ? 'Listening' : 'Idle'} / Recorder: {recorder.isRecording ? 'Recording':'Ready'}</p>
<WaveformBars history={audio.history}/>
{audio.frame && <div><p>{audio.frame.label}</p><p>Speech probability: {audio.frame.speechProbability}%</p></div>}
<EventTimeline history={audio.history}/>
<ClipReview clips={recorder.clips}/>
</section>}
