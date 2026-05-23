import {useCallback, useEffect, useRef, useState} from 'react';
import {analyseFrame} from '../modules/audio/audioEngine';
import {createOvernightEvent, shouldLogAudioEvent} from '../modules/overnight/overnightEngine';

export function useAudioMonitor(){
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const [isListening,setIsListening]=useState(false);
  const [permissionError,setPermissionError]=useState('');
  const [frame,setFrame]=useState(null);
  const [history,setHistory]=useState([]);
  const [overnightEvents,setOvernightEvents]=useState([]);

  const stop = useCallback(()=>{
    if(animationRef.current) cancelAnimationFrame(animationRef.current);
    if(audioContextRef.current) audioContextRef.current.close();
    setIsListening(false);
  },[]);

  const start = useCallback(async()=>{
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize=2048;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current=audioContext;
      analyserRef.current=analyser;
      setIsListening(true);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = ()=>{
        analyser.getByteFrequencyData(data);
        const analysed = analyseFrame(data);
        setFrame(analysed);
        setHistory(prev=>[...prev.slice(-119),analysed]);
        if(shouldLogAudioEvent(analysed)){
          setOvernightEvents(prev=>{
            const latest = prev[0];
            if(latest && Date.now()-new Date(latest.createdAt).getTime()<15000) return prev;
            return [createOvernightEvent(analysed), ...prev].slice(0,40);
          });
        }
        animationRef.current=requestAnimationFrame(tick);
      };
      tick();
    }catch(err){setPermissionError(err?.message||'Microphone access denied.');}
  },[]);

  useEffect(()=>()=>stop(),[stop]);
  return {isListening,permissionError,frame,history,overnightEvents,start,stop};
}
