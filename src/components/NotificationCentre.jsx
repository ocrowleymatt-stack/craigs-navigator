import React from 'react';
import {buildNotification,notificationRationale} from '../modules/notifications/notificationEngine';

export default function NotificationCentre(){
 const message = buildNotification({type:'morning', humour:'dry'});
 const why = notificationRationale('morning');
 return <section style={{marginTop:20,padding:16,border:'1px solid #223042',borderRadius:12,background:'#09111a'}}>
 <h3>Navigator Notifications</h3>
 <div style={{padding:12,borderRadius:10,background:'#101b26',marginBottom:10}}>{message}</div>
 <div style={{opacity:.75,fontSize:13}}>
 <strong>Why am I seeing this?</strong>
 <ul>{why.map((w,i)=><li key={i}>{w}</li>)}</ul>
 </div>
 </section>
}
