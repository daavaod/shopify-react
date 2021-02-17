import React, { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Grid, Flex, Image, Text, Button, Heading } from '@chakra-ui/react'

import { ShopContext } from '../context/shopContext'

const ProductPage = () => {

    const { handle } = useParams();

    const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);

    useEffect(() => {
        fetchProductWithHandle(handle);
    }, [fetchProductWithHandle, handle])

    if (!product.title) return <div>Loading...</div>

    console.log('product page: ', product)

    return (
        <Box p="2rem">
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} m="auto">
                <Flex justifyContent="center" alignitems="center">
                    <Image src={product.images[0].src}/>
                </Flex>
                <Flex px="2rem" flexDirection="column" alignItems="center" justifyContent="center">
                    <Heading pb="2rem">{product.title}</Heading>
                    <Text fontWeight="bold" pb="2rem">{product.variants[0].price}</Text>
                    <Text pb="2rem" color="gray.500">{product.description}</Text>
                    <Button
                        onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                        _hover={{ opacity: '70%' }}
                        w="10rem"
                        backgroundColor="#FF38BD"
                        color="white"
                    >Add To Cart</Button>
                </Flex>
            </Grid>
        </Box>
    )
}

export default ProductPage
