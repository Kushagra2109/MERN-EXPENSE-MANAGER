import React from 'react'
import { Row, Col , Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { userRegistration } from '../redux/register/RegisterSlice';
import { useSelector , useDispatch } from 'react-redux';
import useAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router';

function Register() {   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register , handleSubmit , reset ,formState : {errors}} = useForm();

  const onSubmit = (user) => {
    dispatch(userRegistration(user))
    reset()
  }
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={{span: 8 , offset:2}} lg={{span: 4, offset: 4}}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-center'>Register</h2>
              <label >Email</label>
              <input type="text" {...register("email" , {required : {value: true, message :"Email cannot be empty"} , pattern : {value : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ , message : "Invalid Email Address"}})}/>
              <label >UserName</label>
              <input type="text" {...register("username" , {required : {value: true, message :"username cannot be empty"} , min : {value: 6 , message: "username cannot be less than 6 charactors"}})}/>
              <label >Password</label>
              <input type="password" {...register("password" , {required : {value : true, message :"password cannot be empty"} , min : {value : 4 , message: "password cannot be less than 4 charactors"}})}/>
              <button className='submitButton' type='submit'>Register</button>
              <a className='text-end d-block mt-4' onClick={() => {navigate("/login")}}>Already registered? Login here!</a>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register