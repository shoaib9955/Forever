import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [cartItemTimes, setCartItemTimes] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [compareProducts, setCompareProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }

            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                const mappedProducts = response.data.products.map(product => ({
                    ...product,
                    volume: product.sizes // Supporting both names for transition
                }))
                setProducts(mappedProducts)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        setUser(null)
        setCartItems({})
        navigate('/login')
        toast.info("Session expired. Please login again.")
    }

    // Axios Interceptor for production-ready error handling
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            // Error handling is partly covered by redirect but we still catch
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const removeFromCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity: 0 }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const isInWishlist = (itemId) => wishlist.includes(itemId);

    const toggleWishlist = (itemId) => {
        if (isInWishlist(itemId)) {
            setWishlist(prev => prev.filter(id => id !== itemId));
        } else {
            setWishlist(prev => [...prev, itemId]);
        }
    };

    const isInCompare = (itemId) => compareProducts.includes(itemId);

    const toggleCompare = (itemId) => {
        if (isInCompare(itemId)) {
            setCompareProducts(prev => prev.filter(id => id !== itemId));
        } else {
            if (compareProducts.length < 4) {
                setCompareProducts(prev => [...prev, itemId]);
            } else {
                toast.error('You can only compare up to 4 products');
            }
        }
    };

    const addToRecentlyViewed = (itemId) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(id => id !== itemId);
            return [itemId, ...filtered].slice(0, 10);
        });
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, removeFromCart,
        getCartAmount, navigate, backendUrl,
        setToken, token,
        user, setUser,
        wishlist, setWishlist, isInWishlist, toggleWishlist,
        recentlyViewed, setRecentlyViewed, addToRecentlyViewed,
        compareProducts, setCompareProducts, isInCompare, toggleCompare,
        orders, setOrders, cartItemTimes
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

