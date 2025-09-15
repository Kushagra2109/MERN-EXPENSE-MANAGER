import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useDispatch, useSelector } from 'react-redux';
import { getTxn } from "../redux/txnSlice/txnSlice";
import { Container, Row, Col } from 'react-bootstrap'

function PieChartt() {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.txn)

  useEffect(() => {
    dispatch(getTxn());
  }, []);

  const pieDataForIncomes = useMemo(() => {
    const categoryTotals = {};

    transactions.forEach(txn => {
      if (txn.txnType === "EXPENSE") { return }
      const cat = txn.category || "Uncategorized";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + txn.amount;
    });



    return Object.keys(categoryTotals).map(cat => ({
      name: cat,
      value: categoryTotals[cat]
    }));
  }, [transactions]);

  // Prepare data for PieChart
  const pieDataForExpenses = useMemo(() => {
    const categoryTotals = {};

    transactions.forEach(txn => {
      if (txn.txnType === "INCOME") { return }
      const cat = txn.category || "Uncategorized";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + txn.amount;
    });



    return Object.keys(categoryTotals).map(cat => ({
      name: cat,
      value: categoryTotals[cat]
    }));
  }, [transactions]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <>
      <Container>
        <Row>
          <Col lg={6} >
            <h2>Expense by Category</h2>
            <PieChart width={600} height={400}>
              <Pie
                data={pieDataForExpenses}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={125}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieDataForExpenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>
          <Col lg={6}>
            <h2>Income by categories</h2>
            <PieChart width={600} height={400}>
              <Pie
                data={pieDataForIncomes}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={125}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieDataForIncomes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PieChartt;
