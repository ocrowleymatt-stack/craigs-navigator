import React from 'react';
import {useAudioMonitor} from '../hooks/useAudioMonitor';
import {useClipRecorder} from '../hooks/useClipRecorder';
import WaveformBars from './WaveformBars';
import EventTimeline from './EventTimeline';
import ClipReview from './ClipReview';
import OvernightDashboard from './OvernightDashboard';
import StatusPill from './StatusPill';

export default function RealityMonitor(){
 const audio=useAudioMonitor();
 const recorder=useClipRecorder();
 const confidenceTone = audio.frame?.speechProbability > 65 ? 'alert' : 'neutral';
 return <section className='card' style={{marginTop:24}}>
 <h2>Reality Monitor</h2>
 <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:12}}>
 <StatusPill label='Monitor' value={audio.isListening ? 'Listening':'Idle'} tone={audio.isListening ? 'good':'neutral'}/>
 <StatusPill label='Recorder' value={recorder.isRecording ? 'Recording':'Ready'} tone={recorder.isRecording ? 'alert':'neutral'}/>
 {audio.frame && <StatusPill label='Confidence' value={`${audio.frame.speechProbability}%`} tone={confidenceTone}/>}
 </div>
 <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:12}}>
 <button onClick={audio.start}>Start Listening</button>
 <button onClick={audio.stop}>Stop</button>
 <button onClick={recorder.startClip}>Record Clip</button>
 </div>
 <WaveformBars history={audio.history}/>
 <EventTimeline history={audio.history}/>
 <OvernightDashboard events={audio.overnightEvents}/>
 <ClipReview clips={recorder.clips}/>
 </section>
}
