export const ENHANCEMENT_LIMITS = [
  'Audio enhancement can improve audibility but cannot reconstruct speech that was not captured.',
  'Walls, distance and background noise reduce reliability.',
  'Use raw and enhanced playback together; never rely on enhanced output alone.'
];

export function createEnhancedClipPlaceholder(rawClip){
  if(!rawClip) return null;
  return {
    id: `${rawClip.id}-enhanced-preview`,
    sourceId: rawClip.id,
    createdAt: new Date().toISOString(),
    url: rawClip.url,
    type: 'enhanced-preview-placeholder',
    note: 'Client preview placeholder. Production version should apply denoise, band-pass speech emphasis and VAD server-side.'
  };
}

export function enhancementProfile(){
  return {
    name: 'Speech Focus Preview',
    filters: [
      {type:'highpass', frequency:120},
      {type:'bandpass', frequencyRange:'300-3400 Hz'},
      {type:'noiseGate', threshold:'adaptive'},
      {type:'normalise', target:'speech intelligibility'}
    ]
  };
}
