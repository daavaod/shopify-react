import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

export class ShopProvider extends Component {

    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }

    componentDidMount() {
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id)
        } else {
            this.createCheckout();
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create();
        console.log('checkout from fn: ', checkout);

        localStorage.setItem("checkout_id", checkout.id)

        this.setState({ checkout });
    }

    fetchCheckout = (checkoutId) => { //no need for async coz .then()
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                this.setState({ checkout })
            })
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity, 10)
            }
        ];
        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({checkout: checkout})

        this.openCart();
    }

    removeLineItem = async (lineItemIdsToRemove) => {
        const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
        this.setState({checkout: checkout})
    }

    fetchAllProducts = async () => {
        // client.product.fetchAll().then((products) => {
        //     console.log(products);
        //     this.setState({ products: products })
        // });

        // cleaner approach
        const products = await client.product.fetchAll();
        console.log(products); //just to see output
        this.setState({ products }); //long form ({ products: products})

    }

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        console.log("fetchProductWithHandle: ", product); //just to see output
        this.setState({ product }) //long form ({ product: product })
    }

    closeCart = async () => {
        this.setState({isCartOpen: false})
    }

    openCart = async () => {
        this.setState({isCartOpen: true})
    }

    closeMenu = async () => {

    }

    openMenu = async () => {
        
    }

    render() {
        return (
            <ShopContext.Provider
                value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    addItemToCheckout: this.addItemToCheckout,
                    removeLineItem: this.removeLineItem,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    closeMenu: this.closeMenu,
                    openMenu: this.openMenu,
                }}
            >
                { this.props.children }
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider
