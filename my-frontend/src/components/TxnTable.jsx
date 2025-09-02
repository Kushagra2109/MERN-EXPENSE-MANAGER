import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTxn, setToBeEditedTxn, deleteTxn } from '../redux/txnSlice/txnSlice';

function TxnTable() {

    const txns = useSelector((state) => state.transactions.txn);
    console.log(txns, "txnssssss")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTxn());
    }, [])


    return (
        <>
            {txns.length ?
                <table>
                    <thead>
                        <tr>
                            <th>S. no.</th>
                            <th>Txn. Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txns.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className={x.txnType === "EXPENSE" ? "red table-txnType" : "green table-txnType"}>{x.txnType}</td>
                                <td>{x.amount}</td>
                                <td>{x.category}</td>
                                <td className='desc'>{x.desc}</td>
                                <td><button onClick={() => dispatch(setToBeEditedTxn(x))} className='edit-button green'>edit</button></td>
                                <td><button onClick={() => dispatch(deleteTxn(x._id))} className='delete-button red' >delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>




                : <p>there are no recorded transaction at this time!</p>}
        </>
    )
}

export default TxnTable