import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useGetCarByIdQuery, useGetCarsQuery } from '../../app/slices/CarSlices'
import { useParams, useNavigate, data } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: car, isLoading } = useGetCarByIdQuery(id);
    console.log(car);



    return (
        <>
            {
                isLoading ? (
                    <h1>...Loading</h1>
                ) : (
                    <div>

                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title>{car.data.modelName}</Card.Title>
                                <Card.Text>
                                    <span>Brend Name: {car.data.brandName}</span>
                                    <span>Maşının rəngi: {car.data.color}</span><br />
                                    <span>Maşının ili: {car.data.year}</span><br />
                                    <span>Yenidir?- {car.data.isNew ? 'yenidir' : "ikinci əldir"}</span>
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/cars")}>Go Back</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }
        </>
    )
}

export default Detail
