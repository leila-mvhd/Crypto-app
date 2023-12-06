import React from 'react';
import styles from './Layout.module.css'

function Layout({children}) {
    return (
        <>
            <header className={styles.header}>
                <h2>Cryptocurrency App</h2>
                <p>Leila Mvhd | React.js Developer</p>
            </header>
            {children}
            <footer className={styles.footer}>
                <p>Developed By MVHD</p>
            </footer>
        </>
    );
}

export default Layout;