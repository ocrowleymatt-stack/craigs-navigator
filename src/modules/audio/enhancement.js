export function speechBandHint(freqIndex,totalBins){
  const ratio = freqIndex / totalBins;
  return ratio > 0.05 && ratio < 0.45;
}

export function estimateEnhancementGuidance(){
  return {
    strategy:[
      'adaptive noise floor',
      'spectral subtraction',
      'speech band emphasis',
      'voice activity detection',
      'enhanced replay comparison'
    ],
    note:'Walls attenuate and distort sound. Enhancement improves intelligibility but cannot guarantee source identification or perfect reconstruction.'
  };
}
