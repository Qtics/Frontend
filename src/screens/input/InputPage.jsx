// InputPage.jsx
import React, { useEffect } from 'react';
import InputForm from './components/InputFrom';
import DataTable from './components/DataTable';
import Navbar from '../HomeScreen/Components/Navbar';
import { useDispatch } from 'react-redux';
import { setTab } from '../../redux/features/currentTab';

const InputPage = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setTab('input'))
  },[])
  return (
    <>
    <Navbar/>
    <div className='min-h-full flex flex-col sm:flex-row'>
      
      <div className='px-5 py-5 bg-yellow-600  w-full sm:max-w-64'><InputForm/> </div>
      <div className='bg-zinc-950 flex-1     overflow-x-auto'>
        
        <DataTable/>
      </div>
    </div>
    </>
  );
};

export default InputPage;
