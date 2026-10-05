/* eslint-disable react-hooks/exhaustive-deps */
import './Search.scss';
import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Search({ searchingItems }) {

    let { data, setSearchingItems } = useContext(DataContext);
    let navigate = useNavigate();
    const [searchData, setSearchData] = useState([]);

    const getSearchedItems = (db) => {    
        let result = [];
        result = db.filter(el => JSON.stringify(el.topic).toLocaleLowerCase().includes(searchingItems.toLocaleLowerCase()) ||
            JSON.stringify(el.type).toLocaleLowerCase().includes(searchingItems.toLocaleLowerCase()) ||
            JSON.stringify(el.title).toLocaleLowerCase().includes(searchingItems.toLocaleLowerCase()))
        setSearchData(result);
    }

    useEffect(() => {
        if (searchingItems === null) {
            return
        }
        if (searchingItems.trim() !== '') {
            getSearchedItems(data);
        }
    }, [searchingItems])

    const onSearch = (e) => {
        setSearchingItems(e.target.value.toLowerCase())
    }

    const goToItemPage = (e) => {
        navigate(`../items/itemID_#${e.currentTarget.getAttribute('id')}`);
    }

    return (
        <div className='searchPage'>
            <div className="wrapper">
                <h3>Результат поиска: ' {searchingItems} '</h3>
                <input placeholder={searchingItems} onChange={onSearch} spellCheck="false" type="search" />
                {searchData.map(el => {
                    return (
                        <div key={el.id} id={el.id} onClick={goToItemPage} className="item">
                            <div className="desc">
                                <div className="title">{el.title}</div>
                                <div className="title">Коллекция: {el.collection}</div>
                                <div className="price">{el.price} ₴</div>
                            </div>
                            <div className="photo">
                                <img src={el.img.title} alt={el.img.alt} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
