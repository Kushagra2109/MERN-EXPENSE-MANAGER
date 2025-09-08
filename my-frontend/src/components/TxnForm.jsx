import React from 'react'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { addTxn, updateTxn } from '../redux/txnSlice/txnSlice';
import { useDispatch, useSelector } from 'react-redux';

function TxnForm() {
    const toBeEdited = useSelector((state) => state.transactions.toBeEditedTxn);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({ defaultValues: { txnType: "EXPENSE" } });
    const onSubmit = (formValues) => {
        if (formValues._id) {
            dispatch(updateTxn({ ...formValues }))
            settxnType("EXPENSE");
        } else {
            dispatch(addTxn({ ...formValues }));
            settxnType("EXPENSE");
        }
        reset({ txnType: "EXPENSE", amount: "", category: "", desc: "" })
    }
    const [txnType, settxnType] = useState('EXPENSE');
    const toggleTxnType = () => {
        const newValue = txnType === "EXPENSE" ? "INCOME" : "EXPENSE";
        settxnType(newValue);
        setValue("txnType", newValue);
    }
    useEffect(() => {
        if (toBeEdited) {
            reset(toBeEdited)
            settxnType(toBeEdited.txnType);
        }
    }, [toBeEdited])
    return (
        <>
            <div className="form-wrapper">
                <h4>Add Transaction</h4>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="simple-form">
                    <div className="form-group">
                        <label>TRANSACTION TYPE:</label>
                        <input type="hidden" {...register("txnType")} />
                        <button 
                            className={`toggle-btn ${txnType === "EXPENSE" ? "expense" : 'income'}`} 
                            type="button" 
                            onClick={toggleTxnType}
                        >
                            {txnType}
                        </button>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="amt">Amount:</label>
                        <input 
                            type="number" 
                            className="form-input"
                            placeholder="Enter amount"
                            {...register("amount", { min: { value: 1, message: "amount cannot be less than 1" }, required: { value: true, message: "amount cannot be empty" } })} 
                        />
                        {errors.amount && <p className='error-msg'>{errors.amount.message}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label>Category:</label>
                        <select 
                            className="form-select"
                            {...register("category", { required: { value: true, message: "must select a category" } })}
                        >
                            <option disabled>-- Select category --</option>
                            <option value="Food">Food</option>
                            <option value="Rent">Rent</option>
                            <option value="Travel">Travel</option>
                            <option value="Salary">Salary</option>
                            <option value="Bills">Bills</option>
                            <option value="Personel">Personel</option>
                        </select>
                        {errors.category && <p className='error-msg'>{errors.category.message}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label>Description:</label>
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Optional description"
                            {...register("desc", { required: false })} 
                        />
                    </div>
                    
                    <button className='submit-btn' type='submit'>
                        {toBeEdited ? 'Update' : 'Add Transaction'}
                    </button>
                </form>
            </div>
        </>
    )
}
export default TxnForm