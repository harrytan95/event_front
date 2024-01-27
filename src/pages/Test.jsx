import React from 'react';
import { Button } from '@chakra-ui/react'
// import  axios   from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useRefreshToken from '../hooks/useRefreshToken';

const SignupForm = () => {
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  const whoami = async () => {   
    try {
      const response = await axiosPrivate.get('api/auth/whoami',
      {
        headers : {'Content-Type': 'application/json'},
        withCredentials: true
      })
       console.log(response?.data);             
     }  catch(error) {
        console.log(error);   
    };      
  }

  return (
    <>
    <Button colorScheme="purple" onClick={whoami}>Who Am I</Button>
    <Button colorScheme="purple" onClick={refresh}>Refresh</Button>
    </>
    )
};

export default SignupForm;