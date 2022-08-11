import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogScreen from './pages/BlogScreen';
import CartScreen from './pages/CartScreen';
import HomeScreen from './pages/HomeScreen';
import OrderScreen from './pages/OrderScreen';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import ProductScreen from './pages/ProductScreen';
import ProfilePage from './pages/ProfilePage';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import SigninScreen from './pages/SigninScreen';
import SignupScreen from './pages/SignupScreen';
import SummitAndEventScreen from './pages/SummitAndEventScreen';
import { Store } from './Store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { userDetail } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userDetail');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('payMethod');
    window.location.href = '/signin';
  }

  const showContent = () => {
    document.getElementById('myDropdown').classList.toggle("show");
    document.getElementById('mynewDropdown').classList.toggle("show");
  }

  const showHamburgerContent = () => {
    document.getElementById('side-drawer').classList.toggle("show-items");
  }

  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      if (document.getElementById('myDropdown')) {
        document.getElementById('myDropdown').classList.remove('show');
      }
      if (document.getElementById('mynewDropdown')) {
        document.getElementById('mynewDropdown').classList.remove('show');
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
                <i className='fa fa-shopping-cart'></i>
                {cart.cartItems.length > 0 ? (
                  <span id='cart-count'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
                ) : (<span id='cart-count' className='superscript'></span>)}
              </Link>
            </div>

            <div id='navbar-collapse'>
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
                  <Link className='' to='/signin'>SignIn</Link>
                </div>
              )}
              <div>
                <Link className='' to='/blogs'>Blogs</Link>
              </div>
              <div>
                <Link className='' to='/events'>Events</Link>
              </div>
            </div>
            <div id='hamburger'>
              <Link to='#' id='hamburger-icon' onClick={showHamburgerContent}>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
          </div>
        </header>

        <aside id='side-drawer' className='sidebar'>
          {userDetail ? (
            <div className="dropdown">
              <button className="dropbtn" onClick={showContent}>{userDetail.name}
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content" id="mynewDropdown">
                <Link to='/user-profile'>User Profile</Link>
                <Link to='/order-history'>Order History</Link>
                <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
              </div>
            </div>
          ) : (
            <div>
              <Link className='' to='/signin'>SignIn</Link>
            </div>
          )}
          <div>
            <Link className='' to='/blogs'>Blogs</Link>
          </div>
          <div>
            <Link className='' to='/events'>Events</Link>
          </div>
        </aside>

        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='/shipping' element={<ShippingAddressScreen />} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/blogs' element={<BlogScreen />} />
            <Route path='/events' element={<SummitAndEventScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/user-profile' element={<ProfilePage />} />
          </Routes>
        </main>
        <footer>
          <div>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
