import React, { useEffect, useState } from 'react'
import "./leftbar.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Notification from '../Notification/Notification';
import Explore from '../Explore/Explore';
export default function Leftbar() {
  

  return (
    <div className='full-width'>
      <div className=''>
        <Notification />
      </div>

    <Explore />
     

    </div>
  )
}
