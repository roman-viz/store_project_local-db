import React, { useContext, useState } from 'react'
import "./Menu.scss";
import { NavLink } from 'react-router-dom';
import { DataContext } from '../../App';

export default function Menu({ menuStatus, menuLinks, menuSubLinks }) {

    let { setFilterLink, handleMenuVisibility } = useContext(DataContext);
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleLink = (e) => {
        handleMenuVisibility();
        setFilterLink(e.target.name.toLowerCase())
    }

    const handleSubMenu = (link) => {
        setExpandedMenu(current => current === link ? null : link);
    }

    return (
        <div className={menuStatus ? 'Menu active' : 'Menu'}>
            <div onClick={handleMenuVisibility} className='Menu__wrapper'></div>
            <div className="Menu__content">
                <div className="close" onClick={handleMenuVisibility}>
                    <span></span>
                    <span></span>
                </div>
                <ul className='filterLinks'>
                    <li onClick={handleMenuVisibility}><NavLink to="/">Главная</NavLink></li>
                    <li onClick={handleMenuVisibility}><NavLink to="/catalog">Каталог</NavLink></li>
                    {menuLinks.map((link, i) => {
                        const isExpanded = expandedMenu === link;
                        return <li className={isExpanded ? 'activeSub' : ''} key={i}>
                            <button
                                type="button"
                                className="subName"
                                onClick={() => handleSubMenu(link)}
                                aria-expanded={isExpanded}
                            >
                                {link}
                                <span className="menu-chevron" aria-hidden="true"></span>
                            </button>
                            <div className='lunges'>
                                {menuSubLinks.map((subLink, ind) => {
                                    if (subLink[link] !== undefined) {
                                        return <NavLink to={`catalog`} name={subLink[link]} onClick={handleLink} key={ind} href="." >{subLink[link]}</NavLink>
                                    }
                                    return null
                                })}
                            </div>
                        </li>
                    })}
                </ul>
                <ul className='mainLinks'>
                    <li><NavLink onClick={handleLink} to="about">О компании</NavLink></li>
                    <li><NavLink onClick={handleLink} to="Contacts" href=".">Контакты</NavLink></li>
                </ul>
            </div>
        </div >
    )
}