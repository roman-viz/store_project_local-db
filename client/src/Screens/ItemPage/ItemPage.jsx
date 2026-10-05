/* eslint-disable react-hooks/exhaustive-deps */
import './ItemPage.scss';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../App';
import Review from '../../Components/Review/Review';
import PopUp from '../../Components/PopUp/PopUp';
import ItemPageSlider from '../../Components/ItemPageSlider/ItemPageSlider.jsx';

export default function ItemPage() {

    const { data, addToCart, cart } = useContext(DataContext);

    const [currentItem, setCurrentItem] = useState({});

    let location = useLocation();
    useEffect(() => {
        setCurrentItem(getCurrentItem(data));
    }, [location]);

    useEffect(() => {
        if (!data.length) {
            return
        }
        setCurrentItem(getCurrentItem(data));
    });

    const getCurrentItem = (db) => {
        let currentItemId = +location.hash.replace('#', '');
        let item = db.find(item => +item.id === +currentItemId);
        return item;
    }

    const [counter, setCounter] = useState(0);
    const [popUp, setPopUp] = useState(false);

    const handleBuyItem = () => {
        let contain = false;
        cart.forEach(el => {
            if (el.id === currentItem.id) {
                return contain = true;
            }
        })
        if (contain) {
            setPopUp(true);
            return;
        }
        addToCart(currentItem, data, counter, setCounter);
    }

    return (
        <div className='itemPage'>
            <PopUp popUp={popUp} setPopUp={setPopUp}>Вы уже добавили товар в корзину!</PopUp>
            <div className="heading">
                <div className="bg">
                    <img src="/assets/img/main/slideBanner.png" alt="slide" />
                </div>
                <div className="title">
                    <div className="image">
                        <img src={currentItem?.img?.title || 'Загрузка...'} alt="item" />
                    </div>
                    <h2>{currentItem?.title || 'Загрузка...'}</h2>
                    <h3>Коллекция: {currentItem?.collection || '-'}</h3>
                </div>
            </div>
            <div className="itemSlider">
                {(currentItem !== undefined && Object.keys(currentItem).length) ? <ItemPageSlider slides={currentItem.img.itemPageSlider} /> : ''}
            </div>
            <div className="specs">
                <img src="/assets/img/knifeSpecs.png" alt="specs" />
                <div className="info">
                    <h3>Характеристики:</h3>
                    <div className="items">
                        <div className="item">
                            <div className="name">
                                Длина лезвия:</div>
                            <div className="value">{currentItem?.bladeLength ? currentItem.bladeLength + ' cm' : '-'}</div>
                        </div>
                        <div className="item">
                            <div className="name">Материал клинка: </div>
                            <div className="value">{currentItem?.bladeMaterial || '-'}</div>
                        </div>
                        <div className="item">
                            <div className="name">Материал рукоятки:</div>
                            <div className="value">{currentItem?.handleMaterial || '-'}</div>
                        </div>
                        <div className="item">
                            <div className="name">Материал:</div>
                            <div className="value">{currentItem?.material || '-'}</div>
                        </div>
                        <div className="item">
                            <div className="name">Цена: </div>
                            <div className="value">{currentItem?.price + ' UAH' || ''}</div>
                        </div>
                    </div>
                    <button onClick={handleBuyItem} type='button'>Купить</button>
                </div>
            </div>
            <Review currentItemID={currentItem?.id} data={currentItem?.reviews}></Review>
        </div>
    )
}
