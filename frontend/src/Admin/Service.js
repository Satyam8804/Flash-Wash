import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/Cards/ServiceCard';

const Service = () => {
    const [service, setService] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceImage, setServiceImage] = useState(null);
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [category, setCategory] = useState('Exterior Wash'); // Default value set to 'Exterior Wash'
    const [vehicleType, setVehicleType] = useState('Two-wheeler');

    const [reload,setReload]=useState(false);
    useEffect(() => {
        fetchService();
    }, []);

    const accessToken = localStorage.getItem('accessToken');

    const fetchService = async () => {
        try {
            const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/get-all-service', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setService(data?.data);
            } else {
                const errorData = await response.json();
                console.error('Error fetching service data:', errorData);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const addService = async () => {
        const formData = new FormData();
        formData.append('serviceImage', serviceImage);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('duration', duration);
        formData.append('isActive', isActive);
        formData.append('category', category);
        formData.append('vehicleType', vehicleType);
        try {
            const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/createService', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`
                },
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                setService(data?.data);
                window.location.reload()
            } else {
                const errorData = await response.json();
                console.error('Error fetching service data:', errorData);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddService = () => {
        addService();
        setShowModal(false);
    };

    return (
        <div className='px-4 flex flex-col gap-8'>
            <div className="flex justify-between items-center">
                <span className='text-2xl font-bold text-gray-500'>Service ({service.length})</span>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Add Service</button>
            </div>
            <div className='flex flex-wrap w-full h-full overflow-y-auto max-h-[510px] gap-14'>
                {service.length >0 && service.map((service) => (
                    <ServiceCard service={service} key={service._id} />
                ))}
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={closeModal}></div>
                    <div className="relative w-full max-w-4xl mx-auto my-6">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-3xl font-semibold">Add Service</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                {/* Form fields */}
                                <div className="flex mb-4">
                                    <div className="w-1/2 pr-2">
                                        <label htmlFor="name" className="mb-2 block font-bold">Service Name</label>
                                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Service Name" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <div className="w-1/2 pl-2">
                                        <label htmlFor="description" className="mb-2 block font-bold">Description</label>
                                        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2 pr-2">
                                        <label htmlFor="serviceImage" className="mb-2 block font-bold">Service Image</label>
                                        <input type="file" id="serviceImage" accept="image/*" onChange={(e) => setServiceImage(e.target.files[0])} className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <div className="w-1/2 pl-2">
                                        <label htmlFor="price" className="mb-2 block font-bold">Price</label>
                                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2 pr-2">
                                        <label htmlFor="duration" className="mb-2 block font-bold">Duration</label>
                                        <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <div className="w-1/2 pl-2">
                                        <label htmlFor="isActive" className="mb-2 block font-bold">Is Active</label>
                                        <select id="isActive" value={isActive} onChange={(e) => setIsActive(e.target.value)} className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2 pr-2">
                                        <label htmlFor="category" className="mb-2 block font-bold">Category</label>
                                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <option value="Exterior Wash">Exterior Wash</option>
                                            <option value="Interior Wash">Interior Wash</option>
                                        </select>
                                    </div>
                                    <div className="w-1/2 pl-2">
                                        <label htmlFor="vehicleType" className="mb-2 block font-bold">Vehicle Type</label>
                                        <select id="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <option value="Two-wheeler">Two-wheeler</option>
                                            <option value="Four-wheeler">Four-wheeler</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={handleAddService}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Service;
