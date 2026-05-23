import React from 'react';

export default function StatusPill({label,value,tone='neutral'}){
 return <span className={`status-pill status-${tone}`}>
  <strong>{label}</strong> {value}
 </span>;
}
