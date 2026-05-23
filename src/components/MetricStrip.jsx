import React from 'react';
import {Moon, Radio, ShieldCheck, Waves} from 'lucide-react';

export default function MetricStrip(){
 const items=[
  {icon:Moon,label:'Sleep',value:'Review ready'},
  {icon:Radio,label:'Audio',value:'Monitor armed'},
  {icon:ShieldCheck,label:'Privacy',value:'Approval first'},
  {icon:Waves,label:'Activity',value:'Pool-aware'}
 ];
 return <div className='metric-strip'>
  {items.map(({icon:Icon,label,value})=><div className='metric-card' key={label}>
   <Icon size={20}/>
   <div><strong>{label}</strong><span>{value}</span></div>
  </div>)}
 </div>;
}
