import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./user.css";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="centertble">
      <div className="columns mt-1">
        <div className="column is-full">
          <h1 className="title is-1">Users Listing</h1>
          <Link to="add" className="button is-success">
            Add New User
          </Link>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length
                ? users.slice(0, 10).map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Link
                            to={`edit/${user._id}`}
                            className="button is-info is-small mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="button is-danger is-small"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
