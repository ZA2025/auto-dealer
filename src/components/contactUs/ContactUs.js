import styles from './ContactUs.module.scss';
import Link from 'next/link';

const ContactUs = () => {
    return (
        <>
            <section className={styles.contactUs}>
                <div className="inner-section">
                    <h2>Bereit für die Straße? Wir sind es auch!</h2>
                    <p>Haben Sie Fragen, Wünsche oder sonstige Anliegen? Nehmen Sie Kontakt mit uns auf über unser Kontaktformular, rufen Sie uns an oder schreiben Sie uns eine kurze Mail. Wir melden uns in Kürze bei Ihnen zurück, um mehr über Ihr Vorhaben zu erfahren und Sie diesbezüglich fachgerecht zu beraten.
                    </p>
                    <Link href={`/contact`} className={styles.contactUsButton}>Contact Us Now</Link>
                </div>
            </section>
        </>
    )
}

export default ContactUs;