import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartScreen from './pages/CartScreen';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import SigninScreen from './pages/SigninScreen';
import SignupScreen from './pages/SignupScreen';
import { Store } from './Store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { userDetail } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userDetail');
    localStorage.removeItem('shippingAddress');
  }

  const showContent = () => {
    document.getElementById('myDropdown').classList.toggle("show");
  }

  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      if (document.getElementById('myDropdown')) {
        document.getElementById('myDropdown').classList.remove('show');
      }
    }
  }

  return (
    <BrowserRouter>
      <div className='container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <div id='logo'>
            <Link to="/">Aman Clothing</Link>
          </div>
          <div>
            <div>
              <Link to='/cart'>
                Cart
                {cart.cartItems.length > 0 ? (
                  <span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
                ) : (<span className='superscript'></span>)}
              </Link>
            </div>
            {userDetail ? (
              <div className="dropdown">
                <button className="dropbtn" onClick={showContent}>{userDetail.name}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content" id="myDropdown">
                  <Link to='/profile'>User Profile</Link>
                  <Link to='/orderhistory'>Order History</Link>
                  <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                </div>
              </div>
            ) : (
              <div>
                <Link className='' to='/signin'>Sign In</Link>
              </div>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='/shipping' element={<ShippingAddressScreen />} />
          </Routes>
        </main>
      </div>
      <footer>
        <div>All rights reserved</div>
      </footer>
    </BrowserRouter>

  );
}

export default App;
