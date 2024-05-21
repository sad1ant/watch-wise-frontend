import React, { useEffect } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import SeriesCard from "../molecules/cards/SeriesCard";
import SeriesFilters from "../molecules/forms/filters/SeriesFilters";
import {
    fetchInterestedSeries,
    fetchSeries,
    fetchSeriesRecommendations,
    selectSeries
} from "../../redux/slices/series-slice";
import { selectAuth } from "../../redux/slices/auth-slice";
import SeriesRecommendations from "../organisms/sliders/recommendations/SeriesRecommendations";
import InterestedSeries from "../organisms/sliders/interested/InterestedSeries";

const Series: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isAuth } = useSelector(selectAuth);
    const { series, loading, error } = useSelector(selectSeries);

    useEffect(() => {
        dispatch(fetchSeries({ page: 0, size: 20 }));
        if (isAuth) {
            const token = localStorage.getItem('access_token');
            dispatch(fetchSeriesRecommendations(token));
            dispatch(fetchInterestedSeries(token));
        }
    }, [dispatch, isAuth]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            {isAuth && (
                <div className="mb-8">
                    <SeriesRecommendations />
                    <InterestedSeries />
                </div>
            )}
            <SeriesFilters />
                <h1 className="text-3xl font-bold mt-8 mb-4 text-white">Сериалы</h1>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {series?.map(s => (
                            <SeriesCard series={s} key={s.id} />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Series;