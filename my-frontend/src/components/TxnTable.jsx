import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTxn, setToBeEditedTxn, deleteTxn ,filtertxns  } from '../redux/txnSlice/txnSlice';

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
           return x.txnType === "EXPENSE"? total - x.amount : total + x.amount;
        } , 0)
    } , [txns])
    return (
        <>
            {Array.isArray(txns) && txns.length ?
                <div className="table-wrapper">
                    <div className="table-header">
                        <h5>Transaction History ({txns.length} transactions)</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="simple-table">
                            <thead>
                                <tr>
                                    <th>S. no.</th>
                                    <th>Txn. Type</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {txns.map((x, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className={x.txnType === "EXPENSE" ? "expense-text" : "income-text"}>
                                            {x.txnType}
                                        </td>
                                        <td>{x.category}</td>
                                        <td className='desc-cell'>{x.desc || "No description"}</td>
                                        <td className={x.txnType === "EXPENSE" ? "expense-amount" : "income-amount"}>
                                            ₹{x.amount}
                                        </td>
                                        <td className='action-cell'>
                                            <button 
                                                onClick={() => dispatch(setToBeEditedTxn(x))} 
                                                className='edit-button'
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => dispatch(deleteTxn(x._id))} 
                                                className='delete-button'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="total-row">
                                    <td colSpan={4} className={total >= 0 ? "profit" : "loss"}>
                                        <strong>TOTAL: {total >= 0 ? "PROFIT" : "LOSS"}</strong>
                                    </td>
                                    <td className={total >= 0 ? "profit-amount" : "loss-amount"}>
                                        <strong>₹{Math.abs(total)}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                : <div className="no-data">
                    <h5>No Transactions Yet</h5>
                    <p>Start by adding your first transaction!</p>
                </div>}
        </>
    )
}
export default TxnTable