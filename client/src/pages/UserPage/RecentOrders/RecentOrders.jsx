import React, { useState, useEffect, useRef } from 'react';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import './RecentOrders.css';

function RecentOrder() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState("default");
  const [selectedOrderType, setSelectedOrderType] = useState("default");
  const [userId, setUserId] = useState('');
  const userIdRef = useRef(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.UserID) {
            userIdRef.current = userData.UserID;
            console.log('New userId:', userIdRef.current);
          } else {
            setUserId(null);
          }
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setUserId(null);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/getRecentTicketOrders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            months: selectedMonths,
            orderType: selectedOrderType,
            userId: userIdRef.current,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setRecentOrders(data);
          
        } else {
          const errorData = await response.json();
          console.error('Error retrieving recent orders:', errorData.message);
        }
      } catch (error) {
        console.error('Error retrieving recent orders:', error);
      }
    };
    fetchRecentOrders();
    if (userIdRef.current) {
      console.log("User ID:", userIdRef.current);
      console.log("Months:", selectedMonths);
      console.log("Order Type:", selectedOrderType);
    }
  }, [selectedMonths, selectedOrderType]);

  return (
    <>
      <UserSidebar />
      <h1 className="h1-dr-m">View Recent Orders</h1>
      <div className="data-report">
        <div className="report-section">
          <div className='form-row'>
          <p>
            Orders placed within<span className="required">*</span>&nbsp;
            <select
              value={selectedMonths}
              onChange={(e) => setSelectedMonths(e.target.value)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '5x',
                borderRadius: '5px',
                border: 'none',
              }}
            >
              <option value="default">___________</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
            </select>
          </p>
          <p>
            Show <span className="required">*</span>&nbsp;
            <select
              value={selectedOrderType}
              onChange={(e) => setSelectedOrderType(e.target.value)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '5x',
                borderRadius: '5px',
                border: 'none',
              }}
            >
              <option value="default">___________</option>
              <option value="all">All</option>
              <option value="tickets">Tickets</option>
              <option value="merchandise">Merchandise</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </p>
          </div>
        </div>
        <div className="report-section">
          
        </div>

        {selectedOrderType === 'tickets' && (
          <div className="report-section">
            <h3>Recent Ticket Orders</h3>
            {recentOrders.filter((order) => order.TicketID).length > 0 ? (
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Purchase Date</th>
                    <th>TicketID</th>
                    <th>Type</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders
                    .filter((order) => order.TicketID)
                    .map((order) => (
                      <tr key={order.TicketID}>
                         <td>{order.ticketDate}</td>
                        <td>{order.TicketID}</td>
                        <td>{order.TType}</td>
                        <td>${order.TPrice}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No recent ticket orders</p>
            )}
          </div>
        )}

        {selectedOrderType === 'merchandise' && (
          <div className="report-section">
            <h3>Recent Merchandise Orders</h3>
            {recentOrders.filter((order) => order.MerchandiseTransactionID).length > 0 ? (
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Transaction Date</th>
                    <th>Transaction ID</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders
                    .filter((order) => order.MerchandiseTransactionID)
                    .map((order) => (
                      <tr key={order.MerchandiseTransactionID}>
                        <td>{order.merchDate}</td>
                        <td>{order.MerchandiseTransactionID}</td>
                        <td>{order.MName}</td>
                        <td>{order.Size}</td>
                        <td>{order.Quantity}</td>
                        <td>${order.TotalCost}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No recent merchandise orders</p>
            )}
          </div>
        )}

        {selectedOrderType === 'restaurant' && (
          <div className="report-section">
            <h3>Recent Restaurant Orders</h3>
            {recentOrders.filter((order) => order.RestaurantTransactionID).length > 0 ? (
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Transaction Date</th>
                    <th>Meal Plan ID</th>
                    <th>Restaurant Name</th>
                    <th>Restaurant Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders
                    .filter((order) => order.RestaurantTransactionID)
                    .map((order) => (
                      <tr key={order.RestaurantTransactionID}>
                        <td>{order.restDate}</td>
                        <td>{order.RestaurantTransactionID}</td>
                        <td>{order.RestaurantName}</td>
                        <td>{order.RestaurantType}</td>
                        <td>${order.Amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No recent restaurant orders</p>
            )}
          </div>
        )}

        {selectedOrderType === 'all' && (
          <>
            <div className="report-section">
              <h3>Recent Ticket Orders</h3>
              {recentOrders.filter((order) => order.TicketID).length > 0 ? (
                <table className="contact-table">
                  <thead>
                    <tr>
                      <th>Purchase Date</th>
                      <th>TicketID</th>
                      <th>Type</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders
                      .filter((order) => order.TicketID)
                      .map((order) => (
                        <tr key={order.TicketID}>
                          <td>{order.ticketDate}</td>
                          <td>{order.TicketID}</td>
                          <td>{order.TType}</td>
                          <td>${order.TPrice}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent ticket orders</p>
              )}
            </div>
            <div className="report-section">
              <h3>Recent Merchandise Orders</h3>
              {recentOrders.filter((order) => order.MerchandiseTransactionID).length > 0 ? (
                <table className="contact-table">
                  <thead>
                    <tr>
                      <th>Transaction Date</th>
                      <th>Transaction ID</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders
                      .filter((order) => order.MerchandiseTransactionID)
                      .map((order) => (
                        <tr key={order.MerchandiseTransactionID}>
                          <td>{order.merchDate}</td>
                          <td>{order.MerchandiseTransactionID}</td>
                          <td>{order.MName}</td>
                          <td>{order.Size}</td>
                          <td>{order.Quantity}</td>
                          <td>${order.TotalCost}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent merchandise orders</p>
              )}
            </div>
            <div className="report-section">
              <h3>Recent Restaurant Orders</h3>
              {recentOrders.filter((order) => order.RestaurantTransactionID).length > 0 ? (
                <table className="contact-table">
                  <thead>
                    <tr>
                      <th>Transaction Date</th>
                      <th>Transaction ID</th>
                      <th>Restaurant Name</th>
                      <th>Restaurant Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders
                      .filter((order) => order.RestaurantTransactionID)
                      .map((order) => (
                        <tr key={order.RestaurantTransactionID}>
                          <td>{order.restDate}</td>
                          <td>{order.RestaurantTransactionID}</td>
                          <td>{order.RestaurantName}</td>
                          <td>{order.RestaurantType}</td>
                          <td>${order.Amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent restaurant orders</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RecentOrder;