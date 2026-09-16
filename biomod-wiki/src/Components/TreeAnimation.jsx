import styles from "./TreeAnimation.module.css";
import { useEffect, useRef } from "react";

/** 
 * Tree animation logic adapted from SuperHi via 
 * https://www.youtube.com/watch?v=w8DOo_ICJds (Accessed: Sep 9, 2026)
 */


/**
 *  ChatGPT was used to assist with refactoring the original SVG path into separate branches and circles.
 */

/*INCLUDE REFERENCEs IN GIT HUB READ ME*/

/**
 * The TreeAnimation component animates the tree SVG based on the user's scroll position.
 * The tree is divided into separate SVG branches and circles that are grouped by level.
 * Each segment uses stroke-dasharray and stroke-dashoffset to create a drawing animation.
 * As the user scrolls, the tree is gradually drawn from bottom to top, with branches at the same level animated simultaneously.
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children elements rendered within the TreeAnimation component.
 * @returns {JSX.Element} The rendered TreeAnimation component.
 */

export default function TreeAnimation({children}) {
    const sectionRef = useRef(null);
    const segmentRefs = useRef([]);
    const stickyRef = useRef(null);
    useEffect(() => {
        const section = sectionRef.current;

        const sticky = stickyRef.current;

        const groups = [ /* Each group contains the segments that should be animated together. */
            // Bottom trunk
            [
                segmentRefs.current[0]
            ],
            // 5L. Neeor branch + 5R. Shahzaib branch
            [
                segmentRefs.current[1],
                segmentRefs.current[2]
            ],
            // 5L. Neeor circle + 5R. Shahzaib circle
            [
                segmentRefs.current[3],
                segmentRefs.current[4]
            ],
            // Trunk
            [
                segmentRefs.current[5]
            ],
            // 4L. Anahat branch + 4R. Hannah branch
            [
                segmentRefs.current[6],
                segmentRefs.current[7]
            ],
            // 4L. Anahat circle + 4R. Hannah circle
            [
                segmentRefs.current[8],
                segmentRefs.current[9]
            ],
            // Trunk
            [
                segmentRefs.current[10]
            ],
            // 3L. Sukhman branch + 3R. Nam branch
            [
                segmentRefs.current[11],
                segmentRefs.current[12]
            ],
            // 3L. Sukhman circle + 3R. Nam circle
            [
                segmentRefs.current[13],
                segmentRefs.current[14]
            ],
            // Trunk
            [
                segmentRefs.current[15]
            ],
            // 2L. Sofea branch + 2R. Allan branch
            [
                segmentRefs.current[16],
                segmentRefs.current[17]
            ],
            // 2L. Sofea circle + 2R. Allan circle
            [
                segmentRefs.current[18],
                segmentRefs.current[19]
            ],
            // Trunk
            [
                segmentRefs.current[20]
            ],
            // 1. Meagan circle
            [
                segmentRefs.current[21]
            ]
        ];
        groups.forEach((group) => {
            group.forEach((segment) => {
                if (!segment) return;
                const length = segment.getTotalLength();
                segment.style.strokeDasharray = length;
                if (segment.dataset.direction === "reverse") {
                    segment.style.strokeDashoffset = -length;
                } else {
                    segment.style.strokeDashoffset = length;
                }
            });
        });
        const handleScroll = () => {
            const members = section.querySelectorAll(`.${styles.memberPosition}`);
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            const stickyHeight = sticky.offsetHeight;
            const stickyTop = parseFloat(window.getComputedStyle(sticky).top) || 0;
            const stickyStart = sectionTop - stickyTop;
            const stickyEnd = sectionTop + sectionHeight - stickyHeight - stickyTop;
            const stickyDuration = stickyEnd - stickyStart;
            const animationDuration = stickyDuration * 0.9;
            let progress = (window.scrollY - stickyStart) / animationDuration;
            progress = Math.max(0, Math.min(1, progress));
            const groupCount = groups.length;
            groups.forEach((group, groupIndex) => {
                const groupStart = groupIndex / groupCount;
                const groupEnd = (groupIndex + 1) / groupCount;
                let groupProgress = (progress - groupStart) / (groupEnd - groupStart);
                groupProgress = Math.max(0, Math.min(1, groupProgress));
                group.forEach((segment) => {
                    if (!segment) return;
                    const length = segment.getTotalLength();
                    if (segment.dataset.direction === "reverse") {
                        segment.style.strokeDashoffset =
                            -length * (1 - groupProgress);
                    } else {
                        segment.style.strokeDashoffset =
                            length * (1 - groupProgress);
                    }
                    if (segment.tagName.toLowerCase() === "circle") {segment.style.visibility = groupProgress <= 0 ? "hidden" : "visible";}
                });
            });
            members[7].style.opacity = progress >= 3 / groupCount ? 1 : 0; // Neeor
            members[8].style.opacity = progress >= 3 / groupCount ? 1 : 0; // Shahzaib
            members[5].style.opacity = progress >= 6 / groupCount ? 1 : 0; // Anahat
            members[6].style.opacity = progress >= 6 / groupCount ? 1 : 0; // Hannah
            members[3].style.opacity = progress >= 9 / groupCount ? 1 : 0; // Sukhman
            members[4].style.opacity = progress >= 9 / groupCount ? 1 : 0; // Nam
            members[1].style.opacity = progress >= 12 / groupCount ? 1 : 0; // Sofea
            members[2].style.opacity = progress >= 12 / groupCount ? 1 : 0; // Allan
            members[0].style.opacity = progress >= 14 / groupCount ? 1 : 0; // Meagan
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
    <section ref={sectionRef} className={styles.treeSection}>
        <div ref={stickyRef} className={styles.stickyTree}>
            <div className={styles.treeWrapper}>
                <svg
                    viewBox="0 0 1183 996"
                    fill="none"
                    className={styles.tree}
                >
                    {/* Bottom trunk */}
                    <path
                        ref={(el) => segmentRefs.current[0] = el}
                        d="M586.964 985.5 L586.964 959"
                    />
                    {/* 5L. Neeor branch */}
                    <path
                        ref={(el) => segmentRefs.current[1] = el}
                        d="
                            M586.964 959
                            C560.342 870.555
                            542.268 858.975
                            475.622 848.5
                        "
                    />
                    {/* 5R. Shahzaib branch */}
                    <path
                        ref={(el) => segmentRefs.current[2] = el}
                        d="
                            M586.964 959
                            C616.464 874.5
                            617.716 859.81
                            696.964 848.5
                        "
                    />
                    {/* 5L. Neeor circle */}
                    <circle
                        ref={(el) => segmentRefs.current[3] = el}
                        cx="365.122"
                        cy="848.5"
                        r="110.5"
                    />
                    {/* 5R. Shahzaib circle */}
                    <circle
                        ref={(el) => segmentRefs.current[4] = el}
                        cx="807.464"
                        cy="848.5"
                        r="110.5"
                        transform="rotate(180 807.464 848.5)"
                        data-direction="reverse"
                    />
                    {/* Trunk */}
                    <path
                        ref={(el) => segmentRefs.current[5] = el}
                        d="M586.964 959 L586.964 793.5"
                    />
                    {/* 4L. Anahat branch */}
                    <path
                        ref={(el) => segmentRefs.current[6] = el}
                        d="
                            M586.964 793.5
                            C582.178 704.667
                            581.005 637.5
                            231 619.5
                        "
                    />
                    {/* 4R. Hannah branch */}
                    <path
                        ref={(el) => segmentRefs.current[7] = el}
                        d="
                            M586.964 793.5
                            C591.756 705.837
                            586.464 637.5
                            951.253 619.5
                        "
                    />
                    {/* 4L. Anahat circle */}
                    <circle
                        ref={(el) => segmentRefs.current[8] = el}
                        cx="120.5"
                        cy="619.5"
                        r="110.5"
                    />
                    {/* 4R. Hannah circle */}
                    <circle
                        ref={(el) => segmentRefs.current[9] = el}
                        cx="1061.753"
                        cy="619.5"
                        r="110.5"
                        transform="rotate(180 1061.753 619.5)"
                        data-direction="reverse"
                    />
                    {/* Trunk */}
                    <path
                        ref={(el) => segmentRefs.current[10] = el}
                        d="
                            M586.964 793.5
                            L586.464 619.5
                        "
                    />
                    {/* 3L. Sukhman branch */}
                    <path
                        ref={(el) => segmentRefs.current[11] = el}
                        d="
                            M586.464 619.5
                            C576.966 567.516
                            567.105 516.569
                            522.286 511
                        "
                    />
                    {/* 3R. Nam branch */}
                    <path
                        ref={(el) => segmentRefs.current[12] = el}
                        d="
                            M586.464 619.5
                            C595.71 567.699
                            606.681 518.273
                            650.643 511
                        "
                    />
                    {/* 3L. Sukhman circle */}
                    <circle
                        ref={(el) => segmentRefs.current[13] = el}
                        cx="413.085"
                        cy="496"
                        r="110.5"
                        transform="rotate(7.8 413.085 496)"

                    />
                    {/* 3R. Nam circle */}
                    <circle
                        ref={(el) => segmentRefs.current[14] = el}
                        cx="761.143"
                        cy="496"
                        r="110.5"
                        transform="rotate(172.2 761.143 496)"
                        data-direction="reverse"
                    />
                    {/* Trunk */}
                    <path
                        ref={(el) => segmentRefs.current[15] = el}
                        d="
                            M586.464 619.5
                            L586.464 451.5
                        "
                    />
                    {/* 2L. Sofea branch */}
                    <path
                        ref={(el) => segmentRefs.current[16] = el}
                        d="
                            M586.464 451.5
                            C568.464 321.5
                            557.464 295.5
                            341.473 241.5
                        "
                    />
                    {/* 2R. Allan branch */}
                    <path
                        ref={(el) => segmentRefs.current[17] = el}
                        d="
                            M586.464 451.5
                            C605.464 319.5
                            610.964 304.5
                            824.413 241.5
                        "
                    />
                    {/* 2L. Sofea circle */}
                    <circle
                        ref={(el) => segmentRefs.current[18] = el}
                        cx="230.973"
                        cy="241.5"
                        r="110.5"
                    />
                    {/* 2R. Allan circle */}
                    <circle
                        ref={(el) => segmentRefs.current[19] = el}
                        cx="934.913"
                        cy="241.5"
                        r="110.5"
                        transform="rotate(180 934.913 241.5)"
                        data-direction="reverse"
                    />
                    {/* Trunk */}
                    <path
                        ref={(el) => segmentRefs.current[20] = el}
                        d="
                            M586.464 451.5
                            L586.964 231
                        "
                    />
                    {/* 1. Meagan circle*/}
                    <circle
                        ref={(el) => segmentRefs.current[21] = el}
                        cx="586.964"
                        cy="120.5"
                        r="110.5"
                        transform="rotate(90 586.964 120.5)"

                    />
                </svg>
                <div className={styles.members}>
                    {children}
                </div>
            </div>
        </div>
    </section>
);
}