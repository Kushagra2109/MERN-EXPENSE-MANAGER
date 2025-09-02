import { Container, Row, Col } from "react-bootstrap";
import '../styles/DashboardStyle.css'
import TxnForm from './TxnForm';
import TxnTable from './TxnTable';


function Dashboard() {

    return (
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <TxnForm />
                    </Col>

                    <Col md={{ span: 7, offset: 1 }}>
                        <TxnTable />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard