import {RulePage, getDocumentationSiteMap, RuleLink} from 'publicodes-react'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Engine, { utils } from 'publicodes'
import Publicodes from 'publicodes'
import rules from 'modele-social';
import YAML from 'yaml'
import {Routes} from "react-router";



export default function Doc() {


    // const logger = useMemo(() => new Logger(), [rules])
    const engine = new Engine(rules);

    if (!engine) {
        return 'Chargement des règles de calculs en cours...'
    }


    return (
        <Router>
            <div style={{ margin: 'auto', maxWidth: '800px' }}>
                <Routes>
                    <Route
                        path="/doc/:name+"
                        render={({ match }) => (
                            <RulePage
                                engine={engine}
                                documentationPath=""
                                rulePath={match.params.name}
                                renderers={{ Link }}
                                language={'fr'}/>
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
    )
}
