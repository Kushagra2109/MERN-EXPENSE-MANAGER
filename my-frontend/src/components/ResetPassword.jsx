import React, { useEffect } from 'react'
import { useParams } from "react-router";
import { useDispatch , useSelector } from 'react-redux';
import { verifytoken , updatePassword } from '../redux/register/RegisterSlice';
import { useForm } from 'react-hook-form';
import { Row, Col , Container } from 'react-bootstrap'
import { useNavigate } from 'react-router';

function ResetPassword() {
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    const dispatch = useDispatch();
    const {register , handleSubmit , reset ,formState : {errors}} = useForm();

    const validToken = useSelector((state) => state.register.tokenValid);

    useEffect(() => {
      dispatch(verifytoken(token))
    }, [token , dispatch])
    
    if(validToken === null){
        return (<h3> LOADING... </h3>);
    }
    if(validToken === false){
        return (<h3>Invalid Token!!</h3>);
    }
    const onSubmit = async (passwordObj) => {
            passwordObj.token = token;
            console.log('first' , passwordObj)
            const status  = await dispatch(updatePassword(passwordObj ));
            reset();
            if(status.payload === true){
                navigate('/login')
            }
          }

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={{span: 8 , offset:2}} lg={{span: 4, offset: 4}}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-center'>Enter New Password</h2>
              <label >Password</label>
              <input type="password" {...register("password" , {required : {value: true, message :"New Password cannot be empty"}, setValueAs : (v) => v.trim()  , min : {value: 4 , message : "Password cannot be less than 4 characters"}})}/>
              <button className='submitButton' type='submit'>Set</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ResetPassword