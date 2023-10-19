import React from 'react'
import avtar_img from '../../images/avtar.png' 

export default function ChoosePart() {
  return (
    <div className='TabContent'>
        <div className="screen">
            {/* <button ></button> */}
            <h2>Make your wish</h2>
            <button className='start_over_btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.8216 15C19.5618 18.8327 15.9539 21.6 11.6996 21.6C6.39768 21.6 2.09961 17.302 2.09961 12C2.09961 6.69809 6.39768 2.40002 11.6996 2.40002C14.8094 2.40002 17.5739 3.87872 19.3283 6.17137M20.0153 7.20002C19.8081 6.84187 19.5785 6.49834 19.3283 6.17137M19.3283 6.17137L17.0996 8.40002H21.8996V3.60002L19.3283 6.17137ZM19.4996 8.00002L20.9996 6.00002" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start over
            </button>
            <div className='charcter_view'>
                <img src={avtar_img} alt="" />
            </div>
        </div>
    </div>
  )
}