import {useCallback, useEffect, useRef, useState} from 'react';
import {analyseFrame} from '../modules/audio/audioEngine';

export function useAudioMonitor(){
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const [isListening,setIsListening]=useState(false);
  const [permissionError,setPermissionError]=useState('');
  const [frame,setFrame]=useState(null);
  const [history,setHistory]=useState([]);

  const stop = useCallback(()=>{
    if(animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current=null;
    if(audioContextRef.current){ audioContextRef.current.close(); }
    audioContextRef.current=null;
    analyserRef.current=null;
    sourceRef.current=null;
    setIsListening(false);
  },[]);

  const start = useCallback(async()=>{
    try{
      setPermissionError('');
      const stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:false}});
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.78;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current=audioContext;
      analyserRef.current=analyser;
      sourceRef.current=source;
      setIsListening(true);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tick = ()=>{
        analyser.getByteFrequencyData(dataArray);
        const analysed = analyseFrame(dataArray);
        setFrame(analysed);
        setHistory(prev=>[...prev.slice(-119), analysed]);
        animationRef.current=requestAnimationFrame(tick);
      };
      tick();
    }catch(err){
      setPermissionError(err?.message || 'Microphone permission was not granted.');
      setIsListening(false);
    }
  },[]);

  useEffect(()=>()=>stop(),[stop]);
  return {isListening, permissionError, frame, history, start, stop};
}
