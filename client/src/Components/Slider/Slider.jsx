import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';
import { Link } from 'react-router-dom';

export default function Slider({ slides }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pointerStart = useRef(null);

    useEffect(() => {
        if (isPaused || slides.length < 2) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setActiveIndex(current => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [isPaused, slides.length]);

    const showSlide = (index) => {
        setActiveIndex((index + slides.length) % slides.length);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showSlide(activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(activeIndex + 1);
        }
    };

    const handlePointerUp = (event) => {
        if (pointerStart.current === null) {
            return;
        }

        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;

        if (Math.abs(distance) > 50) {
            showSlide(activeIndex + (distance < 0 ? 1 : -1));
        }
    };

    if (!slides.length) {
        return null;
    }

    return (
        <div
            className="slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Рекомендуемые товары"
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsPaused(false);
                }
            }}
            onKeyDown={handleKeyDown}
            onPointerDown={event => {
                pointerStart.current = event.clientX;
            }}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
                pointerStart.current = null;
            }}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide${index === activeIndex ? ' slide-active' : ''}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} из ${slides.length}`}
                    aria-hidden={index !== activeIndex}
                >
                    <div className="item">
                        <div className="item_background">
                            <img src={slide.imgSrc} alt={slide.imgAlt} />
                        </div>
                        <div className="item_content">
                            <h1>{slide.title}</h1>
                            <h4>Коллекция: {slide.collection}</h4>
                            <h4>Цена: {slide.price} UAH</h4>
                            <button><Link to={`items/itemID_#${slide.id}`}>Подробнее</Link></button>
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                className="swiper-button-prev"
                aria-label="Предыдущий слайд"
                onClick={() => showSlide(activeIndex - 1)}
            />
            <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
                {slides.map((slide, index) => (
                    <button
                        type="button"
                        key={slide.id}
                        className={`swiper-pagination-bullet${index === activeIndex ? ' swiper-pagination-bullet-active' : ''}`}
                        aria-label={`Показать слайд ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                        onClick={() => showSlide(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                type="button"
                className="swiper-button-next"
                aria-label="Следующий слайд"
                onClick={() => showSlide(activeIndex + 1)}
            />
        </div>
    );
}
