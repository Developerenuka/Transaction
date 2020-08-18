import React, { Component } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { toaster } from "./Toaster";
class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Credit",
      amount: "",
      description: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && /^[0-9]{0,10}$/.test(value) === false) {
      return;
    }
    let data =
      localStorage.getItem("total_data") !== null
        ? JSON.parse(localStorage.getItem("total_data"))
        : [];
    console.log(
      "data",
      data.length,
      data[data.length - 1] && data[data.length - 1].total,
      name,
      value
    );
    if (name === "type" && value === "Debit" && data.length === 0) {
      return toaster("error", "Account balace is not available");
    } else {
      if (
        name === "type" &&
        value === "Debit" &&
        data[data.length - 1].total === 0
      ) {
        return toaster("error", "Account balace is not available");
      }
    }
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { type, amount, description } = this.state;
    if (type !== "" && amount !== "" && description !== "") {
      let data =
        localStorage.getItem("total_data") !== null
          ? JSON.parse(localStorage.getItem("total_data"))
          : [];
      let total = "";
      if (type === "Credit") {
        total =
          data[data.length - 1] && data[data.length - 1].total
            ? parseInt(data[data.length - 1].total) + parseInt(amount)
            : parseInt(amount);
      } else if (type === "Debit") {
        total =
          data[data.length - 1] && data[data.length - 1].total
            ? parseInt(data[data.length - 1].total) - parseInt(amount)
            : parseInt(amount);
      }
      if (total < 0) {
        return toaster("error", "Account doesn't have enough amount.");
      }

      data.push({
        type: type,
        Credit: type === "Credit" ? amount : "",
        Debit: type === "Debit" ? amount : "",
        description: description,
        date: new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }).format(new Date()),
        total: total,
      });
      localStorage.setItem("total_data", JSON.stringify(data));
      toaster("success", "Data added successfully");
      this.props.setAddFlag(false);
    } else {
      return toaster("error", "Please fill all fields");
    }
  };
  render() {
    const { type, amount, description } = this.state;
    console.log("sdsdsds", this.props);
    return (
      <Card.Text>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Transaction Type
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={type}
                name="type"
                onChange={(e) => this.handleChange(e)}
              >
                <option>Credit</option>
                <option>Debit</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Amount
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Amount"
                value={amount}
                name="amount"
                autoComplete="off"
                onChange={(e) => this.handleChange(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                name="description"
                autoComplete="off"
                onChange={(e) => this.handleChange(e)}
              />
            </Col>
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={(e) => this.handleSubmit(e)}
          >
            Submit
          </Button>
        </Form>
      </Card.Text>
    );
  }
}

export default AddTransaction;
