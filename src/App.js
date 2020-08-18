
import React, { useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import AddTransaction from './AddTransaction'
import Transaction from './Transaction'


const App = () => {
  const [addFlag, setAddFlag] = useState(false);

  return (
    <Container className='mt-4'>
      <h1 className='text-center'>Transaction</h1>
      <Card>
        <Card.Body>
          {!addFlag ? <Card.Title className='d-flex justify-content-between'><span>Office Transactions</span><span style={{ cursor: 'pointer' }} onClick={() => setAddFlag(true)}>Add Transaction</span></Card.Title> :
            <Card.Title className="d-flex justify-content-between">
              <span>New Transactions</span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setAddFlag(false)}
              >
                Back
            </span>
            </Card.Title>}
          {!addFlag ?
            <Transaction />
            :
            <AddTransaction setAddFlag={setAddFlag} />
          }
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;

