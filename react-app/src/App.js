import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import React, {useEffect, useState} from "react";
import { RulePage, RuleLink, getDocumentationSiteMap } from 'publicodes-react'

import Doc from "./Doc";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {

	const [data, setData] = useState(null);
	const [rule, setRule ] = useState({});
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const onClickHandle = (item) => {
		setShow(true);
		setRule(item);
		console.log(item, show);
	};

	useEffect(() => {
		fetch("/api/rules")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				console.log(data);
			});
	}, []);

    return (
    	<>
		<Container className="App">
				<h2 className={'p-2'}>Publicodes</h2>
			<Row className="row">
				<Col lg md={12}>
						{
							data && Object.values(data).map((item, index) =>(
								<>
									<span className={'d-block'}>
										<p>{item.title}</p>
										<Button variant="info" size={'sm'} onClick={() => { onClickHandle(item)} }>Documentation</Button>
									</span>
								</>
							))
						}
				</Col>
			</Row>

			</Container>
			<Doc rule={rule} show={show} handleClose={() => {handleClose()} }/>
		</>

    );
}

export default App;
