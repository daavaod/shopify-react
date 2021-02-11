import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Grid,
    Text,
    Flex,
    Image
} from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const Cart = () => {

    const { closeCart, isCartOpen, checkout, removeLineItem } = useContext(ShopContext);

    console.log('checkout.lineItems cart', checkout.lineItems)

    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement="right"
                onClose={closeCart}
            >
                <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shopping Cart</DrawerHeader>

                    <DrawerBody>
                        {
                            checkout.lineItems && checkout.lineItems.map(item => (
                                <Grid templateColumns="repeat(4, 1fr)" gap={1} key={item.id}>
                                    <Flex alignItems="center" justifyContent="center">
                                        <CloseIcon cursor="pointer" />
                                    </Flex>
                                    <Flex alignItems="center" justifyContent="center">
                                        <Image src={item.variant.image.src} />
                                    </Flex>
                                    <Flex  alignItems="center" justifyContent="center">
                                        <Text>{item.title}</Text>
                                    </Flex>
                                    <Flex  alignItems="center" justifyContent="center">
                                        <Text>{item.variant.price}</Text>
                                    </Flex>
                                </Grid>
                            )) //regular braces so we dont have to return anything
                        }
                        {/* {checkout.lineItems && checkout.lineItems[0].title} */}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button>Checkout</Button>
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default Cart
