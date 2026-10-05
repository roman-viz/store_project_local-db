/* eslint-disable react-hooks/exhaustive-deps */
import FilterSelect from '../../Components/FilterSelect/FilterSelect';
import "./Catalog.scss";
import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../App';
import { Link } from 'react-router-dom';
import PaginatedItems from '../../Components/PaginatedItems/PaginatedItems';

function Catalog({ menuLinksFilter }) {

    let { data, filterLink } = useContext(DataContext);
    const [filterByMaterial, setFilterByMaterial] = useState(['Все', 'Сталь', 'Нержавеющая сталь', 'Титан', 'Дерево']);
    const [pageTitle, setPageTitle] = useState(['Ножи'])
    const [filterData, setFilterData] = useState(data);
    const [filter, setFilter] = useState({
        filter: 'Ножи',
    });
    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: 9999,
    });

    const sortBy = ['Цена по убыванию', 'Цена по возрастанию', 'Рейтингу']

    useEffect(() => {
        setFilter({ filterLink: filterLink }) // filterLink = link from MENU or FOOTER ~~~~~~~~~~~      
    }, [filterLink])

    useEffect(() => {
        handleAllFilters(filter, data);
        getPriceRange(data)
    }, [data]);

    useEffect(() => {
        handleAllFilters(filter, data);
        let title = Object.values(filter).filter(el => el !== '');
        setPageTitle([...title]);
    }, [filter]);

    useEffect(() => {
        if (filter['Что ищем?'] !== undefined &&
            (filter['filterLink'] !== undefined && filter['filterLink'].length)) { // reset filterLink if new TYPE filter is set ~~~~~~~~~~
            setFilter({
                ...filter,
                filterLink: '',
            })
        }
    }, [filterData]);

    const handleFilter = (e) => { // handle TYPE filters ~~~~~~~~~~      
        if (e.target.getAttribute('value') === 'Все') {
            setFilter({
                ...filter,
                [e.target.getAttribute('name')]: '',
            })
        } else {
            // Refresh MATERIAL filter if TYPE filter is pressed ~~~~~~~~~~~~~~~~~
            if (e.target.getAttribute('name') === 'Что ищем?' && (filter['Материал'] !== undefined && filter['Материал'] !== '')) {

                setFilter({
                    ...filter,
                    [e.target.getAttribute('name')]: e.target.getAttribute('value'),
                    'Материал': '',
                });
                return
            }
            setFilter({
                ...filter,
                [e.target.getAttribute('name')]: e.target.getAttribute('value'),
            })
        }
    }

    const handleStatus = (e) => { // handle STATUS filter ~~~~~~~~~~
        if (e.target.getAttribute('id') === 'All') {
            setFilter({
                ...filter,
                filterStatus: '',
            })
        } else {
            setFilter({
                ...filter,
                filterStatus: e.target.getAttribute('id'),
            })
        }
    }

    const handleAllFilters = (filter, db) => { // handle All filters ~~~~~~~~~~            
        let result = [];
        let filterIsPassed = [];
        db.filter(el => {
            Object.values(filter).forEach(filter => {
                if (JSON.stringify(el).toLowerCase().includes(filter.toLowerCase())) {
                    filterIsPassed.push(1) // filter match
                } else {
                    filterIsPassed.push(0) // filter failed
                }
            })
            if (filterIsPassed.every(el => el === 1)) { // if all filters are match ~~~~~~~~~~~

                result.push(el);
            }
            return filterIsPassed = [];
        })
        result = [...new Set(result)]
        setFilterData(result);
        getPriceRange(result);

        // MATERIAL filter depends on TYPE filter ~~~~~~~~~~~~~~~~~~~
        const filterMaterialByType = (filterIsOn, type) => {
            if (!filterIsOn) { return }
            let tempFilter = ['Все'];
            let tempData = data.filter(el => JSON.stringify(el[type]).toLowerCase().includes((filterIsOn).toLowerCase()))
            tempData.forEach(el => {
                if (el.material) {
                    tempFilter.push(el.material)
                }
                if (el.bladeMaterial) {
                    tempFilter.push(el.bladeMaterial)
                }
                if (el.handleMaterial) {
                    tempFilter.push(el.bladeMaterial)
                }
            })
            return setFilterByMaterial([...new Set(tempFilter)]);
        }
        filterMaterialByType(filter['Что ищем?'], 'type');
        filterMaterialByType(filter['filterLink'], 'topic');
        // MATERIAL filter depends on TYPE filter ~~~~~~~~~~~~~~~~~~~
    }

    const getPriceRange = (data) => {
        let min = Infinity;
        let max = 0;
        let prices = data.map(el => el.price);
        prices.forEach(el => {
            if (el > max) {
                max = el;
            }
            if (el < min) {
                min = el;
            }
        })
        setPriceRange({
            min: min,
            max: max,
            mainEdge: max,
        })
    }

    const handlePrice = (e) => {
        let result = [];
        result = data.filter(el => el.price >= +priceRange.min && el.price <= +e.target.value); // Filter by PRICE ~~~~~~~~~
        handleAllFilters(filter, result); // Filter by current FILTERS ~~~~~~~~~
        if (e.target.name === 'price') { // prcieRange from inputs
            if (e.target.getAttribute('id') === 'min') {
                result = data.filter(el => el.price >= +e.target.value && el.price <= +priceRange.max);
            } else {
                result = data.filter(el => el.price >= +priceRange.min && el.price <= +e.target.value);
            }
            handleAllFilters(filter, result);
            setPriceRange({
                ...priceRange,
                [e.target.getAttribute('id')]: +e.target.value
            })
        }
        if (e.target.name === 'priceRange') {  // prcieRange from range
            setPriceRange({
                ...priceRange,
                min: +e.target.min,
                max: +e.target.value,
            })
        }
    }

    const resetFilters = () => {
        setFilter({});
    }

    // Sort items ~~~~~~~~~~~~~~~~~~~~~~~~~

    const sortData = (data, criterium, direction) => { // SORT function ~~~~~~~~~
        if (direction === '-') {
            return data.sort((a, b) => b[criterium] - a[criterium])
        }
        if (direction === '+') {
            return data.sort((a, b) => a[criterium] - b[criterium])
        }
    }

    const [sortVisibility, setSortVisibility] = useState(false);
    const handleSortItems = (e) => { // handle SORT by SELECT ~~~~~~~
        setSortVisibility(prev => !prev);
        if (e.target.getAttribute('value').includes('возрастанию')) {
            setFilterData(sortData([...filterData], 'price', '+'))
        }
        if (e.target.getAttribute('value').includes('убыванию')) {
            setFilterData(sortData([...filterData], 'price', '-'))
        }
        if (e.target.getAttribute('value').includes('Рейтингу')) {
            setFilterData(sortData([...filterData], 'itemRating', '-'))
        }
    }

    // Sort items ~~~~~~~~~~~~~~~~~~~~~~~~~

    return (
        <div className='catalog'>
            <div className="header">
                <div className="bg">
                    <div className="bg-wrapper"></div>
                    <img src="./assets/img/catalog/catalog-header.png" alt="catalog header background" />
                </div>
                <div className="wrapper">
                    <h1>Дом и Ножи</h1>
                    <h3>Эксклюзивные технологии на страже чистоты и уюта в вашем доме</h3>
                </div>
            </div>
            <h2 className='catalog_heading'>Ваш фильтр: {pageTitle.map((title, ind) => <p key={ind}>{title}</p>)}</h2>
            <div className="content">
                <div className="filters">
                    <div onClick={resetFilters} className="resetFilter">
                        <h3>Сбросить фильтр</h3>
                        <div className="res">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <FilterSelect name="Что ищем?" handleFilter={handleFilter} filter={menuLinksFilter} />
                    <FilterSelect name="Материал" handleFilter={handleFilter} filter={filterByMaterial} />
                    <div className="status">
                        <h3>Статус</h3>
                        <div onChange={handleStatus}>
                            <input type="radio" id="All" name="status" />
                            <label htmlFor="All">Все</label>
                        </div>
                        <div onChange={handleStatus}>
                            <input type="radio" id="Новинка" name="status" />
                            <label htmlFor="Новинка">Новинки</label>
                        </div>
                        <div onChange={handleStatus}>
                            <input type="radio" id="Популярное" name="status" />
                            <label htmlFor="Популярное">Популярные</label>
                        </div>
                    </div>
                    <div className="price">
                        <label htmlFor="volume"><h3>Цена</h3></label>
                        <div className="range">
                            <input type="number" name="price" id="min" value={priceRange.min} onChange={handlePrice} />
                            <input type="number" name="price" id="max" value={priceRange.max} onChange={handlePrice} />
                        </div>
                        <input type="range" name="priceRange" onChange={handlePrice}
                            min={priceRange.min} max={priceRange.mainEdge} />
                    </div>
                </div>
                <div className="items">
                    <div className="sortItems">
                        <FilterSelect name="Сортировать" handleFilter={handleSortItems} filterVisibility={sortVisibility} filter={sortBy} />
                    </div>
                    <PaginatedItems parentBlockClass={"items__wrapper"} itemsPerPage={6} data={filterData} />                   
                </div>
            </div>
            <div className="footer">
                <div className="knifeTypes">
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type1.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type2.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type3.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type4.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type5.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type6.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type7.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                    <Link to="/knifes-with-surface">
                        <div className="img-wrapper"></div>
                        <img src="./assets/img/catalog/catalog-footer-type8.png" alt="" />
                        <h5>Ножи с покрытием</h5>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Catalog;