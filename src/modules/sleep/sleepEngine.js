export function estimateSleepWindow(settings = {}) {
  return {
    startTime: settings.startTime || '23:00',
    endTime: settings.endTime || '07:00',
    method: 'configured-window',
    confidence: 'low'
  };
}

export function buildMorningReport({sleepWindow, overnightEvents = []} = {}) {
  const eventCount = overnightEvents.length;
  const highish = overnightEvents.filter(e => Number(e.speechProbability || 0) >= 70).length;
  const sleep = sleepWindow || estimateSleepWindow();
  return {
    title: 'Morning Navigator Report',
    sleepSummary: `Sleep window reviewed: ${sleep.startTime} to ${sleep.endTime}.`,
    audioSummary: eventCount === 0
      ? 'No notable speech-like audio events were logged.'
      : `${eventCount} review event${eventCount === 1 ? '' : 's'} logged. ${highish} had stronger speech-like probability.`,
    guidance: highish > 0
      ? 'Review the clips calmly before drawing conclusions. Raw audio matters more than fear.'
      : 'Nothing high-confidence was flagged. Tea remains available.',
    tone: 'calm-british'
  };
}
