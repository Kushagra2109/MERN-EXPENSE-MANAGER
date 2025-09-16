import React from 'react'
import { useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/register/RegisterSlice';
import useAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, reset, handleSubmit } = useForm();



    const onSubmit = async (formValues) => {
        const resultAction = await dispatch(userLogin(formValues));

        if (userLogin.fulfilled.match(resultAction)) {
            navigate('/dashboard');
        } else {
            alert("Invalid username or password");
        }

    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='text-center mt-3'>Login</h2>
                            <label > username</label>
                            <input type="text" {...register("username", { required: true })} />
                            <label >password</label>
                            <input type="password" {...register("password", { required: true })} />
                            <button className='submitButton' type='submit'>Login</button>
                            <a className='text-end d-block mt-4 cursor-pointer' onClick={() => { navigate("/register") }}>Not registered? Register here!</a>
                            <a className='text-end d-block mt-4 cursor-pointer' onClick={() => { navigate("/forgotPassword") }}>Forgot Password? Click Here!</a>
                        </form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Login