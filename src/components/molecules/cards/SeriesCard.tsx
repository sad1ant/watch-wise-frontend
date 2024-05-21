import React from "react";
import Rating from "../../atoms/rating/Rating";
import {Link} from "react-router-dom";

interface SeriesCardProps {
    series: {
        id: string
        title: string
        image: string
        genre: string
        rating: number
        releaseYear: number
    }
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
    return (
        <Link to={`/series/${series.id}`} className="block">
            <div className="bg-transparent p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <img src={series.image} alt={series.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h2 className="text-2xl font-bold mb-2">{series.title}</h2>
                <p className="text-gray-400">{series.genre} | {series.releaseYear}</p>
                <Rating rating={series.rating} maxRating={5} />
            </div>
        </Link>
    )
}

export default SeriesCard