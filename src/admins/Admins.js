import {React, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { getDocs, db2, collection } from '../Config/Config';

function Admins() {
  const [adminsData, setAdminsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

      const querySnapshot = await getDocs(collection(db2, 'admins'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log("data===>>> ", data);
      setAdminsData(data);
      setIsLoading(false);

      Swal.close(); // Hide loader
    };

    fetchData();
  }, []);

  return (
    <div>
        <h2 className='classH2'>Admin Data</h2>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {adminsData.map((admin, index) => (
              <tr key={index}>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Admins;