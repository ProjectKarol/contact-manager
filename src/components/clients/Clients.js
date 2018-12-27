import React, { Component } from "react";
import { Link } from "react-router-dom";

class Clients extends Component {
  render() {
    const clients = [
      {
        id: "dafddfa3",
        firstName: "karol",
        lastName: "Jonson",
        email: "kewin@gmail.com",
        phone: "123123123",
        balance: "12312"
      },
      {
        id: "dafdfa3",
        firstName: "Anna",
        lastName: "Jonson",
        email: "kewin@gmail.com",
        phone: "123123123",
        balance: "12312"
      },
      {
        id: "dafddfa3",
        firstName: "Janet",
        lastName: "Jonson",
        email: "kewin@gmail.com",
        phone: "123123123",
        balance: "142"
      }
    ];

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" />
                Clients {""}
              </h2>
            </div>
            <div className="col-md-6">balace</div>
          </div>
          <table className="table table-striped">
            <thead className="thead thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>$ {parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Loading.</h1>;
    }
  }
}
export default Clients;
