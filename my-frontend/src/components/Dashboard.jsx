import { Container, Row, Col } from "react-bootstrap";
import '../styles/DashboardStyle.css'
import TxnForm from './TxnForm';
import TxnTable from './TxnTable';
import { useDispatch } from 'react-redux';
import { setfilter } from '../redux/txnSlice/txnSlice';

function Dashboard() {
    const dispatch = useDispatch();
    return (
        <>
            <Container>
                <div className="dashboard-header">
                    <h2>Personal Finance Tracker</h2>
                </div>
                <Row>
                    <Col className="" sm={12} md={{span : 6 , offset : 3}} lg={{span : 4 , offset : 0}}>
                        <TxnForm />
                    </Col>
                    <Col className="mt-sm-3 mt-lg-0 mt-3" sm={12} md = {12} lg={{span : 7 , offset :1}}>
                        <div className="filter-section">
                            <h5>Filter Transactions</h5>
                            <div className="filters">
                                <select className="filter-select" onChange={(e) => {console.log(e.target.value); dispatch(setfilter(e.target.value))}} name="" id="">
                                    <option value="all">All Categories</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Personel">Personel</option>
                                </select>
                                <select className="filter-select" onChange={(e) => {console.log("p" , e.target.value);dispatch(setfilter(e.target.value))}}>
                                    <option value="all">All Types</option>
                                    <option value="EXPENSE">Expense</option>
                                    <option value="INCOME">Income</option>
                                </select>
                            </div>
                        </div>
                        <TxnTable />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Dashboard