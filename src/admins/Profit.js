import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDocs, db1, collection } from '../Config/Config';

function Profit() {
  const [profitData, setProfitData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: 'Loading Admins Data',
        text: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });

      const querySnapshot = await getDocs(collection(db1, 'finance'));
      const data = [];
      let totalRev = 0;
      let totalProf = 0;
      querySnapshot.forEach((doc) => {
        const financeData = doc.data();
        console.log("financeData===>> ", financeData.expense);
        data.push(financeData);
        totalRev += parseInt(financeData.expense); // Convert to integer before summing
        totalProf += parseInt(financeData.profit); // Convert to integer before summing
      });
      
      console.log("Total Expense: ", totalRev);
      console.log("Total Profit: ", totalProf);
      
      setProfitData(data);
      setTotalRevenue(totalRev);
      setTotalProfit(totalProf);
      setIsLoading(false);

      Swal.close(); // Hide loader
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="classH2">Finance Data</h2>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <table className="users-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Expense</th>
                <th>Profit</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((profit, index) => (
                <tr key={index}>
                  <td>{profit.adminName}</td>
                  <td>{profit.expense}</td>
                  <td>{profit.profit}</td>
                  <td>{profit.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="financial-summary">
            <div className="financial-item">
              <label>Revenue:</label>
              <span>{totalRevenue}</span>
            </div>
            <div className="financial-item">
              <label>Profit:</label>
              <span>{totalProfit}</span>
            </div>
            <div className="financial-item">
              <label>Net Profit:</label>
              <span>{totalProfit - totalRevenue}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profit;
