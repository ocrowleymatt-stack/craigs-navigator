import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/app.css';
import RealityMonitor from './components/RealityMonitor';
createRoot(document.getElementById('root')).render(
<main className='app-shell'>
<h1>Craig\'s Navigator</h1>
<p>Reality checking, calm and acoustic monitoring.</p>
<RealityMonitor/>
</main>
);