import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/app.css';
import RealityMonitor from './components/RealityMonitor';
import MorningReport from './components/MorningReport';

createRoot(document.getElementById('root')).render(
<main className='app-shell'>
<h1>Craig\'s Navigator</h1>
<p>Quietly helping things make sense.</p>
<MorningReport overnightEvents={[]}/>
<RealityMonitor/>
</main>
);