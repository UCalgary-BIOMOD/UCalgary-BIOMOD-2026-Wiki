
import {Link} from "react-router-dom"
import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope, faHouse, faFlask, faScaleBalanced, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
    faGithub,
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
        * The current width/size is tuned for six icons; if you add/remove icons, update the
            `.socialIcons` constrained width and icon sizing for symmetry.
        * The nav columns sit in a fixed grid (`.row` in Footer.module.css), so adding a column means
          updating its `grid-template-columns` too. Each column title takes a Font Awesome icon.
*/

/**
 * The site footer shown at the bottom of every page (PageLayout renders it): logo, social links, page links and a repository note.
 * See the maintainer notes in the comment above before changing the column layout or the number of icons.
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

                        {/* GitHub: the repository this website is built from */}
                        <a
                            href="https://github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="GitHub repository"
                        >
                            <FontAwesomeIcon icon={faGithub} />
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
                    <h5 className={styles.sectionTitle}><FontAwesomeIcon icon={faHouse} className={styles.titleIcon} />Home</h5>
                    <ul className={styles.list}>
                        <li><Link to="/" className={styles.navLink}>Home</Link></li>
                    </ul>
                </div>

                {/* Project */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}><FontAwesomeIcon icon={faFlask} className={styles.titleIcon} />Project</h5>
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
                    <h5 className={styles.sectionTitle}><FontAwesomeIcon icon={faScaleBalanced} className={styles.titleIcon} />ELSI</h5>
                    <ul className={styles.list}>
                        <li><Link to="/elsi" className={styles.navLink}>ELSI</Link></li>
                    </ul>
                </div>

                {/* Team */}
                <div className={styles.navCol}>
                    <h5 className={styles.sectionTitle}><FontAwesomeIcon icon={faUsers} className={styles.titleIcon} />Team</h5>
                    <ul className={styles.list}>
                        <li><Link to="/team" className={styles.navLink}>Team</Link></li>
                    </ul>
                </div>

                </div>

                <hr className={styles.divider} />

                {/* Disclaimer */}
                <div className={styles.disclaimer}>
                    <p className={styles.disclaimerText}>
                        <FontAwesomeIcon icon={faGithub} className={styles.titleIcon} />
                        The repository used to create this website is available on{" "}
                        <a href="https://github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki" className={styles.navLink} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    )
}
