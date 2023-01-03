import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import React from "react";

import { RulePage, RuleLink, getDocumentationSiteMap } from 'publicodes-react'
import Engine from 'publicodes'
import rules from 'modele-social';


function App() {
  // const rules3 = { coucou: 0 };
//   const getArtisteDoc = () => {
//     return (
//         <p>
//             Accéder aux{' '}
//             <RuleLink
//                 dottedName={'artiste auteur'}
//                 engine={engine}
//                 documentationPath={''}
//                 linkComponent={Link}
//             />
//         </p>
//     )
// }


// On initialise un moteur en lui donnant le publicodes sous forme d'objet javascript.
// Ce publicodes va être parsé
    const engine = new Engine(rules)

    return (
        // <div>
        //     <RulePage
        //         documentationPath="/doc"
        //         language="fr"
        //         rulePath='coucou'
        //         renderers={{
          //             Head,
          //             Link: ({to, children}) => <Link href={to}>{children}</Link>
          //         }}
          //         />
          // </div>
          <>
          
          <Router>
			<div style={{ margin: 'auto', maxWidth: '800px' }}>
        <Routes>
        <Route
					path="/doc/:name+"
					render={({ match }) => (
						<RulePage
							engine={engine}
							documentationPath="/doc/:name+"
							rulePath={match.params.name}
							renderers={{ Link }}
						/>
					)}
				/>
        </Routes>
				
				<h2>Toutes les règles</h2>
				<ul>
					{Object.entries(
						getDocumentationSiteMap({ engine, documentationPath: '' })
					).map(([link, name]) => (
						<li key={link}>
							<Link to={`/doc${link}`}>{name}</Link>
						</li>
					))}
				</ul>
        
			</div>
		</Router>
    
    </>

    );
}

export default App;
