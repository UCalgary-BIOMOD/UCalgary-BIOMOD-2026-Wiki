
import {Link} from "react-router-dom"
import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
    faInstagram,
    faLinkedinIn,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
/*
    Footer.jsx
    - Renders the site footer: logo, social icons (inline SVGs), navigation columns, and disclaimer.
    - Uses CSS Modules (Footer.module.css) for scoped styling.
    - Social icons are inline SVGs so the component does not depend on an external icon font.
    - Accessibility: each social anchor includes `aria-label` and SVGs have `aria-hidden`.
    - Maintainer notes:
        * Adjust spacing or the icon-stack under the logo in `Footer.module.css` (.socials, .socialIcons, .logo).
        * The current width/size is tuned for five icons; if you add/remove icons, update the
            `.socialIcons` constrained width and icon sizing for symmetry.
*/

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>

                {/* Logo + Socials */}
                <div className={styles.socials}>
                    <Link to="/">
                        <img
                            src="/images/aptonix-logo-transparent.png"
                            alt="Logo"
                            className={styles.logo}
                        />
                    </Link>

                    <div className={styles.socialIcons}>

                        {/* Website */}
                        <a
                            href="https://bmerit.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="Website"
                        >
                            <FontAwesomeIcon icon={faGlobe} />
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/biomod_ucalgary"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/company/biomedical-engineering-research-and-innovation-team-bmerit-ucalgary"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@ucalgarybiomod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="YouTube"
                        >
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:bmerit@ucalgary.ca"
                            className={styles.socialLink}
                            aria-label="Email"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>

                {/* Home */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>Home</h5>
                    <ul className={styles.list}>
                        <li><Link to="/" className={styles.navLink}>Home</Link></li>
                    </ul>
                </div>

                {/* Project */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>Project</h5>
                    <ul className={styles.list}>
                        <li><Link to="/description" className={styles.navLink}>Description</Link></li>
                        <li><Link to="/modelling" className={styles.navLink}>Modelling</Link></li>
                        <li><Link to="/experiments" className={styles.navLink}>Experiments</Link></li>
                        <li><Link to="/results" className={styles.navLink}>Results</Link></li>
                        <li><Link to="/notebook" className={styles.navLink}>Notebook</Link></li>
                    </ul>
                </div>

                {/* ELSI */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>ELSI</h5>
                    <ul className={styles.list}>
                        <li><Link to="/elsi" className={styles.navLink}>ELSI</Link></li>
                    </ul>
                </div>

                {/* Team */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>Team</h5>
                    <ul className={styles.list}>
                        <li><Link to="/team" className={styles.navLink}>Team</Link></li>
                    </ul>
                </div>

                </div>

                <hr className={styles.divider} />

                {/* Disclaimer */}
                <div className={styles.disclaimer}>
                    <p className={styles.disclaimerText}>
                        The repository used to create this website is available at {" "}
                        <a href="https://github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki" className={styles.navLink} target="_blank" rel="noopener noreferrer">
                            github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    )
}
