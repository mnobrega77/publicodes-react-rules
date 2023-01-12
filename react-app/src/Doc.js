import {RulePage, getDocumentationSiteMap, RuleLink} from 'publicodes-react'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Doc(props) {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.rule.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.rule.nom}</p>
                    {/*{*/}
                    {/*    props.rule.rawNode.description && (*/}
                    {/*        <span>*/}
                    {/*    <p className={'text-center'}>Description</p>*/}
                    {/*    <p>{props.rule.rawNode.description}</p>*/}
                    {/*    <p>{props.rule["par défaut"]}</p>*/}
                    {/*</span>*/}
                    {/*    )*/}
                    {/*}*/}
                    {
                        props.rule.avec && (
                            <span>
                        {/*<p> Déductible : </p>*/}
                        {/*        {*/}
                        {/*            Object.values(props.rule.avec).map((value, index) => (*/}
                        {/*                <small>{value} </small>*/}
                        {/*            ))*/}
                        {/*        }*/}


                        {/*<p>{props.rule.description}</p>*/}
                    </span>
                        )
                    }

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
