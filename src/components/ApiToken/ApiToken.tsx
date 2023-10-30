import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function ApiToken(){  
  const [apiToken, setApiToken] = useState(''); // Initial state for the API token
  const [isHidden, setIsHidden] = useState(true); // Initial state to hide the API token

  const toggleVisibility = () => {
    setIsHidden(!isHidden); // Toggle the visibility
  };

  return (
    <div className="ApiToken_main">
        <div className='ApiToken_continer white_box'>
            <h3>Your API Token</h3>
            <div className='token_wrapper'>
                <div className="token_top">
                    <input
                        type={isHidden ? 'password' : 'text'}
                        value={apiToken}
                        onChange={(e) => setApiToken(e.target.value)}
                        placeholder="Enter password to view API"
                    />
                    <div onClick={toggleVisibility} className='toggleVisibility'>
                        {isHidden ? (
                            <span className='hide'>
                                <svg id="Component_3_1" data-name="Component 3 – 1" xmlns="http://www.w3.org/2000/svg" width="47.898" height="36.05" viewBox="0 0 47.898 36.05">
                                    <g id="Icons1" transform="translate(-8.209 -13.926)">
                                        <g id="eye">
                                        <path id="Path_4" data-name="Path 4" d="M32.513,13.926c10.574.15,19.249,9.657,23.594,17.837A44.065,44.065,0,0,1,53.144,36.9q-1.041,1.454-2.191,2.826-.821.975-1.7,1.9c-5.237,5.5-12.758,9.6-20.7,8.01-8.823-1.77-16.02-9.33-20.346-17.461a43.628,43.628,0,0,1,2.978-5.132q.969-1.345,2.034-2.617.816-.974,1.691-1.9C19.539,17.646,25.476,13.892,32.513,13.926Zm-.037,4c-5.89-.022-10.788,3.267-14.663,7.35q-.791.833-1.527,1.713-.971,1.158-1.854,2.386A27.307,27.307,0,0,0,12.76,32.1c3.814,6.409,9.539,12.2,16.582,13.611,6.563,1.317,12.688-2.3,17.016-6.846q.793-.833,1.534-1.715,1.05-1.25,2-2.579a27.963,27.963,0,0,0,1.667-2.727C47.6,25.215,40.828,18.056,32.476,17.926Z" fill="#afafaf" fillRule="evenodd"/>
                                        <path id="Path_5" data-name="Path 5" d="M32.158,23.948a8.017,8.017,0,1,1-8.017,8.017,8.022,8.022,0,0,1,8.017-8.017Zm0,4.009a4.008,4.008,0,1,1-4.008,4.008A4.01,4.01,0,0,1,32.158,27.957Z" fill="#afafaf" fillRule="evenodd"/>
                                        </g>
                                    </g>
                                </svg>

                            </span>
                        ):(
                            <span className='show'>
                                <svg id="Icons1" xmlns="http://www.w3.org/2000/svg" width="47.898" height="42.95" viewBox="0 0 47.898 42.95">
                                    <g id="eye-slash" transform="translate(-8.102 -10.345)">
                                        <path id="Path_1" data-name="Path 1" d="M13.673,10.345l-3.1,3.1L50.429,53.295l3.1-3.1L13.673,10.345Z" fill="#afafaf" fillRule="evenodd"/>
                                        <path id="Path_2" data-name="Path 2" d="M17.119,19.984,20.034,22.9a33.753,33.753,0,0,0-7.374,9.058l-.005.01c4.573,7.646,11.829,14.872,20.987,13.776a18.15,18.15,0,0,0,6.885-2.35l2.951,2.95a20.346,20.346,0,0,1-13.916,3.342C20.364,48.441,12.843,40.9,8.1,32.037a39.5,39.5,0,0,1,9.017-12.053Zm6.63-4.32A21.161,21.161,0,0,1,32.076,13.8c.165,0,2.124.092,3.012.238.557.092,1.112.207,1.659.35C45.472,16.657,51.936,24.033,56,31.632a41.471,41.471,0,0,1-6.6,9.682l-2.827-2.827a34.691,34.691,0,0,0,4.87-6.769s-1.27-2.042-2.233-3.324q-.928-1.236-1.954-2.4c-.54-.608-2.637-2.673-3.136-3.1-3.348-2.879-7.279-5.138-11.994-5.1a16.06,16.06,0,0,0-5.249,1l-3.127-3.127Z" fill="#afafaf"/>
                                        <path id="Path_3" data-name="Path 3" d="M25.054,27.92l2.4,2.4a4.842,4.842,0,0,0,6.114,6.114l2.4,2.4A8.018,8.018,0,0,1,25.054,27.92Zm6.849-4.1.148,0a8.021,8.021,0,0,1,8.017,8.017c0,.05,0,.1,0,.148L31.9,23.819Z" fill="#afafaf" fillRule="evenodd"/>
                                    </g>
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
                <br />
                <div>   
                    <div className="password_encription">
                        {apiToken ? (
                            <span>{apiToken}</span>
                            ) : (
                            <span>*************</span>
                        )}
                     </div>
                </div>
            </div>
        </div>
        <div className='ApiToken_doc white_box'>
            <h4>API Documentation</h4>
            <Link to='/'>Find your documentation here</Link>            
        </div>
    </div>    
  );
};

export default ApiToken;


