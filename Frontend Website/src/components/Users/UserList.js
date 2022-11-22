import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "./user.css";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [number, setNumber] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
    setUser(response.data);
    console.log("response", response);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const lastuser = number * usersPerPage;
  const firstuser = lastuser - usersPerPage;
  const currentuser = users.slice(firstuser, lastuser);
  const PageCount = Math.ceil(users.length / usersPerPage);

  const ChangePage = ({ selected }) => {
    console.log(selected);
    setNumber(selected + 1);
  };

  return (
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
              {/* <th>Password</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentuser.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.password}</td> */}
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
            })}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={PageCount}
          onPageChange={ChangePage}
          containerClassName={"paginationBttns"}
          activeClassName={"paginationActive"}
          disableInitialCallback={true}
          initialPage={1}
        ></ReactPaginate>
      </div>
    </div>
  );
};

export default UserList;
