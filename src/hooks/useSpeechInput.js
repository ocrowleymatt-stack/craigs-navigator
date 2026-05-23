import {useCallback, useRef, useState} from 'react';

export function useSpeechInput(){
  const recognitionRef = useRef(null);
  const [isSupported,setIsSupported] = useState(typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  const [isListening,setIsListening] = useState(false);
  const [transcript,setTranscript] = useState('');
  const [error,setError] = useState('');

  const startSpeech = useCallback(()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
      setIsSupported(false);
      setError('Speech input is not supported in this browser. Type the question instead.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onerror = event => {
      setError(event?.error || 'Speech input failed.');
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = event => {
      const text = Array.from(event.results).map(result => result[0]?.transcript || '').join(' ');
      setTranscript(text.trim());
    };
    recognitionRef.current = recognition;
    recognition.start();
  },[]);

  const stopSpeech = useCallback(()=>{
    recognitionRef.current?.stop?.();
    setIsListening(false);
  },[]);

  return {isSupported,isListening,transcript,error,startSpeech,stopSpeech,setTranscript};
}
