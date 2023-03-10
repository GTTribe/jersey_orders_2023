import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './GeorgiaTechTribeLogo.PNG';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from './store/userSlice';
import { logout } from './store/loggedInSlice';
import { reset } from './store/viewitemSlice';
import { clearItem } from './store/itemProofSlice';
import { viewPage } from './store/viewpageSlice';
import { clearCart } from './store/cartSlice';

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const vertAlign = {
    marginTop: "auto",
    marginBottom: "auto"
  };

  const headerShadow = {
    boxShadow: "0 4px 4px hsl(0deg 0% 4% / 30%)"
  }

  const pointer = {
    cursor: 'pointer'
  }

  const noBorder = {
    border: 'none'
  }

  const isLoggedIn = useSelector((state) => state.loggedIn.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(resetUser());
    dispatch(clearCart());
    dispatch(logout());
  }

  function handleLogin() {
    // dispatch(reset());
    // dispatch(clearItem());
    dispatch(viewPage('login'));
    navigate('/login');
  }

  function handleCheckout() {
    // dispatch(reset());
    // dispatch(clearItem());
    dispatch(viewPage('checkout'));
    navigate('/checkout');
  }

  function handleSizing() {
    // dispatch(reset());
    // dispatch(clearItem());
    dispatch(viewPage('sizing'));
    navigate('/size_chart');
  }

  const first_name = useSelector((state) => state.user.value['first_name']);
  const cart = useSelector((state) => state.cart.value);

  function getTotals() {
    var total = 0;
    for (let key in cart) {
      for (var item of cart[key]) {
        total += item['item_quantity'];
      }
    }
    return total;
  };

  return (
    <header className='site-header' style={ scrollPosition > 10 ? headerShadow : null }>
      <nav>
        <div className='nav-left'>
          <div className='nav-item' title='Home'>
            <a className='team-logo' href='https://gttribe.github.io'><img src={logo} className='team-logo' alt='logo'/></a>
          </div>
          <div className='nav-item'>
            Welcome{ isLoggedIn && ' ' + first_name}!
          </div>
        </div>
        <div className='nav-right'>
          <div className='nav-item' title='Size Chart' style={pointer} onClick={() => handleSizing()}>
            <svg xlmns="http://www.w3.org/2000/svg" title='Size Chart' width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 20q-.725 0-.95-.688-.225-.687.35-1.112l8.6-6.45V10q0-.425.275-.713.275-.287.7-.287.65.025 1.087-.413.438-.437.438-1.087 0-.625-.425-1.062Q12.65 6 12.025 6q-.45 0-.837.262-.388.263-.563.688-.125.275-.363.412-.237.138-.537.138-.55 0-.838-.463-.287-.462-.062-.962.425-.95 1.275-1.513Q10.95 4 12 4q1.45 0 2.475 1Q15.5 6 15.5 7.45q0 1.2-.7 2.125T13 10.85v.9l8.6 6.45q.575.425.35 1.112Q21.725 20 21 20Zm3-2h12l-6-4.5Z"></path>
            </svg>
          </div>
          <div className='nav-item' title='Cart' style={pointer} onClick={() => handleCheckout()}>
            <div className='cart'>
              <svg xlmns="http://www.w3.org/2000/svg" title='Cart' width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 22q-.825 0-1.412-.587Q5 20.825 5 20q0-.825.588-1.413Q6.175 18 7 18t1.412.587Q9 19.175 9 20q0 .825-.588 1.413Q7.825 22 7 22Zm10 0q-.825 0-1.412-.587Q15 20.825 15 20q0-.825.588-1.413Q16.175 18 17 18t1.413.587Q19 19.175 19 20q0 .825-.587 1.413Q17.825 22 17 22ZM6.15 6l2.4 5h7l2.75-5ZM7 17q-1.125 0-1.7-.988-.575-.987-.05-1.962L6.6 11.6 3 4H1.975q-.425 0-.7-.288Q1 3.425 1 3t.288-.713Q1.575 2 2 2h1.625q.275 0 .525.15t.375.425L5.2 4h14.75q.675 0 .925.5t-.025 1.05l-3.55 6.4q-.275.5-.725.775-.45.275-1.025.275H8.1L7 15h11.025q.425 0 .7.287.275.288.275.713t-.288.712Q18.425 17 18 17Zm1.55-6h7Z"></path>
              </svg>
              {
                getTotals() !== 0 &&
                <div className='badge'>
                  <p>{getTotals()}</p>
                </div>
              }
            </div>
          </div>
          {
            isLoggedIn &&
            <div className='nav-item login' onClick={() => handleLogout()}>
              <a style={noBorder}>Logout</a>
            </div>
          }
          {
            !isLoggedIn &&
            <div className='nav-item' onClick={() => handleLogin()}>
              <a style={noBorder}>Login</a>
            </div>
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;