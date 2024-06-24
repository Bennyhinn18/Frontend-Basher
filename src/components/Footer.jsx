import '../css/Leaderboard.css';
import mLogo from '../assets/img/m_logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="footer-link text-left">
                                    <Link className="m_logo" to="#leaderboard">
                                        <img src={mLogo} alt="Logo" />
                                    </Link>
                                    <Link to="#">Shop</Link>
                                    <Link to="#affiliate">Affiliates</Link>
                                    <Link to="#leaderboard">Leaderboards</Link>
                                    <Link to="#support">Support</Link>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="footer-link text-end">
                                    <Link to="#about">About</Link>
                                    <Link to="#privacy-policy">Privacy Policy</Link>
                                    <Link to="#term-condition">Terms & Service</Link>
                                    <Link to="#bug-bounty">Bug Bounty</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-xl-6">
                                <div className="copy_right text-center text-lg-start">
                                    Copyright © Bashers All Rights Reserved.
                                </div>
                            </div>
                             <div className="col-xl-6 text-center text-lg-end py-5 py-lg-0">
                                <div className="social">
                                    <Link to="#leaderboard"><i className="fab fa-youtube"></i></Link>
                                    <Link to="#leaderboard"><i className="fab fa-instagram"></i></Link>
                                    <Link to="#leaderboard"><i className="fab fa-twitter"></i></Link>
                                    <Link to="#leaderboard"><i className="fab fa-facebook"></i></Link>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
    );
}

export default Footer;