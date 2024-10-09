import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderTwo = () => {
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false)
  const quantity = 0 // Placeholder value for cart quantity

  return (
    <>
      <header>
        <div className='tp-header-area tp-header-style-darkRed tp-header-height'>
          <div className='tp-header-top-2 p-relative z-index-11 tp-header-top-border d-none d-md-block'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-6'>
                  <div className='tp-header-info d-flex align-items-center'>
                    <div className='tp-header-info-item'>
                      <a href='#'>
                        <span>7500k Followers</span>
                      </a>
                    </div>
                    <div className='tp-header-info-item'>
                      <a href='tel:+966595035008'>
                        <span>+(966) 595 035 008</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id='header-sticky'
            className='tp-header-bottom-2 tp-header-sticky'
          >
            <div className='container'>
              <div className='tp-mega-menu-wrapper p-relative'>
                <div className='row align-items-center'>
                  <div className='col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6'>
                    <div className='logo'>
                      <Link to='/' draggable='false'>
                        <img src='/path/to/logo.svg' alt='logo' />
                      </Link>
                    </div>
                  </div>
                  <div className='col-xl-5 col-lg-7 col-md-7 col-sm-8 col-6'>
                    <div className='tp-header-bottom-right d-flex align-items-center justify-content-end pl-30'>
                      <div className='tp-header-action-item'>
                        <button className='tp-header-action-btn cartmini-open-btn'>
                          Cart
                          <span className='tp-header-action-badge'>
                            {quantity}
                          </span>
                        </button>
                      </div>
                      <div className='tp-header-action-item tp-header-hamburger mr-20 d-xl-none'>
                        <button
                          onClick={() => setIsCanvasOpen(true)}
                          type='button'
                          className='tp-offcanvas-open-btn'
                        >
                          Menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderTwo
