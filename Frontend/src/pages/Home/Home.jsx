import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAddCarMutation, useDeleteCarsMutation, useGetCarsQuery } from '../../app/slices/CarSlices';
import { useNavigate } from 'react-router';

function Home() {
    let [brand, setBrand] = useState('')
    let [model, setModel] = useState('')
    let [color, setColor] = useState('')
    let [year, setYear] = useState('')
    let [isNew, setIsNew] = useState(false)
    let { data, isLoading, refetch } = useGetCarsQuery()
    let [deleteCars] = useDeleteCarsMutation()
    let [addCar] = useAddCarMutation()
    let navigate = useNavigate()



    function handleDelete(id) {
        deleteCars(id)
        console.log(id);
        refetch()
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let newCar = {
            modelName: model,
            brandName: brand,
            year: year,
            color: color,
            isNew: isNew
        }
        await addCar(newCar)
        setBrand('')
        setColor('')
        setModel('')
        setYear('')
        refetch()
    }

    function handleInfo(id) {
        navigate(`${id}`)
    }
    return (
        <>
            <form className='select-none' onSubmit={(e) => handleSubmit(e)}>
                <h1 className='mb-6 text-4xl font-black'>Add Form</h1>
                <div className="input">
                    <input type="text" placeholder='Brand Name ...' className='bg-white border-2 border-gray my-2 px-5 py-2' onChange={(e) => setBrand(e.target.value)} value={brand} />
                </div>
                <div className="input">
                    <input type="text" placeholder='Model Name ...' className='bg-white border-2 border-gray my-2 px-5 py-2' onChange={(e) => setModel(e.target.value)} value={model} />
                </div>
                <div className="input">
                    <input type="text" placeholder='Color ...' className='bg-white border-2 border-gray my-2 px-5 py-2' onChange={(e) => setColor(e.target.value)} value={color} />
                </div>
                <div className="input">
                    <input type="number" placeholder='Year ...' className='bg-white border-2 border-gray my-2 px-5 py-2' onChange={(e) => setYear(e.target.value)} value={year} />
                </div>
                <div className="input">
                    <input type="checkbox" className='bg-white border-2 border-gray my-2' id='new' value={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                    <label htmlFor="new" className='mb-10 text-xl font-3000 m-2 '>Yenidir?</label>
                </div>
                <Button type='submit' variant="success" >Add</Button>
            </form>
            {
                isLoading ? (
                    <h1 className='mb-10 text-4xl font-black select-none'>...Loading</h1>
                ) : (
                    <div className="div " >
                        <h1 className='mb-10 text-4xl font-black select-none'>Cars</h1>
                        <table className="border-collapse border border-slate-500 ... select-none">
                            <thead>
                                <tr className='bg-red-400 text-2xl'>
                                    <th className="border border-slate-600 ... px-5 ">Brand Name</th>
                                    <th className="border border-slate-600 ...  px-5">Model Name</th>
                                    <th className="border border-slate-600 ...  px-5">Color</th>
                                    <th className="border border-slate-600 ...  px-5">Year</th>
                                    <th className="border border-slate-600 ...  px-5">Info</th>
                                    <th className="border border-slate-600 ...  px-5 py-2   ">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr key={item._id} >
                                            <td className="border border-slate-600 ...  px-5 text-xl py-2">{item.brandName}</td>
                                            <td className="border border-slate-600 ... text-xl">{item.modelName}</td>
                                            <td className="border border-slate-600 ... text-xl">{item.color}</td>
                                            <td className="border border-slate-600 ... text-xl" style={{ color: item.isNew ? "green" : "red" }}>{item.year}</td>
                                            <td className='border border-slate-600 ... text-xl py-2'><Button variant="success" onClick={() => handleInfo(item._id)}>Info</Button>
                                            </td>
                                            <td className='border border-slate-600 ... text-xl py-2'><Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}

export default Home
