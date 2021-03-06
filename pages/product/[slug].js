import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import data from '../../utils/data';
import Layout from '../components/Layout';
import NextLink from "next/link"
import useStyles from '../../utils/styles';
import Image from 'next/image'
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import  { useContext, useEffect, useState } from 'react';

export default function ProductScreen(props) {
    const classes = useStyles();
    const {product}=props;
    const router = useRouter();
    const { state, dispatch } = useContext(Store);

    if(!product){
        return <div>Product not found</div>
    }

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
      };
    return (
      <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
            <NextLink href="/" passHref>
                <Link><Typography>back</Typography></Link>
            </NextLink>
        </div>
        <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
            <Image src={product.image} alt={product.name} width={640} height={640} Layout='responsive'></Image>
        </Grid>
        <Grid item md={3} xs={12}>
            <List>
            <ListItem>
                  <Typography component="h1" variant="h1">{product.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category:{product.category}</Typography>
                </ListItem>
                <ListItem>
                <Typography> Brand:{product.brand}</Typography>
                </ListItem>
                <ListItem>
                <Typography>Rating:{product.rating} stars({product.numReviews})</Typography>
                </ListItem>
                <ListItem>
                    description:<Typography>{product.description}</Typography>
                </ListItem>
            </List>
        </Grid>
        <Grid item md={3} xs={12}>
            <Card>
                <List>
                    <ListItem>
                        <Grid container>
                        <Grid item xs={6}><Typography>price</Typography></Grid>
                                <Grid item xs={6}><Typography>${product.price}</Typography></Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid container>
                        <Grid item xs={6}><Typography>Status</Typography></Grid>
                                <Grid item xs={6}><Typography>{product.countInStock > 0 ? 'In Stock':'NO'}</Typography></Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained" color='primary'  onClick={addToCartHandler}>Add to cart</Button>
                    </ListItem>
                </List>
            </Card>
        </Grid>

        </Grid>
      </Layout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const product = await Product.findOne({ slug }, '-reviews').lean();
    await db.disconnect();
    return {
      props: {
        product: db.convertDocToObj(product),
      },
    };
  }