import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/app.css';
import RealityMonitor from './components/RealityMonitor';
import MorningReport from './components/MorningReport';
import NotificationCentre from './components/NotificationCentre';
import CompanionPanel from './components/CompanionPanel';
import CompanionSharePanel from './components/CompanionSharePanel';

createRoot(document.getElementById('root')).render(
<main className='app-shell'>
<h1>Craig\'s Navigator</h1>
<p>Quietly helping things make sense.</p>
<MorningReport overnightEvents={[]}/>
<NotificationCentre/>
<CompanionPanel/>
<CompanionSharePanel/>
<RealityMonitor/>
</main>
);