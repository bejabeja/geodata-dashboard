import React from "react";
import './Card.css'

function Card({ title, value }) {

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>{title}</h3>
            </div>
            <p className='card-value'>
                {value}
            </p>
        </div>
    );
}

export default Card;