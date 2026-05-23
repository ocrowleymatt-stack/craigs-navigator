import React from 'react';
import {useAudioMonitor} from '../hooks/useAudioMonitor';
import {useClipRecorder} from '../hooks/useClipRecorder';
import WaveformBars from './WaveformBars';
import EventTimeline from './EventTimeline';
import ClipReview from './ClipReview';
import OvernightDashboard from './OvernightDashboard';

export default function RealityMonitor(){
 const audio=useAudioMonitor();
 const recorder=useClipRecorder();
 return <section style={{marginTop:24,padding:20,border:'1px solid #1f2937',borderRadius:14,background:'#0c1117'}}>
 <h2>Reality Monitor</h2>
 <button onClick={audio.start}>Start</button>
 <button onClick={audio.stop}>Stop</button>
 <WaveformBars history={audio.history}/>
 <EventTimeline history={audio.history}/>
 <OvernightDashboard events={audio.overnightEvents}/>
 <ClipReview clips={recorder.clips}/>
 </section>
}
