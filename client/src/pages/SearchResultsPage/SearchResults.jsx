
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Container } from '@mui/material';


const SearchResults = () => {

    const [results, setResults] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/searchlocations/searchloc');
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error.message);
                // Handle error
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Search Results</Typography>
            <List>
                {Object.keys(results).map(key => (
                    <React.Fragment key={key}>
                        <ListItem>
                            <ListItemText primary={`${key}: ${results[key]}`} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            </Container>
        </>
    )
}

export default SearchResults