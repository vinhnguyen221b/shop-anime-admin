import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import service from "../services/userService";
import paginate from "../utils/paginate";
import Pagination from "./commons/Pagination";
import UserCreate from "./modify/UserCreate";
import UserEdit from "./modify/UserEdit";
import { apiEndPoint } from "../config.json";

function Users() {
  const [users, setUser] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [userChange, setUserChange] = useState(false);
  const [query, setQuery] = useState("");
  const getUser = async () => {
    try {
      const { data: listUser } = await service.getUser();

      setUser(listUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (id) => {
    const originalUsers = { ...users };
    try {
      await service.deleteUser(id);
      setUser(users.filter((u) => u._id !== id));
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error("Delete failed:", error.response.data);
      setUser(originalUsers);
    }
  };
  const handleSearch = async () => {
    try {
      const { data } = await service.searchUser(query);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  useEffect(() => {
    getUser();
    setUserChange(false);
  }, [userChange]);
  return (
    <div className="container">
      <div className="row content">
        <div className="col-12 d-flex justify-content-between title">
          <h3>Users</h3>
          <UserCreate setUserChange={setUserChange} />
        </div>
        <div className="col-12 amount">
          <p>
            There {users.length > 1 ? "are " : "is "}
            <span style={{ fontWeight: "bold" }}>{users.length}</span>{" "}
            {users.length > 1 ? "users " : "user "}
            in DB
          </p>
        </div>
        <div className="col-12 search">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter user name"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <button onClick={handleSearch} className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Avatar</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {!users ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No user in DB
                  </td>
                </tr>
              ) : (
                paginate(users, 4, pageIndex).map((u, i) => (
                  <tr key={u._id}>
                    <td>{(pageIndex - 1) * 4 + i + 1}</td>
                    <td
                      style={{
                        color:
                          u.role === 1
                            ? "rgb(255, 209, 43)"
                            : "rgb(17, 236, 229)",
                      }}
                    >
                      {u.name}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.address}</td>
                    <td>
                      <img
                        className="userAvatar"
                        src={`${apiEndPoint + u.avatar}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <UserEdit user={u} setUserChange={setUserChange} />
                      {u.role !== 1 && (
                        <button
                          className="btn btn-delete mx-1 my-1"
                          onClick={() => handleDelete(u._id)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            amount={users.length}
            pageIndex={pageIndex}
            pageSize={4}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
