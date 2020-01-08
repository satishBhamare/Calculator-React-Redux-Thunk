import React from 'react';

const Digit = ({digit, digitPressed}) => {
    return(
        <button style={{padding:'10px', color:'grey', margin:'1px', width:digit==='='?'-webkit-fill-available':'5rem'}} onClick={() => digitPressed(digit)}>
            {digit}
        </button>
    )
}

export default Digit;
