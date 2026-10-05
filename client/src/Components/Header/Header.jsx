/* eslint-disable react-hooks/exhaustive-deps */
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../App';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Header() {
    let navigate = useNavigate();

    // CART ~~~~~~~~~~~~~~~~~~~~~~

    const { cart, getStorage, data, setSearchingItems, handleMenuVisibility } = useContext(DataContext);

    useEffect(() => { // counter in HEADER under cart icon ~~~~~~~~~~~~~
        if (cart !== null) {
            setTotalCartItems(cart.length)
        }
        if (getStorage('cart') !== 'undefined' && getStorage('cart') !== null) { // take counter from storage if it's not empty ~~~~~~~~~~~~
            setTotalCartItems(getStorage('cart').length)
        }
    }, [cart])

    const [totalCartItems, setTotalCartItems] = useState(0);

    // CART ~~~~~~~~~~~~~~~~~~~~~~

    // SEARCH ~~~~~~~~~~~~~~~~~~~~

    const onSearch = (e, _value) => {
        setSearchingItems(e.target.getAttribute('value'));
        if (e.key === 'Enter') {
            e.target.value = '';
            return navigate('/search')
        }
    }

    const onSearchChange = (e, value) => {
        if (value === null) {
            return
        }
        setSearchingItems(value.title);
        e.target.value = '';
        return navigate('/search')
    }


    return (
        <div className="header">
            <div className="left">
                <div className="burger" onClick={handleMenuVisibility}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <a href="tel:8 981 120-11-17" className="phone">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9999 16.9201V19.9201C22.0011 20.1986 21.944 20.4743 21.8324 20.7294C21.7209 20.9846 21.5572 21.2137 21.352 
                            21.402C21.1468 21.5902
                             20.9045 21.7336 20.6407 21.8228C20.3769 21.912 20.0973 21.9452 19.8199 21.9201C16.7428 21.5857 13.7869 20.5342 11.1899 
                             18.8501C8.77376 17.3148 6.72527 15.2663 5.18993 12.8501C3.49991 10.2413 2.44818 7.27109 2.11993 4.1801C2.09494 3.90356 
                             2.12781 3.62486 2.21643 3.36172C2.30506 3.09859 2.4475 2.85679 2.6347 2.65172C2.82189 2.44665 3.04974 2.28281 3.30372 
                             2.17062C3.55771 2.05843 3.83227 2.00036 4.10993 2.0001H7.10993C7.59524 1.99532 8.06572 2.16718 8.43369 2.48363C8.80166
                              2.80008 9.04201 3.23954 9.10993 3.7201C9.23656 4.68016 9.47138 5.62282 9.80993 6.5301C9.94448 6.88802 9.9736 7.27701
                               9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35993 8.6401L8.08993 9.9101C9.51349 12.4136 11.5864 14.4865 14.0899 
                               15.9101L15.3599 14.6401C15.6318 14.3712 15.9751 14.1859 16.3491 14.1062C16.723 14.0264 17.112 14.0556 17.4699 14.1901C18.3772 
                               14.5286 19.3199 14.7635 20.2799 14.8901C20.7657 14.9586 21.2093 15.2033 21.5265 15.5776C21.8436 15.9519 22.0121 16.4297 21.9999
                                16.9201Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>8 981 120-11-17</span>
                </a>
            </div>
            <div className="logo">
                <Link to="/"><img src="/assets/img/logo.png" alt="" /></Link>
            </div>
            <div className="right">
                <Link to="/cart" className="cart" aria-label={`Корзина, товаров: ${totalCartItems}`}>
                    <span className="totalCartItems">{totalCartItems}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9681 2C12.3023 2.06645 12.6486 2.11245 12.9767 2.20446C14.8663 2.75139 16.0632 
                            4.0855 16.1908 5.76719C16.1908 5.79786 16.203 5.82853 16.2091 5.88987C16.2941 5.88987 16.3792
                             5.88987 16.4582 5.88987C17.2602 5.88987 18.0683 5.88987 18.8703 5.88987C19.3685 5.88987 19.6116
                              6.07388 19.6602 6.48792C19.8242 8.02137 19.9822 9.55994 20.1402 11.0934C20.3346 12.9182 20.529
                               14.7481 20.7234 16.5729C20.8206 17.4675 20.9482 18.362 20.9968 19.2565C21.0455 20.1766 20.529 
                               20.882 19.6602 21.4084C18.9736 21.8225 18.1898 21.9912 17.3453 21.9912C14.3073 21.986 11.2633 
                               21.9912 8.22539 21.9912C7.27148 21.9912 6.32364 22.0167 5.36973 21.9809C4.16671 21.94 3.17634 
                               21.5209 2.47762 20.6724C1.99763 20.0897 1.94902 19.4354 2.03408 18.7505C2.21028 17.3346 2.34395 
                               15.9136 2.48977 14.4926C2.63559 13.0971 2.78749 11.7068 2.93331 10.3113C3.06698 9.07434 3.19457
                                7.83736 3.32217 6.60037C3.32824 6.54414 3.32824 6.4828 3.34039 6.42658C3.40115 6.06877 3.63811
                                 5.88987 4.07557 5.88476C4.88974 5.87964 5.69783 5.88476 6.51199 5.88476C6.60313 5.88476 6.69427 
                                 5.88476 6.79148 5.88476C6.82794 5.27648 6.96768 4.71422 7.2897 4.19284C8.05526 2.98141 9.24005
                                  2.2658 10.8441 2.04089C10.9109 2.03067 10.9778 2.01533 11.0446 2C11.3484 2 11.6582 2 11.9681 
                                  2ZM6.80971 7.00929C6.06238 7.00929 5.34543 7.00929 4.61632 7.00929C4.61025 7.05018 4.5981 7.08085
                                   4.5981 7.11663C4.41582 8.86477 4.22747 10.618 4.04519 12.3662C3.80823 14.6459 3.57128 16.9308
                                    3.32824 19.2105C3.28571 19.6296 3.44976 19.9772 3.77785 20.2788C4.28823 20.7388 4.94442 20.8973
                                     5.66745 20.8973C9.556 20.9024 13.4506 20.9024 17.3392 20.8973C17.7766 20.8973 18.1959 20.836 
                                     18.5969 20.6724C19.2348 20.4117 19.7938 19.8545 19.6845 19.1389C19.6176 18.7096 19.5872 18.27
                                      19.5447 17.8355C19.3867 16.302 19.2227 14.7635 19.0647 13.23C18.8824 11.5023 18.7002 9.76951 
                                      18.5179 8.04182C18.4814 7.69935 18.4389 7.35687 18.4025 7.01951C17.6612 7.01951 16.9382 7.01951
                                       16.203 7.01951C16.203 7.09107 16.203 7.15241 16.203 7.20864C16.203 7.70446 16.2091 8.20027 
                                       16.1969 8.69098C16.1908 9.00278 15.8992 9.2328 15.5407 9.22769C15.1944 9.22258 14.9149 8.99767
                                        14.8967 8.69609C14.8906 8.59386 14.8967 8.48652 14.8967 8.38429C14.8967 7.92936 14.8967 7.47444
                                         14.8967 7.01951C12.6243 7.01951 10.3823 7.01951 8.1221 7.01951C8.1221 7.07063 8.1221 7.11152
                                          8.1221 7.1473C8.1221 7.65334 8.12817 8.16449 8.1221 8.67053C8.11602 8.99767 7.83046 9.2328
                                           7.4659 9.22769C7.10743 9.22769 6.83401 8.99256 6.82186 8.68076C6.81579 8.58364 6.82186
                                            8.48652 6.82186 8.3894C6.80971 7.92936 6.80971 7.47444 6.80971 7.00929ZM14.8906 5.87964C14.8055
                                             4.81134 14.2526 3.99349 13.159 3.47723C11.9742 2.92007 10.7772 2.96097 9.64106 3.58457C8.675
                                              4.11617 8.18285 4.89823 8.1221 5.87964C10.3884 5.87964 12.6304 5.87964 14.8906 5.87964Z"
                                fill="white" />
                    </svg>
                </Link>
                <div className="search">
                    <Autocomplete
                        className="search"
                        disablePortal
                        id="combo-box-demo"
                        options={data}
                        clearOnEscape
                        getOptionLabel={(item) => `${item.title}`}
                        sx={{ width: 300 }}
                        noOptionsText={'Пусто...'}
                        isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                        }
                        onChange={onSearchChange}
                        onKeyDown={onSearch}
                        onInputChange={onSearch}
                        classes={{
                            option: 'listOption',
                            listbox: 'listbox',
                        }}
                        renderInput={(params) => <TextField {...params} label="Поиск" />}
                    />
                    {/*  <input onKeyDown={onSearch} onChange={onSearch} type="search" placeholder="Поиск" spellCheck="false" />
                    <Link to="/search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5556 18.1111C14.7284 18.1111 18.1111 14.7284 18.1111 10.5556C18.1111 6.38274 14.7284 3 10.5556 3C6.38274 3 3 6.38274
                             3 10.5556C3 14.7284 6.38274 18.1111 10.5556 18.1111Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.9999 19.9999L15.8916 15.8916" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default Header;