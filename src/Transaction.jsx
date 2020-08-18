import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_data:
        localStorage.getItem("total_data") !== null
          ? JSON.parse(localStorage.getItem("total_data")).reverse()
          : [],
    };
  }
  render() {
    const { total_data } = this.state;
    return (
      <Card.Text>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {localStorage.getItem("total_data") === null ? (
              <tr>
                <td colSpan="6" className='text-center'>No Transaction Found</td>
              </tr>
            ) : (
              total_data.map((data, index) => (
                <tr>
                  <td>{data.date}</td>
                  <td>{data.description}</td>
                  <td>{data.Credit}</td>
                  <td>{data.Debit}</td>
                  <td>{data.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Text>
    );
  }
}

export default Transaction;
