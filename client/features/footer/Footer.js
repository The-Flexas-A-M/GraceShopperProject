import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';

function Footer() {
  return (
    <div id='footer'>
        <div className='footer-container'>
        <IconButton
            // size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, fontSize: '2rem' }}
            onClick={window.open('www.facebook.com', '_blank')}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={window.open('www.instagram.com', '_blank')}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={window.open('www.twitter.com', '_blank')}
          >
            <TwitterIcon />
          </IconButton>
        </div>
        <div className='footer-container'>
            
        </div>
        <div className='footer-container'>
            
        </div>
    </div>
  )
}

export default Footer