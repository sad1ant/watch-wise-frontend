import React, { useState } from "react";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import Input from "../../../atoms/inputs/Input";
import Button from "../../../atoms/buttons/Button";
import {fetchFilteredSeries} from "../../../../redux/slices/series-slice";
import RangeInput from "../../../atoms/inputs/RangeInput";

const SeriesFilters: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [filters, setFilters] = useState({
        genre: '',
        startYear: '',
        endYear: '',
        actor: '',
        ageRating: '',
        rating: '',
        country: ''
    });

    const [actualStartYear, setActualStartYear] = useState('1901');
    const [actualEndYear, setActualEndYear] = useState('2024');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });

        if (name === 'startYear') {
            setActualStartYear(value || '1901');
        }
        if (name === 'endYear') {
            setActualEndYear(value || '2024');
        }
    };

    const handleFilter = () => {
        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== '')
        );
        dispatch(fetchFilteredSeries({ params: { ...cleanedFilters, startYear: actualStartYear, endYear: actualEndYear }, page: 0, size: 10 }));
    };

    const handleClearFilters = () => {
        setFilters({
            genre: '',
            startYear: '',
            endYear: '',
            actor: '',
            ageRating: '',
            rating: '',
            country: ''
        });
        setActualStartYear('1901');
        setActualEndYear('2024');
        dispatch(fetchFilteredSeries({ params: {}, page: 0, size: 10 }));
    };

    return (
        <div className="p-4 rounded-lg shadow-lg">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-white">Жанр</label>
                    <Input type="text" name="genre" placeholder="Жанр" value={filters.genre} onChange={handleInputChange} className="shadow-md" />
                </div>
                <div>
                    <label htmlFor="startYear" className="block text-sm font-medium text-white">Начальный год: {actualStartYear}</label>
                    <RangeInput name="startYear" min="1901" max="2024" value={actualStartYear} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="endYear" className="block text-sm font-medium text-white">Конечный год: {actualEndYear}</label>
                    <RangeInput name="endYear" min="1901" max="2024" value={actualEndYear} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="actor" className="block text-sm font-medium text-white">Актер</label>
                    <Input type="text" name="actor" placeholder="Актер" value={filters.actor} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="ageRating" className="block text-sm font-medium text-white">Возрастной рейтинг: {filters.ageRating}+</label>
                    <RangeInput name="ageRating" min="0" max="18" value={filters.ageRating} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-white">Рейтинг: {filters.rating}</label>
                    <RangeInput name="rating" min="0" max="5" step="0.1" value={filters.rating} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-white">Страна</label>
                    <Input type="text" name="country" placeholder="Страна" value={filters.country} onChange={handleInputChange} />
                </div>
            </form>
            <div className="mt-4 flex justify-center space-x-6">
                <Button onClick={handleFilter}>Применить</Button>
                <Button className="bg-red-500 hover:bg-red-600" onClick={handleClearFilters}>Сбросить</Button>
            </div>
        </div>
    );
};

export default SeriesFilters;