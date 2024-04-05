import React, { useState, useEffect, useRef } from 'react';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import './RecentOrders.css';

function RecentOrder() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState("default");
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
          body: JSON.stringify({ months: selectedMonths, userId: userIdRef.current }),
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

    }
  }, [selectedMonths]); 
  
  return (
    <>
      <UserSidebar />
      <h1 className="h1-dr-m">View Recent Orders</h1>
      <div className="data-report">
        <div className="report-section">
          <p>
            Orders placed within&nbsp;
            <select
  value={selectedMonths}
  onChange={(e) => setSelectedMonths(e.target.value)}
  style={{
    backgroundColor: '#f2f2f2',
    padding: '7x',
    borderRadius: '5px',
    border: '1px solid black',
  }}
>
<option value="default">___________</option>

  <option value="3">3 months</option>
  <option value="6">6 months</option>
  <option value="9">9 months</option>
  <option value="12">12 months</option>
</select>

          </p>
        </div>
        <div className="report-section">
          <h3>Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>TicketID</th>
                  <th>Type</th>
                  <th>Purchase Date</th>
                  <th>Expiry Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.TicketID}>
                    <td>{order.TicketID}</td>
                    <td>{order.TType}</td>
                    <td>{order.TPurchaseDate}</td>
                    <td>{order.TExpiryDate}</td>
                    <td>{order.TPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders have been placed within this time frame</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentOrder;