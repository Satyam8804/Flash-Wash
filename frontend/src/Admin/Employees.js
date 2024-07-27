import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/Cards/EmployeeCard';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    position: '',
    monthlyPays: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, [formData]);

  const accessToken = localStorage.getItem('accessToken');

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/get-all-employees', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data?.data);
      } else {
        const errorData = await response.json();
        console.error('Error fetching employee data:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/registerEmployees', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const newEmployee = await response.json();
        setEmployees([...employees, newEmployee.data]);
        setIsModalOpen(false);
        setFormData({ username: '', position: '', monthlyPays: '' });
      } else {
        const errorData = await response.json();
        console.error('Error creating employee:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
    <div className='flex flex-col gap-4'>
      
      <div className='flex w-full justify-between'>
      <span className='text-2xl font-bold text-gray-500'>EMPLOYEES ({employees.length})</span>
      <button
        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        onClick={() => setIsModalOpen(true)}
      >
        Add Employee
      </button>
    
      </div>
    <div className='px-4 flex flex-wrap gap-8'>
      

      {employees && employees.map((employee) => (
        <EmployeeCard employee={employee} key={employee._id} />
      ))}

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded shadow-lg w-1/3'>
            <h2 className='text-xl font-bold mb-4'>Create Employee</h2>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Position</label>
                <input
                  type='text'
                  name='position'
                  value={formData.position}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Monthly Pays</label>
                <input
                  type='number'
                  name='monthlyPays'
                  value={formData.monthlyPays}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border rounded'
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-green-500 text-white px-4 py-2 rounded'
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Employees;
