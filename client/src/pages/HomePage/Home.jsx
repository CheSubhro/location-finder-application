import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/slices/HomeSlice';
import { Card, Pagination} from '../../components/index'

const Home = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.data);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
            <>
                 <div className="card-container">
                    {data
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item) => (
                            <Card key={item.id} title={item.title} description={item.description} thumbnail={item.image} />
                        ))}
                </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(data.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
            </>
    );
};

export default Home;
