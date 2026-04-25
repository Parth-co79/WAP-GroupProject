import styles from './Navbar.module.css';

function Navbar({ searchQuery, setSearchQuery, darkMode, setDarkMode, onToggleSidebar, onGoHome,handlePost }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.groupedNavAndLogo}>
                <button
                    className={styles.navbarMobileMenu}
                    onClick={onToggleSidebar}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                <a className={styles.navbarLogo} onClick={onGoHome} style={{ cursor: "pointer" }}>
                    <div className={styles.navbarLogoIcon}>r/</div>
                    <span className={styles.navbarLogoText}>RedditX</span>
                </a>
            </div>

            <div className={styles.navbarSearch}>
                <span className={styles.navbarSearchIcon}>🔍</span>
                <input
                    type="text"
                    className={styles.navbarSearchInput}
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.navbarRight}>
                <button className={styles.navbarCreateBtn} onClick={handlePost}>
                    ＋ <span>Create Post</span>
                </button>
                <button
                    className={styles.navbarThemeToggle}
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
