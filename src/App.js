import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import React from "react";
import { RulePage, RuleLink, getDocumentationSiteMap } from 'publicodes-react'

import Doc from "./Doc";



function App() {

    return (
		<div className="App">
			<header className="App-header">
				<a
					className="App-link"
					href="https://publi.codes"
					target="_blank"
					rel="noopener noreferrer"
				>
					Voir la documentation
				</a>
			</header>
			<Doc />
		</div>

    );
}

export default App;
