import './Review.scss';
import React, { useEffect, useState } from 'react';
import PopUp from '../PopUp/PopUp';

export default function Review({ data: revDB }) {
    const [reviews, setReviews] = useState([]);
    const [reviewInputValue, setReviewInputValue] = useState({
        name: '',
        message: '',
    });

    useEffect(() => {
        setReviews(revDB);
    }, [revDB])

    const reviewInput = (e) => {
        setReviewInputValue({
            ...reviewInputValue,
            [e.target.name]: e.target.value,
        })
        setPopUp(false)
    }

    const [popUp, setPopUp] = useState(false);

    const addNewReview = () => {
        setPopUp(true)
    }

    // RATING ~~~~~~~~~~~~~~~~

    const [rating, setRating] = useState(1);
    const [ratingHover, setRatingHover] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleRating = value => {
        setRating(value)
    }

    const handleRatingOnOver = newHoverValue => {
        setRatingHover(newHoverValue)
    };

    const handleRatingOnLeave = () => {
        setRatingHover(undefined)
    }

    const handleClassOnRating = (review) => {
        if (review.rating > 4) {
            return 'item best'
        }
        if (review.rating < 2) {
            return 'item worst'
        }
        return 'item'
    }

    // RATING ~~~~~~~~~~~~~~~~

    return (
        <div className="reviews">
            <div className="title">Отзывы о товаре:</div>
            <div className="items">
                {reviews?.map((review, ind) => {
                    return (
                        <div key={ind} className={handleClassOnRating(review)}>
                            <div className="info">
                                <div className="name">{review.name}</div>
                                <div className="date">
                                    <div className="rates">
                                        {Array(review.rating).fill(0).map((_, i) => {
                                            return (<div key={i}>&#9733;</div>)
                                        })}
                                    </div>
                                    <span>{review.date}</span>
                                    <span>{review.time}</span>
                                </div>
                            </div>
                            <div className="msg">{review.message}</div>
                        </div>
                    )
                })}
                {!reviews?.length ? 'Отзывов пока нет...' : ''}
            </div>
            <div className="add">
                <PopUp popUp={popUp} setPopUp={setPopUp}>Server is OFF!</PopUp>
                <h3>Добавить отзыв</h3>
                <div className="revName">
                    <label htmlFor="name">Имя</label>
                    <input onChange={reviewInput} value={reviewInputValue.name} spellCheck="false" name="name" type="text" />
                </div>
                <div className="revMsg">
                    <label htmlFor="message">Отзыв</label>
                    <textarea onChange={reviewInput} value={reviewInputValue.message} spellCheck="false" name="message" id="" rows="5"></textarea>
                </div>
                <div className="setRating">
                    <label htmlFor="message">Оценка: </label>
                    <div className="stars">
                        {stars.map((_, ind) => {
                            return (
                                <div key={ind} className={(ratingHover || rating) > ind ? 'star yellow' : 'star'}
                                    onClick={() => handleRating(ind + 1)}
                                    onMouseOver={() => handleRatingOnOver(ind + 1)}
                                    onMouseLeave={handleRatingOnLeave}>&#9733;</div>
                            )
                        })}
                    </div>
                </div>
                <button onClick={addNewReview} type="button">Отправить</button>
            </div>
        </div>
    )
}
