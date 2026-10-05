/* eslint-disable react-hooks/exhaustive-deps */
import './Cart.scss';
import React, { useContext, useState, useEffect } from 'react'
import Modal from '../../Components/Modal/Modal';
import InputNumber from '../../Components/InputNumber/InputNumber';
import PopUp from '../../Components/PopUp/PopUp';
import { DataContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, setCart, getStorage, setStorage } = useContext(DataContext);
    const [popUp, setPopUp] = useState(false);
    const [modal, setModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [myOrders, setMyOrders] = useState([]);
    const [popUpCartEmpty, setPopUpCartEmpty] = useState(false);

    const regExs = {
        name: /^([a-zA-Zа-яієїґА-ЯІЄЇ']{3,})+\s?([a-zA-Zа-яієїґА-ЯІЄЇ']{3,})+\s?$/,
        tel: /^([0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2,3})$/,
        email: /[^@\s]+@[^@\s]+\.[^@\s]+/,
    };

    const updateTotalPrice = (db) => {
        let prices = [];
        if (db === null) {
            return
        }
        let cartTotalPrice = db.map(el => {  // get total price from Cart items ~~~~~~~~~~~
            return el = {
                ...el,
                totalPrice: el.price * el.amount,
            }
        })
        prices = cartTotalPrice.map(el => el.totalPrice);
        let totalPrices = prices.reduce((prev, curr) => prev + curr, 0);
        setTotalPrice(totalPrices);
    }

    useEffect(() => {
        if ((cart === null || !cart.length) && (getStorage('cart') !== 'undefined' && getStorage('cart') !== null)) {
            updateTotalPrice([])
            if (getStorage('cart').length > 0) {
                setCart(getStorage('cart'))
            } else {
                return
            }
        }
        updateTotalPrice(cart)
    }, [cart])

    const [formValue, setFormValue] = useState(getStorage('cartForm') || // set Input values from Storage if it's not empty ~~~~~~~~~~~
    {
        name: '',
        tel: '',
        email: '',
    });

    const [form, setForm] = useState({ // check form Validation on load (in case we get it from Storage) ~~~~~~~~~~~~~
        tel: regExs['tel'].test(formValue['tel']),
        name: regExs['name'].test(formValue['name']),
        email: regExs['email'].test(formValue['email']),
    });

    useEffect(() => {
        if (!formValue.name.length && !formValue.tel.length && !formValue.email.length) {
            return
        }
        setStorage('cartForm', formValue);
    }, [formValue]);

    const handleInputValidation = (e) => {
        const isMatch = regExs[e.target.name].test(e.target.value);
        setForm({
            ...form,
            [e.target.name]: isMatch
        });
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        })
        handleClassName(e, regExs[e.target.name].test(e.target.value));
    }

    const handleClassName = (e, isValidate) => {
        if (e.target.value.length) {
            if (isValidate) {
                e.target.setAttribute('class', 'valid');
            } else {
                e.target.setAttribute('class', 'invalid');
            }
        } else {
            e.target.setAttribute('class', '');
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (form.name && form.email && form.tel) {
            e.currentTarget.reset();
            setForm({
                tel: false,
                name: false,
                email: false,
            })
        }
    };


    const popTimer = () => {
        setPopUp(false);
    }

    useEffect(() => {
        if ((getStorage('myOrders') !== 'undefined' && getStorage('myOrders') !== null) && getStorage('myOrders').length) { // get myOrders from storage
            setMyOrders(getStorage('myOrders'))
            return
        }
    }, [])

    const handleSendOrder = () => {
        if (!cart.length) {
            setPopUpCartEmpty(true) // IF CART IS EMPTY ON SUBMIT ORDER ~~~~~~~~~~~~~~~~~
            return
        }
        if (!popUp) {
            clearTimeout(popTimer);
        }
        if (form.name && form.email && form.tel) { // clear All storages and cart on submit ~~~~~~~~~~~~~~~~
            setModal(true);
            setFormValue({
                name: '',
                tel: '',
                email: '',
            })
            localStorage.removeItem('cartForm');
            localStorage.removeItem('cart');
            let date = new Date();
            let orderedItems = { // ordered items with INFO ~~~~~~~~~~~~~~~
                orderItems: cart,
                date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                time: `${date.getHours()}:${date.getMinutes()}`,
                totalPrice: totalPrice,
            }
            setMyOrders([
                orderedItems,
                ...myOrders
            ])
            setCart([]);
            setStorage('myOrders', [
                orderedItems,
                ...myOrders
            ])
        } else {
            setPopUp(true);
            setTimeout(popTimer, 3000);
        }
    }

    const handleDeleteElem = (e) => { // delete Item from CART ~~~~~~~~~~~~
        let result = [];
        result = cart.filter(item => +item.id !== +e.currentTarget.id);
        setCart(result)
        setStorage('cart', result)
    }



    const [showOrders, setShowOrders] = useState(false);
    const showOrdersHistory = () => { // Order list handle ~~~~~~~~~~~~~
        setShowOrders(prev => !prev)
    }



    const navigate = useNavigate();
    const goBack = () => { // Go back button ~~~~~~~~~~~~~
        return navigate(-1);
    }

    return (
        <div className='Cart'>
            <Modal modal={modal} setModal={setModal}>Благодарим за ваш заказ! <br></br> Ожидайте звонка...</Modal>
            <PopUp popUp={popUp} setPopUp={setPopUp}>Пожалуйста, заполните <br></br> все поля!</PopUp>
            <PopUp popUp={popUpCartEmpty} setPopUp={setPopUpCartEmpty}>Ваша корзина пуста!</PopUp>
            <div className="top">
                <div onClick={goBack} className="back">
                    <img src="./assets/icons/arrow-toRight.svg" alt="." />
                    <h4>Назад</h4>
                </div>
                <h2>Корзина</h2>
            </div>
            <div className="mid">
                <ul className="items">
                    {cart !== null && cart.length ? cart.map(el => {
                        return (
                            <li key={el.id} className="item">
                                <div className="item_name">
                                    <img src={el.img.title} alt={el.img.alt} />
                                    <h3>{el.title}</h3></div>
                                <div className="item_info">
                                    <InputNumber currentElem={el.id}>{el.amount}</InputNumber>
                                    <div className="price">{el.price * el.amount} ₴</div>
                                    <div id={el.id} onClick={handleDeleteElem} className="close">
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </li>
                        )
                    }) : null}
                </ul>
                <div className="total">
                    <h3>К оплате:</h3>
                    <div className="totalPrice">{totalPrice} UAH</div>
                </div>
            </div>
            <div className="bottom">
                <h3>Для подтверждения заказа - введите ваши данные и мы перезвоним вам</h3>
                <form action="." onSubmit={handleSubmit}>
                    <div className="info">
                        <div className="info_item required">
                            <p className="name">Получатель</p>
                            <input value={formValue.name} name="name" onChange={handleInputValidation} spellCheck="false"
                                placeholder='Имя Фамилия' type="text" />
                        </div>
                        <div className="info_item required">
                            <p className="name">Мобильный телефон</p>
                            <input value={formValue.tel} name="tel" onChange={handleInputValidation} spellCheck="false"
                                placeholder='0## _ - - - _ - - _ - -' type="tel" />
                        </div>
                        <div className="info_item">
                            <p className="name">E-mail</p>
                            <input value={formValue.email} name="email" onChange={handleInputValidation} spellCheck="false"
                                placeholder='Ваша почта' type="email" />
                        </div>
                    </div>
                    <div className="send">
                        <div className="policy">
                            Нажимая «Выбрать способ доставки», подтверждаю, что я ознакомлен с условиями
                            <Link to="policy"> Публичного договора оферты</Link> и <Link to="policy">Политикой конфиденциальности</Link>,
                            а также согласен получать информационную рассылку
                        </div>
                        <button onClick={handleSendOrder} type="submit">Отправить форму</button>
                    </div>
                </form>
            </div>
            <button onClick={showOrdersHistory} type="button" className="showMyorders">Список покупок</button>
            <div className={showOrders ? "ordersHistory show" : "ordersHistory"}>
                <div className="ordersItem">
                    <div className="ordersHeadingDate">
                        Дата
                    </div>
                    <div className="ordersHeadingItems">
                        Приобретенные товары
                    </div>
                    <div className="ordersHeadingTotal">
                        Итог ₴
                    </div>
                </div>
                {myOrders.length ? myOrders.map((order, ind) => {
                    return (<div key={ind} className="ordersItem">
                        <div className="date">
                            <div className="Date">{order.date}</div>
                            <div className="time">{order.time}</div>
                        </div>
                        <div className="items">
                            {order.orderItems.map(item => {
                                return (<Link to={`../items/itemID_#${item.id}`} key={item.id} className="item">
                                    <div className="itemName">{item.title}</div>
                                    <div className="itemAmount">{item.amount}x</div>
                                </Link>)
                            })}
                        </div>
                        <div className="totalPrice">
                            <div className="totalPrice_wrapper">
                                {order.totalPrice} ₴
                            </div>
                        </div>
                    </div>)
                }) : <div className="ordersItem"><div className="items">Здесь пока пусто...</div></div>}
            </div>
        </div >
    )
}