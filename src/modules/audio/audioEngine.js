export const analyseFrame = (dataArray) => {
  const values = Array.from(dataArray || []);
  const avg = values.reduce((a,b)=>a+b,0) / Math.max(values.length,1);
  const peak = Math.max(...values,0);
  const variance = values.reduce((a,b)=>a+Math.pow(b-avg,2),0) / Math.max(values.length,1);
  const speechLike = peak > 150 && variance > 900;
  return {
    ambientLevel: Math.round(avg),
    peakLevel: peak,
    speechProbability: speechLike ? Math.min(96, Math.round((variance / 18) + (peak / 4))) : Math.max(0, Math.round(variance / 40)),
    label: speechLike ? 'speech-like acoustic pattern' : 'ambient/background sound',
    confidence: speechLike ? 'medium' : 'low'
  };
};

export const enhancementNotice = {
  title: 'Audio enhancement pipeline',
  body: 'This MVP separates ambient noise from speech-like energy. Production enhancement should use consent-based clip review, denoising and server-side model inference. It must not be used as a covert surveillance tool.'
};
