//Leaderboard component
import React, { useState, useEffect } from 'react';
import crownIcon from '../assets/img/crown.svg';
import cupIcon from '../assets/img/cup.svg';
import medalIcon from '../assets/img/medal.svg';
import gemIcon from '../assets/img/gem_002.svg';
import gem from '../assets/img/gem.svg';
import ani17 from '../assets/img/ani-17.png';
import ani18 from '../assets/img/ani-18.png';
import mLogo from '../assets/img/m_logo.png';
import polygon from '../assets/img/polygon.svg';
import circle2 from '../assets/img/circle2.svg';
import circleline from '../assets/img/circleline.svg';
import line from '../assets/img/line.svg';
import Bcircle from '../assets/img/brown_circle.svg';
import logo from '../assets/img/logo.png';
import '../css/Leaderboard.css';
import { fetchLeaderboard } from '../api.js';

import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

   
// ...

useEffect(() => {
    fetchLeaderboard()
        .then(data => setLeaderboard(data));
}, []);
    const randomUserNumber = Math.floor(Math.random() * 7) + 1;

    return (
        <>
            <div id="__next">
                <div id="main-wrapper">
                    
                    <div className="page_title section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="page_title-content">
                                        <p>Leaderboard</p>
                                        <h3>Basher&apos;s Top Ranking</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ani-3"><img src={Bcircle} alt="Brown Circle" /></div>
                        <div className="ani-4"><img src={line} alt="Line" /></div>
                        <div className="ani-6"><img src={circle2} alt="Circle 2" /></div>
                        <div className="ani-7"><img src={circleline} alt="Circle Line" /></div>
                        <div className="ani-8"><img src={polygon} alt="Polygon" /></div>
                    </div>
                </div>
                <div className="leaderboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="leaderboard_top_rank">
                                    <div className="ani-17"><img src={ani17} alt="Animation 17" /></div>
                                    <div className="ani-18"><img src={ani18} alt="Animation 18" /></div>
                                    <div className="top_rank">
                                        {leaderboard.slice(0, 3).map((user, index) => (
                                            <div className={`d-flex ${index === 0 ? 'crown rank_ani1' : index === 1 ? 'cup rank_ani2' : 'medal rank_ani1'}`} key={user.id}>
                                                <div className="rank_icon"><img src={index === 0 ? crownIcon : index === 1 ? cupIcon : medalIcon} alt={index === 0 ? 'Crown' : index === 1 ? 'Cup' : 'Medal'} /></div>
                                                <div className="flex-grow-1"><span className="circle"></span>
                                                    <h6>{index === 0 ? 'First 1' : index === 1 ? 'Second 2' : 'Third 3'}</h6>
                                                    <h5>{user.username}</h5>
                                                    <p>{user.rank}</p>
                                                </div>
                                                <div className="prize">
                                                    <h4>{user.points}</h4>
                                                    <div className="prize_gem"><span>Prize</span><img src={gemIcon} alt="Gem" /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="leaderboard_content">
                                    <div className="leaderboard_tab">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="alltime">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Place</th>
                                                                <th scope="col">User</th>
                                                                <th scope="col">Credit <img src={gemIcon} alt="Gem" /></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id='rolling'>
                                                            {leaderboard.slice(3).map((user, index) => (
                                                                <tr key={user.id}>
                                                                    <th scope="row">{index + 4}</th>
                                                                    <td className="user_circle"> <span className={`circle user${randomUserNumber}`}></span>{user.username}</td>
                                                                    <td>{user.points} <img src={gemIcon} alt="Gem" /></td>
                                                                </tr>
                                                            ))}
                                                            {/* Additional static rows */}
                                                            <tr>
                                                                <th scope="row">06</th>
                                                                <td className="user_circle"><span className="circle user3"></span>Magda Hera</td>
                                                                <td>13.200 <img src={gemIcon} alt="Gem" /></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">07</th>
                                                                <td className="user_circle"><span className="circle user4"></span>Danielad Dan</td>
                                                                <td>13.200 <img src={gemIcon} alt="Gem" /></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">08</th>
                                                                <td className="user_circle"><span className="circle user5"></span>Henry</td>
                                                                <td>13.200 <img src={gemIcon} alt="Gem" /></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">09</th>
                                                                <td className="user_circle"><span className="circle user6"></span>Thomas C</td>
                                                                <td>13.200 <img src={gemIcon} alt="Gem" /></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">10</th>
                                                                <td className="user_circle"><span className="circle user7"></span>Paijoo</td>
                                                                <td>13.200 <img src={gemIcon} alt="Gem" /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="load_more"><button onClick={() => alert('Loading more...')}>Load More</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;