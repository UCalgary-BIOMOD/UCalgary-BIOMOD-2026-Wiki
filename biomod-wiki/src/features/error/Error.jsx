import { Link } from "react-router-dom"
import LinkWrapper from "../../Components/LinkComponents"

/**
 * The 404 page, shown by the catch-all route in App.jsx for any address that does not exist.
 */
export default function ErrorPage() {
    return(
        <div>
            <h1>Error 404</h1>
            <p>Page not found!</p>
            <p>Did you go somewhere on the dendrimer you weren't supposed to?</p>
            <LinkWrapper to="/">
                <h4>Go to the Aptonix homepage</h4>
            </LinkWrapper>
        </div>
        
    )
}