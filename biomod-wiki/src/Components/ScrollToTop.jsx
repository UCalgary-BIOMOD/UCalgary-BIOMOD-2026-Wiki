import {useEffect} from "react"
import {useLocation} from "react-router-dom"

/**
 * Resets the scroll position to the top of the page whenever the user navigates to a different page.
 * React Router swaps pages without reloading, so the browser would otherwise keep the old scroll position.
 * Links that point at a section of the same page (a #hash) are left alone so they can still scroll to that section.
 * Renders nothing; place it once inside <BrowserRouter> (see App.jsx).
 */
export default function ScrollToTop() {
    const {pathname, hash} = useLocation()

    useEffect(() => {
        if (hash) return
        window.scrollTo({top: 0, left: 0, behavior: "instant"})
    }, [pathname, hash])

    return null
}
