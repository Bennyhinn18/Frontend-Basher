import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';
import { fetchPointsHistory,fetchLeaderboard } from '../api'; // Import the fetchPointsHistory function

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  


// ...

useEffect(() => {
  const fetchData = async () => {
    const pointsHistory = await fetchPointsHistory();
    const leaderboard = await fetchLeaderboard();

    // Create a map of user IDs to user names
    const userNames = leaderboard.reduce((map, user) => {
      map[user.id] = user.username;
      return map;
    }, {});

    // Add the user names to the points history
    const historyWithNames = pointsHistory.map(entry => ({
      ...entry,
      userName: userNames[entry.updated_by],
    }));

    setHistory(historyWithNames);
  };

  fetchData();
}, []);

  return (
    <div id="main-wrapper">
      <div className="page_title section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="page_title-content">
                <p>Back to Home</p>
                <h3>Points History</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="history">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="history_header">
                <div className="select_search">
                  <div className="select_box">
                    <div className="drop-menu form-control">
                      <div className="select">
                        <span>Any Type</span>
                        <i className="fa fa-angle-right"></i>
                      </div>
                      <input type="hidden" name="gender" />
                      <ul className="dropeddown">
                        <li>Earnings</li>
                        <li>Withdrawals</li>
                        <li>Reversals</li>
                      </ul>
                    </div>
                  </div>
                  <div className="search">
                    <form action="#">
                      <input type="text" className="form-control" placeholder="Search history" />
                      <span><i className="fa fa-search"></i></span>
                    </form>
                  </div>
                </div>
                <div className="duration-option">
                  <a className="active" href="#">All time</a>
                  <a href="#">24 H</a>
                  <a href="#">7D</a>
                  <a href="#">14D</a>
                  <a href="#">30D</a>
                </div>
              </div>

              <div className="history_table">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gems</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.id}</td>
                          <td>{entry.reason}</td>
                          <td>{entry.userName}</td>
                          <td>{entry.points} <span><img src="./images/svg/gem.svg" alt="Gem" /></span></td>
                          <td>{entry.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <nav className="history_pagination">
                <ul className="pagination justify-content-end">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      <span><i className="fa fa-angle-left"></i></span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <span><i className="fa fa-angle-right"></i></span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HistoryPage;
