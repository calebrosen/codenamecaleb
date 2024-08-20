import React from 'react';
import './inDevelopment.css';

const InDevelopment = () => {

    return (
        <div>
            <div className='InDevelopmentSpan'>
                <span className='InDevelopmentSpan'>Under construction...</span>
            </div>
            <div className="gears" id="two-gears">
                <div className="gears-container">
                  <div className="gear-rotate"></div>
                  <div className="gear-rotate-left"></div>
                </div>
            </div>
            
        </div>
    )
}

export default InDevelopment;