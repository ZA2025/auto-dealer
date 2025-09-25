"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import exp from 'constants';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerList}>
                <section className={styles.footerItem}>
                    <img src="/images/Autogalerie.png"  className={styles.footerImage} />
                </section>
                <section className={styles.footerItem}>
                    <h2 className={styles.footerTitle}>Kontakt</h2>
                    <ul className={styles.footerLinks}>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>+49 (0)176 63775740</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>info@auto-galerie-trier.com</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Luxemburger Straße 54, 54294 Trier </Link></li>
                    </ul>
                </section>
                <section className={styles.footerItem}>
                    <h2 className={styles.footerTitle}>Section 3</h2>
                     
                    <ul className={styles.footerLinks}>
                        
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href="/">Home</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href="/contact">Contact</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href="/newsletter">Newsletter</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href="/cars">Cars</Link></li>
                         
                    </ul>
                    
                </section>
                <section className={styles.footerItem}>
                    <h2 className={styles.footerTitle}>Follow Us</h2>
                    <ul className={styles.footerLinks}>
                        <li className={styles.footerLink}>
                            <Link className={styles.footerLinkTag} href='/'>
                                <span className={styles.footerIcon}>
                                    <svg focusable='false'>
                                        <title>Facebook</title>
                                        <use href='/icons/facebook.svg#icon-facebook'></use>
                                    </svg>
                                </span>
                                <span className={styles.footerIconTitle}>Facebook</span>
                            </Link>
                        </li>
                        <li className={styles.footerLink}>
                            <Link className={styles.footerLinkTag} href='/'>
                                <span className={styles.footerIcon}>
                                    <svg focusable='false'>
                                        <title>Twitter</title>
                                        <use href='/icons/twitter.svg#icon-twitter'></use>
                                    </svg>
                                </span>
                                <span className={styles.footerIconTitle}>Twitter</span>
                            </Link>
                        </li>
                            
                    </ul>
                </section>
            </div>
            </div>
            <div className={styles.footerCopy}>
                <div className={styles.footerContainer}>
                    <p>&copy; 2021 Dummy Company. <a href="/">Privacy and Cookies</a></p>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;