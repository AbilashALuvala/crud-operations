import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarForm = () => {
    const [cars, setCars] = useState([]);
    const [name, setName] = useState('');
    const [mfy, setMfy] = useState('');
    const [price, setPrice] = useState('');

    // Fetch cars on component mount
    useEffect(() => {
        // axios.get('http://localhost:3000/cars')
        //     .then(response => {
        //         setCars(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching cars:', error);
        //     });
    }, []);

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/car', { name, mfy, price })
            .then(response => {
                alert(response.data.message);
                setCars([...cars, { name, mfy, price }]);
                setName('');
                setMfy('');
                setPrice('');
            })
            .catch(error => {
                console.error('Error posting car:', error);
            });
    };

    return (
        <div>
            <h1>Car Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Manufacturing Year:
                    <input type="number" value={mfy} onChange={(e) => setMfy(e.target.value)} />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <h2>Car List</h2>
            <ul>
                {cars.map((car, index) => (
                    <li key={index}>{car.name} - {car.mfy} - ${car.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarForm;
