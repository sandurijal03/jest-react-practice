import { act, fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';
import HomeBooking from './HomeBooking';
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';
import notificationService from '../services/notificationService';

let container = null;

const mockedHome = {
  title: 'Superb duplex apartment in the historical center',
  image: 'listing.jpg',
  location: 'New York, NY',
  price: '289',
};

beforeEach(() => {
  container = render(<HomeBooking home={mockedHome} />).container;
});

it('should show title', () => {
  expect(getByTestId(container, 'title').textContent).toBe(
    'Superb duplex apartment in the historical center',
  );
});

it('should show price', () => {
  expect(getByTestId(container, 'price').textContent).toBe('$289 per night');
});

it('should show check-in date field', () => {
  expect(getByTestId(container, 'check-in')).toBeTruthy();
});

it('should show checkout date field', () => {
  expect(getByTestId(container, 'check-out')).toBeTruthy();
});

it('should show total', () => {
  fireEvent.change(getByTestId(container, 'check-in'), {
    target: { value: '2020-12-04' },
  });

  fireEvent.change(getByTestId(container, 'check-out'), {
    target: { value: '2020-12-06' },
  });

  expect(getByTestId(container, 'total').textContent).toBe('Total: $578');
});

it('should show "--" for invalid dates', () => {
  fireEvent.change(getByTestId(container, 'check-in'), {
    target: { value: '2020-12-04' },
  });

  fireEvent.change(getByTestId(container, 'check-out'), {
    target: { value: '2020-12-02' },
  });

  expect(getByTestId(container, 'total').textContent).toBe('Total: $--');
});

it('should book home after clicking book button', () => {
  jest.spyOn(apiClient, 'bookHome').mockImplementation(() => {
    return Promise.resolve({ message: 'Mocked Booked Home' });
  });
  fireEvent.change(getByTestId(container, 'check-in'), {
    target: { value: '2020-12-04' },
  });

  fireEvent.change(getByTestId(container, 'check-out'), {
    target: { value: '2020-12-06' },
  });

  getByTestId(container, 'book-btn').click();

  expect(apiClient.bookHome).toHaveBeenCalledWith(
    mockedHome,
    '2020-12-04',
    '2020-12-06',
  );
});

it('should close the dialog and  show notification after booking home', async () => {
  jest
    .spyOn(apiClient, 'bookHome')
    .mockImplementation(() =>
      Promise.resolve({ message: 'Mocked Booked Home' }),
    );
  jest.spyOn(bookingDialogService, 'close').mockImplementation(() => {});
  jest.spyOn(notificationService, 'open').mockImplementation(() => {});

  fireEvent.change(getByTestId(container, 'check-in'), {
    target: { value: '2020-12-04' },
  });

  fireEvent.change(getByTestId(container, 'check-out'), {
    target: { value: '2020-12-06' },
  });

  getByTestId(container, 'book-btn').click();

  await act(async () => {});

  expect(bookingDialogService.close).toHaveBeenCalled();
  expect(notificationService.open).toHaveBeenCalledWith('Mocked Booked Home');
});

it('should show empty when no home provided', () => {
  container = render(<HomeBooking home={null} />).container;
  expect(getByTestId(container, 'empty')).toBeTruthy();
});
