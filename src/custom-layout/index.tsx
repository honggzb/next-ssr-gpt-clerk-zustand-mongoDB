'use client'
import { saveAndGetCurrentUser } from '../actions/users';
import usersGlobalStore from '../store/users-store';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';

function CustomLayout ({children}: { children: React.ReactNode}) {

  const pathname = usePathname()
  if(pathname.includes('/sign-in') || pathname.includes('/sign-up')){
    return <>{children}</>
  }

  const [ loading, setLoading ]  = useState(false);
  const { setLoggedInUserdata, loggedInUserData }: any = usersGlobalStore();

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const response = await saveAndGetCurrentUser();
      if(response.success) {
        message.success('User logged in successfully!');
        setLoggedInUserdata(response.data);
        console.log('response', response.data)
        console.log('loggedInUserData', loggedInUserData)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      //console.log(error)
      message.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [])

  if(loading) {
    return (
      <div className='flex h-screen justify-center items-center global-spinner'>
        <Spin />
      </div>
    )
  }

  if(loggedInUserData) return null;

  return <div>{children}</div>;

}

export default CustomLayout;
