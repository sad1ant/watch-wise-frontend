import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
interface RatingProps {
    rating: number
    maxRating: number
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating }) => {
    const fullStars = Math.floor(rating)
    const decimal = rating - fullStars
    const stars = []

    for (let i = 1; i <= maxRating; i++) {
        if (i <= fullStars) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />)
        } else if (i === fullStars + 1 && decimal > 0) {
            stars.push(
                <div key={i} className="relative" style={{ width: '1em', height: '1em' }}>
                    <FontAwesomeIcon icon={faStarEmpty} className="text-yellow-500 absolute" />
                    <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-500 absolute top-0 left-0"
                        style={{ clipPath: `inset(0 ${100 - decimal * 100}% 0 0)` }}
                    />
                </div>
            )
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} className="text-yellow-500" />)
        }
    }

    return (
        <div className="flex items-center mt-1">
            <div className="flex mr-1">{stars}</div>
            <span className="text-gray-300 ml-2">{rating.toFixed(1)} из {maxRating}</span>
        </div>
    )
}

export default Rating