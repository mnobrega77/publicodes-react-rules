import {RulePage, getDocumentationSiteMap, RuleLink} from 'publicodes-react'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Engine, { utils } from 'publicodes'
import Publicodes from 'publicodes'
// import rules from 'modele-social';
import YAML from 'yaml'
import {Routes} from "react-router";
import { invertObj, last } from 'ramda'
import { useNavigate, useLocation } from 'react-router-dom'
// this is a heavy library, this component shoudl be lazy loaded
import { parse } from 'yaml'


export default function Doc({onClickShare,
                                rules,
                                defaultTarget = '',
                                onTargetChange,
                                baseUrl,
                                showDevSection,
                            }) {

    // const rulesURL = require(YAML.parse('./CO2.yaml'))
    // const rules = rules;

    // const logger = useMemo(() => new Logger(), [rules])
    const engine = useMemo(
        () => new Engine(rules),
        [rules]
    )
    const targets = useMemo(() => Object.keys(engine), [engine])
    const pathToRules = useMemo(
        () => getDocumentationSiteMap({ engine, documentationPath: '' }),
        [engine]
    )
    const ruleToPaths = useMemo(() => invertObj(pathToRules), [pathToRules])
    // const { search, pathname } = useLocation()
    // const searchParams = new URLSearchParams(search ?? '')
    // const history = useNavigate()
     const [currentTarget, setCurrentTarget] = useState( defaultTarget)
    // )
    // const setCurrentTarget = useCallback(
    //     (target) => {
    //         onTargetChange?.(target)
    //         setTarget(target)
    //     },
    //     [onTargetChange]
    // )
    //
    // useEffect(() => {
    //     if (!targets.includes(currentTarget)) {
    //         setCurrentTarget(last(targets) ?? '')
    //     }
    // }, [currentTarget])
    //
    // useEffect(() => {
    //     if (searchParams.get('rule') !== currentTarget) {
    //         searchParams.set('rule', currentTarget)
    //     }
    // }, [searchParams, currentTarget])
    //
    // useEffect(() => {
    //     if (baseUrl == null) {
    //         return
    //     }
    //     const newPathname = baseUrl + '/' + utils.encodeRuleName(currentTarget)
    //
    //     if (pathname !== newPathname) {
    //         history.replace({
    //             ...history.location,
    //             pathname: newPathname,
    //         })
    //     }
    // }, [baseUrl, currentTarget, pathname, history])


    async function initEngine(setEngine) {
         const response = await fetch(rules)
        const rules = await response.jsonp()
        setEngine(new Engine(rules))
    }

    //
    // useEffect(() => {
    //     initEngine(setEngine)
    // }, [setEngine])

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
                                renderers={{
                                    Link: ({to, children }) =>{
                                        return(
                                            <Link
                                                to={to}
                                                onClick={(evt) => {
                                                      evt.preventDefault()
                                                      evt.stopPropagation()
                                                      setCurrentTarget(pathToRules[to])
                                                  }}
                                                >
                                                {children}
                                            </Link>
                                        )
                                    } }}
                                language={'fr'}/>
                        )}
                    />
                </Routes>
                {/*<h2>Toutes les règles</h2>*/}
                {/*<ul>*/}
                {/*    {Object.entries(*/}
                {/*        getDocumentationSiteMap({ engine, documentationPath: '' })*/}
                {/*    ).map(([link, name]) => (*/}
                {/*        <li key={link}>*/}
                {/*            <Link to={`/doc${link}`}>{name}</Link>*/}
                {/*            <RuleLink*/}
                {/*                // dottedName={''}*/}
                {/*                engine={engine}*/}
                {/*                linkComponent={Link}*/}
                {/*                />*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </Router>
    )
}
