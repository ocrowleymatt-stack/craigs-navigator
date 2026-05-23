import {useCallback, useRef, useState} from 'react';

export function useClipRecorder(){
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const [isRecording,setIsRecording]=useState(false);
  const [clips,setClips]=useState([]);
  const [error,setError]=useState('');

  const startClip = useCallback(async()=>{
    try{
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:false}});
      streamRef.current = stream;
      chunksRef.current=[];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = event => { if(event.data.size>0) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current,{type:'audio/webm'});
        const url = URL.createObjectURL(blob);
        const clip = {id: crypto.randomUUID(), createdAt:new Date().toISOString(), url, type:'raw-review-clip', note:'Raw microphone review clip'};
        setClips(prev=>[clip,...prev].slice(0,20));
        stream.getTracks().forEach(track=>track.stop());
      };
      recorder.start();
      setIsRecording(true);
    }catch(err){
      setError(err?.message || 'Could not start clip recording.');
    }
  },[]);

  const stopClip = useCallback(()=>{
    if(recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
    setIsRecording(false);
  },[]);

  const recordTimedClip = useCallback(async(ms=15000)=>{
    await startClip();
    window.setTimeout(()=>stopClip(),ms);
  },[startClip,stopClip]);

  return {isRecording, clips, error, startClip, stopClip, recordTimedClip};
}
