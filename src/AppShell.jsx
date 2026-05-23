import React from 'react';
import HeroHeader from './components/HeroHeader';
import MetricStrip from './components/MetricStrip';
import RealityMonitor from './components/RealityMonitor';
import MorningReport from './components/MorningReport';
import NotificationCentre from './components/NotificationCentre';
import CompanionPanel from './components/CompanionPanel';
import CompanionSharePanel from './components/CompanionSharePanel';

export default function AppShell(){
 return <main className='app-shell'>
 <HeroHeader/>
 <MetricStrip/>
 <div className='grid'>
 <MorningReport overnightEvents={[]}/>
 <NotificationCentre/>
 <CompanionPanel/>
 <CompanionSharePanel/>
 </div>
 <RealityMonitor/>
 </main>;
}
