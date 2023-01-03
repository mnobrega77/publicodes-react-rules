import { Link } from 'react-router-dom'
import { RuleLink } from 'publicodes'

function Artiste() {
    return (
        <p>
            Accéder aux{' '}
            <RuleLink
                dottedName={'artiste auteur'}
                engine={engine}
                documentationPath={'/documentation'}
                linkComponent={Link}
            />
        </p>
    )
}