import React, { useState } from 'react'
import { Container , Row , Col } from "react-bootstrap";
import '../styles/DashboardStyle.css'
import TxnForm from './TxnForm';
import TxnTable from './TxnTable';
import { jsx } from 'react/jsx-runtime';
import { useEffect } from 'react';

function Dashboard() {
    // console.log("first")
    /////////////////////////////////////////////////////

    // const [txn , setTxn] = useState(JSON.parse(localStorage.getItem("txns")) || []);
    // const [toBeEdited , setToBeEdited] = useState(null)

    // const handleInsertion = (transaction) => {
    //     setTxn([...txn , transaction]);
    // }
    
    // useEffect(() => {
    //     localStorage.setItem('txns', JSON.stringify(txn));
    // } , [txn])

////// delete 
//     const handleDelete = (singletxn) => {
//         const temp = txn.filter((x) => {return x.id !== singletxn.id});
//         setTxn([...temp]);
//     }
// ///// edit functions
//     const handleEdit = (singletxn) => {
//         setToBeEdited({...singletxn});
//     }

//     const performEdit = (editedTxn) => {
//         const index = txn.findIndex((x) => {return x.id === editedTxn.id})
//         const temp = txn;
//         temp.splice(index ,1 ,editedTxn);
//         setTxn([...temp]);
//     }
  return (
    <>
        <Container>
            <Row>
                <Col md={4}>
                    {/* <TxnForm insertTxn = {handleInsertion} toBeEdited = {toBeEdited} performEdit={performEdit}/> */}
                    <TxnForm />
                </Col>

                <Col md={{span: 7  , offset:1}}>
                    {/* <TxnTable transaction = {txn}  handleDelete = {handleDelete}  handleEdit = {handleEdit}/> */}
                    <TxnTable />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Dashboard