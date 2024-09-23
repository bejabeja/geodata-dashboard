import './Card.css'


interface CardProps {
    title: string;
    value: any;
}

function Card({ title, value }: CardProps) {

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