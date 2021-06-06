import React, { useEffect, useState } from 'react';
import moment from 'moment';
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';
import notificationService from '../services/notificationService';

const HomeBooking = (props) => {
  const [checkInState, setCheckInState] = useState('');
  const [checkOutState, setCheckOutState] = useState('');
  const [total, setTotal] = useState();

  useEffect(() => {
    const price = props.home ? props.home.price : 0;
    const checkInDate = moment(checkInState, 'YYYY-MM-DD');
    const checkOutDate = moment(checkOutState, 'YYYY-MM-DD');
    const nights = checkOutDate.diff(checkInDate, 'days');

    const grandTotal = nights * price;

    if (grandTotal > 0) {
      setTotal(grandTotal);
    } else {
      setTotal('--');
    }
  }, [checkInState, checkOutState, props]);

  if (!props.home) {
    return <div data-testid='empty'></div>;
  }

  const handleBooking = () => {
    apiClient
      .bookHome(props.home, checkInState, checkOutState)
      .then((response) => {
        bookingDialogService.close();
        notificationService.open(response.message);
      });
  };

  return (
    <>
      <h2 data-testid='title'>{props.home.title}</h2>
      <div data-testid='price' className='mb-3'>
        <span className='font-weight-bold text-primary text-large'>
          ${props.home.price} per night
        </span>
      </div>
      <form className='form-group'>
        <div className='form-group'>
          <label htmlFor='checkInDate'>Choose your checkin date</label>
          <input
            className='form-control'
            data-testid='check-in'
            id='checkInDate'
            type='date'
            onChange={(e) => setCheckInState(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='checkOutDate'>Choose your checkin date</label>
          <input
            className='form-control'
            data-testid='check-out'
            id='checkOutDate'
            type='date'
            onChange={(e) => setCheckOutState(e.target.value)}
          />
        </div>
      </form>
      <div data-testid='total' className='my-3 text-right'>
        <span className='font-weight-bold text-large'>Total: ${total}</span>
      </div>

      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-primary'
          data-testid='book-btn'
          type='button'
          onClick={handleBooking}
        >
          Book
        </button>
      </div>
    </>
  );
};

export default HomeBooking;
