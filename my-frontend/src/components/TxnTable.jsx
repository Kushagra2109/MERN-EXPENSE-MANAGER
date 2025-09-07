import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTxn, setToBeEditedTxn, deleteTxn, filtertxns } from '../redux/txnSlice/txnSlice';
import { Card, Table, Button } from 'react-bootstrap';

function TxnTable() {
    useEffect(() => {
        console.log("5 , beforemoutn of table")
        dispatch(getTxn());
        console.log("6 , gettxn called")
    }, [])

    console.log("7 , now that the tnxtable is loading ,before that")
    const txns = useSelector(filtertxns);
    // const txns = useSelector((state) => state.transactions.filtereddata);
    // const txns = useSelector((state) => state.transactions.txn);
    // console.log(txns, "txnssssss")
    console.log("8 now txns should have been loaded", txns)
    const dispatch = useDispatch();

    const total = useMemo(() => {
        return txns.reduce((total, x) => {
            return x.txnType === "EXPENSE" ? total - x.amount : total + x.amount;
        }, 0)
    }, [txns])

    return (
        <>
            {Array.isArray(txns) && txns.length ?
                <Card className="shadow rounded">
                    <div className="table-responsive">
                        <Table striped hover bordered responsive className="align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>S. no.</th>
                                    <th>Txn. Type</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {txns.map((x, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className={x.txnType === "EXPENSE" ? "red table-txnType" : "green table-txnType"}>
                                            {x.txnType}
                                        </td>
                                        <td>{x.category}</td>
                                        <td className='desc'>{x.desc}</td>
                                        <td>{x.amount}</td>
                                        <td className='px-0 py-0 border-0'>
                                            <Button
                                                onClick={() => dispatch(setToBeEditedTxn(x))}
                                                className="btn-sm w-100 green"
                                                variant="success"
                                            >
                                                edit
                                            </Button>
                                        </td>
                                        <td className='px-0 py-0 border-0'>
                                            <Button
                                                onClick={() => dispatch(deleteTxn(x._id))}
                                                className="btn-sm w-100 red"
                                                variant="danger"
                                            >
                                                delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className={total > 0 ? "green text-white" : "red text-white"} colSpan={4}>
                                        TOTAL: {total > 0 ? "PROFIT" : "LOSS"}
                                    </td>
                                    <td colSpan={3}>{total}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </Card>
                : <p className="text-center text-muted mt-3">There are no recorded transactions at this time!</p>}
        </>
    )
}

export default TxnTable
