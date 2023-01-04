import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import React from "react";
import { RulePage, RuleLink, getDocumentationSiteMap } from 'publicodes-react'

import Doc from "./Doc";



function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

    return (
		<div className="App">
			<header className="App-header">
				<p>{!data ? "Loading..." : data}</p>
				{/*<a*/}
				{/*	className="App-link"*/}
				{/*	href="https://publi.codes"*/}
				{/*	target="_blank"*/}
				{/*	rel="noopener noreferrer"*/}
				{/*>*/}
				{/*	Voir la documentation*/}
				{/*</a>*/}
			</header>
			<Doc />
		</div>

    );
}

export default App;
