import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutData }  from '../../redux/slices/AboutSlice';
import { Card , Pagination } from '../../components/index';

const About = () => {

    const dispatch = useDispatch();
    const { aboutData  } = useSelector((state) => state.aboutdata);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (!aboutData) {
        return <div>Loading...</div>;
    }


    return (
        <>
                <div className="card-container">
                    {aboutData
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item) => (
                            <Card key={item.id} title={item.title} description={item.description} thumbnail={item.thumbnail} />
                        ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(aboutData.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
        </>
    )
}

export default About