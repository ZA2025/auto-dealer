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
                    <h2 className={styles.footerTitle}>Section 1</h2>
                    <ul className={styles.footerLinks}>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Home</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/contact'>Contact</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/about'>About</Link></li>
                    </ul>
                </section>
                <section className={styles.footerItem}>
                    <h2 className={styles.footerTitle}>Section 2</h2>
                    <ul className={styles.footerLinks}>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>FAQ</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Cars</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Used Cars</Link></li>
                    </ul>
                </section>
                <section className={styles.footerItem}>
                    <h2 className={styles.footerTitle}>Section 3</h2>
                    <ul className={styles.footerLinks}>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Link 7</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Link 8</Link></li>
                        <li className={styles.footerLink}><Link className={styles.footerLinkTag} href='/'>Link 9</Link></li>
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