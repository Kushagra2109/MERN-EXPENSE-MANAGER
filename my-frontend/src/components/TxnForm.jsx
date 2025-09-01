import React from 'react'
import {useForm } from 'react-hook-form';
import { useState , useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTxn, updateTxn } from '../redux/txnSlice/txnSlice';
import { useDispatch , useSelector } from 'react-redux';

function TxnForm() {
    const toBeEdited = useSelector((state) => state.transactions.toBeEditedTxn);
    const dispatch = useDispatch();
    

    const { register, handleSubmit, setValue, reset ,formState: { errors } } = useForm({ defaultValues: { txnType: "EXPENSE"} });
    const onSubmit = (formValues) => {
        if(formValues.id){
            dispatch(updateTxn(formValues));
        }else{
            dispatch(addTxn({...formValues , id : uuidv4()}));
        }
        reset({txnType : "EXPENSE" , amount : "" , category : "" , desc: "" , id : ""})
    }


    const [txnType, settxnType] = useState('EXPENSE');
    const toggleTxnType = () => {
        const newValue = txnType === "EXPENSE" ? "INCOME" : "EXPENSE";
        settxnType(newValue);
        setValue("txnType", newValue);
    }

    useEffect(() => {
        if(toBeEdited){
            reset(toBeEdited)
            settxnType(toBeEdited.txnType);
        }
    }, [toBeEdited ])
    

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">TRANSACTION:</label><br />
                <input type="hidden" {...register("txnType")} />
                {/* <button type='button' onClick={() => {settxnType(txnType === "EXPENSE"? "INCOME": "EXPENSE"); setValue("txnType" , txnType)} }>{txnType}</button> */}
                <button className={txnType === "EXPENSE" ? "red toggle-button" : 'green toggle-button'} type="button" onClick={toggleTxnType}> {txnType}</button><br />
                <label htmlFor="amt">Amount:</label><br />
                <input type="number" {...register("amount", { min: { value: 1, message: "amount cannot be less than 1" }, required: { value: true, message: "amount cannot be empty" } })} /> <br />
                {errors.amount && <p className='errors'>{errors.amount.message}</p>}
                <label htmlFor="">Category</label><br />
                <select  {...register("category", { required: { value: true, message: "must select a category" } })}>
                    <option disabled>-- Select an option --</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Travel">Travel</option>
                    <option value="Salary">Salary</option>
                    <option value="Bills">Bills</option>
                    <option value="Personel">Personel</option>
                </select><br />
                {errors.category && <p className='errors'>{errors.category.message}</p>}
                <label htmlFor="">Description</label><br />
                <input  type="text" {...register("desc", { required: false })} /><br />
                <button className='submitButton' type='submit'>submit</button>
                
            </form>
        </>
    )
}

export default TxnForm