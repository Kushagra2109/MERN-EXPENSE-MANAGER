import React from 'react'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { addTxn, updateTxn } from '../redux/txnSlice/txnSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>TRANSACTION:</Form.Label>
                <input type="hidden" {...register("txnType")} />
                <Button
                    type="button"
                    onClick={toggleTxnType}
                    className={txnType === "EXPENSE" ? "red toggle-button w-100 mb-3" : "green toggle-button w-100 mb-3"}
                >
                    {txnType}
                </Button>

                <Form.Group className="mb-3">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                        type="number"
                        {...register("amount", {
                            min: { value: 1, message: "amount cannot be less than 1" },
                            required: { value: true, message: "amount cannot be empty" }
                        })}
                    />
                    {errors.amount && <p className='errors text-danger small mt-1'>{errors.amount.message}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select {...register("category", { required: { value: true, message: "must select a category" } })}>
                        <option disabled>-- Select an option --</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Travel">Travel</option>
                        <option value="Salary">Salary</option>
                        <option value="Bills">Bills</option>
                        <option value="Personel">Personel</option>
                    </Form.Select>
                    {errors.category && <p className='errors text-danger small mt-1'>{errors.category.message}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" {...register("desc", { required: false })} />
                </Form.Group>

                <Button type="submit" className="submitButton w-100 mt-3">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default TxnForm
