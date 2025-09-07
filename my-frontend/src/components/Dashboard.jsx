import { Container, Row, Col, Card, Form } from "react-bootstrap";
import '../styles/DashboardStyle.css'
import TxnForm from './TxnForm';
import TxnTable from './TxnTable';
import { useDispatch } from 'react-redux';
import { setfilter } from '../redux/txnSlice/txnSlice';

function Dashboard() {
    const dispatch = useDispatch();
    return (
        <>
            <Container className="py-4">
                <Row className="g-4">
                    <Col sm={12} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 0 }}>
                        <Card className="shadow rounded">
                            <Card.Body>
                                <TxnForm />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={12} md={12} lg={{ span: 7, offset: 1 }}>
                        <Card className="shadow rounded">
                            <Card.Body>
                                <div className="d-flex flex-wrap mb-4 gap-3">
                                    <Form.Select
                                        onChange={(e) => { dispatch(setfilter(e.target.value)) }}
                                        style={{ maxWidth: "200px" }}
                                    >
                                        <option>all</option>
                                        <option value="Food">Food</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Bills">Bills</option>
                                        <option value="Personel">Personel</option>
                                    </Form.Select>

                                    <Form.Select
                                        onChange={(e) => { dispatch(setfilter(e.target.value)) }}
                                        style={{ maxWidth: "200px" }}
                                    >
                                        <option value="all">all</option>
                                        <option value="EXPENSE">EXPENSE</option>
                                        <option value="INCOME">INCOME</option>
                                    </Form.Select>
                                </div>

                                <TxnTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;
