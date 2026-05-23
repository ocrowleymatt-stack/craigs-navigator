export const shareCategories = [
  {id:'sleepSummary', label:'Sleep summary', defaultEnabled:true, sensitivity:'low'},
  {id:'activityProgress', label:'Activity progress', defaultEnabled:true, sensitivity:'low'},
  {id:'taskProgress', label:'Task progress', defaultEnabled:true, sensitivity:'low'},
  {id:'audioEventCount', label:'Audio event count only', defaultEnabled:false, sensitivity:'medium'},
  {id:'audioClips', label:'Audio clips', defaultEnabled:false, sensitivity:'high'},
  {id:'transcripts', label:'Transcripts', defaultEnabled:false, sensitivity:'high'},
  {id:'freeTextNotes', label:'Personal notes', defaultEnabled:false, sensitivity:'high'}
];

export function defaultShareSelection(){
  return Object.fromEntries(shareCategories.map(c => [c.id, c.defaultEnabled]));
}

export function buildCompanionReport({selection={}, morningReport=null, overnightEvents=[]}={}){
  const selected = {...defaultShareSelection(), ...selection};
  const report = {
    createdAt: new Date().toISOString(),
    title: 'Craig Navigator companion update',
    sections: []
  };
  if(selected.sleepSummary){
    report.sections.push({label:'Sleep', value: morningReport?.sleepSummary || 'Sleep summary available.'});
  }
  if(selected.activityProgress){
    report.sections.push({label:'Activity', value:'Activity check-ins enabled. Swimming and movement can be shared when confirmed.'});
  }
  if(selected.taskProgress){
    report.sections.push({label:'Tasks', value:'Task progress sharing enabled.'});
  }
  if(selected.audioEventCount){
    report.sections.push({label:'Audio events', value:`${overnightEvents.length} review event${overnightEvents.length===1?'':'s'} logged.`});
  }
  if(selected.audioClips){
    report.sections.push({label:'Audio clips', value:'Audio clip sharing requested. Review carefully before sending.'});
  }
  if(selected.transcripts){
    report.sections.push({label:'Transcripts', value:'Transcript sharing requested. Review carefully before sending.'});
  }
  if(selected.freeTextNotes){
    report.sections.push({label:'Notes', value:'Personal notes selected for sharing.'});
  }
  return report;
}
