import React from 'react';

const FinishLine = () => (
    <g className='finishline'>
      <g>
        <rect x="6" y="8" fill="#000000" width="8" height="7" />
        <rect x="14" y="15" fill="#000000" width="7" height="8" />
        <rect x="21" y="8" fill="#000000" width="8" height="7" />
        <rect x="6" y="23" fill="#000000" width="8" height="8" />
        <rect x="21" y="23" fill="#000000" width="8" height="8" />
        <rect x="29" y="15" fill="#000000" width="7" height="8" />
        <rect x="36" y="8" fill="#000000" width="8" height="7" />
        <rect x="36" y="23" fill="#000000" width="8" height="8" />
      </g>
      <path fill="#000000" d="M44,31H6V7h38V31z M7,30h36V8H7V30z" />
      <rect x="2" y="1" fill="#000000" width="5" height="48" />
      <rect x="44" y="1" fill="#000000" width="4" height="48" />
    </g>
);

export default FinishLine;