
import styles from "./Footer.module.css"

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
                        <img src="/images/aptonix-logo-transparent.png" alt="Logo" className={styles.logo} />
                    </a>
                    <div className={styles.socialIcons}>
                        <a href="https://bmerit.web.app/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Website">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.9 0 3.65.66 5.04 1.76l-1.2 1.2A7.98 7.98 0 0012 6c-1.32 0-2.56.34-3.64.92l-1.21-1.2A9.96 9.96 0 0112 4zm-6.93 5.05l1.93 1.56a8.07 8.07 0 000 1.78l-1.93 1.56A8.005 8.005 0 015.07 9.05zM12 20c-1.9 0-3.65-.66-5.04-1.76l1.2-1.2A7.98 7.98 0 0012 18c1.32 0 2.56-.34 3.64-.92l1.21 1.2A9.96 9.96 0 0112 20zm6.93-5.05a8.005 8.005 0 01-1.93 1.56l-1.56-5.1 1.56-5.1A8.005 8.005 0 0118.93 14.95zM7.65 7.54l1.56 5.1-1.56 5.1A7.99 7.99 0 017.65 7.54z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/biomod_ucalgary" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zm8.5 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/biomedical-engineering-research-and-innovation-team-bmerit-ucalgary" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M6.94 6.5a1.78 1.78 0 11.02-3.56 1.78 1.78 0 01-.02 3.56zM5 8.8h3.88v10.5H5V8.8zm6.25 0h3.72v1.44h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.62 4.7 6.02v6.06h-3.88V14.5c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v4.14h-3.88V8.8z" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@ucalgarybiomod" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.6 5 12 5 12 5s-3.6 0-6.9.1c-.5 0-1.4.1-2.1.9-.6.6-.8 2-.8 2S2 9.8 2 11.6v1.8C2 14.2 2.2 15.6 2.2 15.6s.2 1.4.8 2c.8.8 1.8.8 2.2.9 1.6.1 6.7.1 6.7.1s3.6 0 6.9-.1c.5 0 1.4-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.4.2-2.2v-1.8c0-.8-.2-2.2-.2-2.2zM10 14.4V9.6l4.8 2.4L10 14.4z" />
                            </svg>
                        </a>
                        <a href="mailto:bmerit@ucalgary.ca" className={styles.socialLink} aria-label="Email">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 12 4 6.01V6h16zM4 18V8.4l8 5.33 8-5.33V18H4z" />
                            </svg>
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
                        The repository used to create this website is available at
                        <a href="https://github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki" className={styles.navLink} target="_blank" rel="noopener noreferrer">
                            github.com/meagan-davies/UCalgary-BIOMOD-2026-Wiki
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    )
}
