import "./Footer.scss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../../App';

export default function Footer() {

    const { setFilterLink } = useContext(DataContext);

    const handleLink = (e) => {
        setFilterLink(e.target.name)
    }

    return (
        <div className="footer">
            <div className="company">
                <div className="logo">
                    <Link to="/"><img src="/assets/img/logo.png" alt="" /></Link>
                    <p className="name">легендарные ножи,<br></br>
                        создающие шедевры</p>
                </div>
                <div className="description">
                    <p>Компания «Tuotown» – эксклюзивный представитель профессиональных кухонных ножей,
                        изготовленных лучшими мастерами Восточной Азии с применением передового европейского
                        оборудования и современных материалов.</p>
                    <p>Они отличаются идеальным балансом и фантастической остротой.
                        Сочетают в себе вековые традиции и новейшие разработки.
                        Также предлагаем широкий ассортимент сопутствующих товаров.</p>
                </div>
            </div>
            <div className="links">
                <div className="info">
                    <h2>Информация</h2>
                    <ul className="linkItems">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="about">О Компании</Link></li>
                        <li><Link to="contacts">Контакты</Link></li>
                    </ul>
                </div>
                <div className="catalog_footer">
                    <h2>Каталог</h2>
                    <ul className="linkItems">
                        <li><Link onClick={handleLink} to="/catalog" name="Кухонные ножи">Кухонные ножи</Link></li>
                        <li><Link onClick={handleLink} to="/catalog" name="Складные ножи">Складные ножи</Link></li>
                        <li><Link onClick={handleLink} to="/catalog" name="Точилки">Точилки для ножей</Link></li>
                        <li><Link onClick={handleLink} to="/catalog" name="аксессуары">Аксессуары</Link></li>
                    </ul>
                </div>
                <div className="social">
                    <h2>Мы в соцсетях</h2>
                    <div className="icons">
                        <Link to="/fb" href="."><img src="/assets/icons/social/facebook.svg" alt="" /></Link>
                        <Link to="/insta" href="."><img src="/assets/icons/social/instagramm.svg" alt="" /></Link>
                        <Link to="/youtube" href="."><img src="/assets/icons/social/youtube.svg" alt="" /></Link>
                    </div>
                </div>
            </div>
            <div className="info">
                <h2>Контактная информация</h2>
                <h2>+7 (981) 120-11-17</h2>
                <div className="mail">tuotown@gmail.com</div>
                <div className="hours">08:00 — 18:00, ежедневно</div>
                <div className="adress">
                    Украина, Киев, ул. Шевченка 15а.
                </div>
            </div>
        </div >
    )
}

