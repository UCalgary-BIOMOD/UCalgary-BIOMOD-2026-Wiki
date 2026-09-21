
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
                    <a href="/">
                        <img
                            src="/images/aptonix-logo-transparent.png"
                            alt="Logo"
                            className={styles.logo}
                        />
                    </a>

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
                        <li><a href="/" className={styles.navLink}>Home</a></li>
                    </ul>
                </div>

                {/* Project */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>Project</h5>
                    <ul className={styles.list}>
                        <li><a href="/description" className={styles.navLink}>Description</a></li>
                        <li><a href="/modelling" className={styles.navLink}>Modelling</a></li>
                        <li><a href="/experiments" className={styles.navLink}>Experiments</a></li>
                        <li><a href="/results" className={styles.navLink}>Results</a></li>
                        <li><a href="/notebook" className={styles.navLink}>Notebook</a></li>
                    </ul>
                </div>

                {/* ELSI */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>ELSI</h5>
                    <ul className={styles.list}>
                        <li><a href="/elsi" className={styles.navLink}>ELSI</a></li>
                    </ul>
                </div>

                {/* Team */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}>Team</h5>
                    <ul className={styles.list}>
                        <li><a href="/team" className={styles.navLink}>Team</a></li>
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
