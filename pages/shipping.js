import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
  } from '@material-ui/core';
  import { useRouter } from 'next/router';
  import React, { useContext, useEffect } from 'react';
  import Layout from './components/Layout';

  export default function Shipping() {
    const { state, dispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
      } = state;
    const router = useRouter();
    useEffect(() => {
        if (!userInfo) {
          router.push('/login?redirect=/shipping');
        }
      }, []);
    
  
   
    return (<></>
   
    );
  }