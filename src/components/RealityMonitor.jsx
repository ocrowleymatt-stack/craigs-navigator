import React, {useState} from 'react';
import {analyseFrame} from '../modules/audio/audioEngine';
export default function RealityMonitor(){
const [result,setResult]=useState(null);
const runCheck=()=>{
const fake=Array.from({length:64},()=>Math.floor(Math.random()*255));
setResult(analyseFrame(fake));
};
return <section><h2>Reality Monitor</h2><button onClick={runCheck}>Analyse Audio</button>{result&&<div><p>{result.label}</p><p>Speech probability: {result.speechProbability}%</p><p>Confidence: {result.confidence}</p></div>}</section>}
