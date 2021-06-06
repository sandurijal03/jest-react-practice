import React from 'react';

const Header = () => {
  return (
    <>
      <nav className='py-3 border-bottom navbar navbar-expand navbar-light'>
        <a data-testid='logo' href='/#' className='navbar-brand mr-3'>
          heLLO
          <img src='/logo.svg' alt='' />
        </a>

        <form data-testid='search' className='mr-auto w-50 form-inline'>
          <input
            type='text'
            placeholder='search homes'
            className='w-50 form-control mx-5'
          />
        </form>

        <div data-testid='menu' className='mr-auto text-uppercase navbar-nav'>
          <a href='#home' className='nav-link'>
            Become a host
          </a>
          <a href='#link' className='nav-link'>
            Help
          </a>
          <a href='#link' className='nav-link'>
            Signin
          </a>
          <a href='#link' className='nav-link'>
            Login
          </a>
        </div>
      </nav>
      <div className='m-0 px-4 py-2 container-fluid mw-100 border-bottom container'>
        <button
          data-testid='home-type'
          className='text-nowrap mr-4 py-1 btn btn-outline-secondary'
        >
          Home type
        </button>
        <button
          data-testid='dates'
          className='text-nowrap mx-4 py-1 btn btn-outline-secondary'
        >
          Dates
        </button>
        <button
          className='text-nowrap mx-4 py-1 btn btn-outline-secondary'
          data-testid='guests'
        >
          Guests
        </button>
        <button
          className='text-nowrap mx-4 py-1 btn btn-outline-secondary'
          data-testid='price'
        >
          Price
        </button>
        <button
          className='text-nowrap mx-4 py-1 btn btn-outline-secondary'
          data-testid='rooms'
        >
          Rooms
        </button>
        <button
          className='text-nowrap mr-4 py-1 btn btn-outline-secondary'
          data-testid='amenities'
        >
          Amenities
        </button>
      </div>
    </>
  );
};

export default Header;
