"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if(isOpen) {
            document.documentElement.classList.add('navOpen');
        } else {
            document.documentElement.classList.remove('navOpen');
            
        }
    }, [isOpen]);
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.navLogoContainer}>
                    <img src="/images/car.svg" alt="logo" className={styles.navLogo} />
                </div>
                <ul className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
                    <li className={styles.navItem}><Link className={styles.navLink} href="/" onClick={closeMenu}>Home</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} href="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} href="/newsletter" onClick={closeMenu}>Newsletter</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} href="/cars" onClick={closeMenu}>Cars</Link></li>
                    <li className={styles.navItem}>
                        <Link className={styles.navLink} href="/admin" onClick={closeMenu}>
                            <img src="/icons/admin.svg" alt="lock" className={styles.navAdmin} />
                        </Link>
                    </li>
                     
                </ul>
                <div className={styles.burger} onClick={toggleMenu}>
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                </div>
            </nav>
        </header>
         
    );
}

export default Header;