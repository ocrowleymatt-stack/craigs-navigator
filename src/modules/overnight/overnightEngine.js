export const defaultOvernightSettings = {
  enabled: false,
  startTime: '23:00',
  endTime: '07:00',
  speechThreshold: 55,
  captureSeconds: 15,
  summaryTone: 'calm-british'
};

export function shouldLogAudioEvent(frame, settings = defaultOvernightSettings){
  if(!frame) return false;
  return Number(frame.speechProbability || 0) >= Number(settings.speechThreshold || 55);
}

export function createOvernightEvent(frame){
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    label: frame?.label || 'audio event',
    speechProbability: frame?.speechProbability || 0,
    confidence: frame?.confidence || 'unknown',
    ambientLevel: frame?.ambientLevel || 0,
    peakLevel: frame?.peakLevel || 0,
    note: 'Logged because speech-like acoustic probability crossed the overnight threshold.'
  };
}

export function buildOvernightSummary(events=[]){
  const notable = events.filter(e => e.speechProbability >= 55);
  if(events.length === 0){
    return 'No notable speech-like audio events were logged in this review window.';
  }
  return `${events.length} audio event${events.length===1?'':'s'} logged. ${notable.length} crossed the speech-like review threshold. Review clips before drawing conclusions.`;
}
