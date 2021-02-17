import React, { useContext } from 'react'
import { Flex, Icon, Image, Badge, Box } from '@chakra-ui/react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'
import { MdMenu, MdShoppingBasket } from 'react-icons/md'

export const NavBar = () => {

    const { openCart, openMenu, checkout } = useContext(ShopContext);

    return (
        <Flex backgroundColor="#FFA8E2" flexDir="row" alignItems="center" justifyContent="space-between" p="2rem">
            <Icon
                fill="white" as={MdMenu}
                w={30}
                h={30}
                cursor="pointer"
                onClick={() => openMenu()}
            ></Icon>
            <Link to="/">
                <Image src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540" w={100} h={100} />
            </Link>
            <Box>
                <Icon
                    fill="white" as={MdShoppingBasket}
                    w={30}
                    h={30}
                    cursor="pointer"
                    onClick={() => openCart()}
                ></Icon>
                <Badge backgroundColor="#FF38BD" borderRadius="50%">
                    { checkout.lineItems?.length }
                </Badge>
            </Box>
        </Flex>
    )
}

export default NavBar;
