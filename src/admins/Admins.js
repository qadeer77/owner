import { React, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDocs, db2, collection, deleteDoc, doc } from '../Config/Config';

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
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log("data===>>> ", data);
      setAdminsData(data);
      setIsLoading(false);

      Swal.close(); // Hide loader
    };

    fetchData();
  }, []);

  const handleDelete = async (adminId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting Admin',
        text: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });

      try {
        // Delete admin from Firebase
        await deleteDoc(doc(db2, 'admins', adminId));

        // Remove the deleted admin from the state
        setAdminsData((prevState) => prevState.filter((admin) => admin.id !== adminId));

        Swal.fire('Deleted!', 'The admin has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting admin:', error);
        Swal.fire('Oops!', 'An error occurred while deleting the admin.', 'error');
      }
    }
  };

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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {adminsData.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(admin.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admins;
