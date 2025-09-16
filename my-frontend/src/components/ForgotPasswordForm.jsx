import React from 'react'
import { Row, Col , Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../redux/register/RegisterSlice';
import { useDispatch } from 'react-redux';

function ForgotPasswordForm() {
      const {register , handleSubmit , reset ,formState : {errors}} = useForm();
      const dispatch = useDispatch();

    const onSubmit = (user) => {
        dispatch(forgotPassword(user))
        reset()
      }

  return (
<>
      <Container>
        <Row>
          <Col sm={12} md={{span: 8 , offset:2}} lg={{span: 4, offset: 4}}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-center'>Reset Password</h2>
              <label >Email</label>
              <input type="text" {...register("email" , {required : {value: true, message :"Email cannot be empty"} , pattern : {value : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ , message : "Invalid Email Address"}})}/>
              <button className='submitButton' type='submit'>Proceed</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ForgotPasswordForm