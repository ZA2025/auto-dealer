import Subscribe from "@/components/subscribe/Subscribe";
import styles from "./Newsletter.module.scss";

const NewsLetterPage = () => {
    return (
        <div className={styles.newsletterPage}>
            <div className={styles.newsletterPageContent}>
                <h1>Newsletter Page</h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                <Subscribe />
            </div>
        </div>
    );
};

export default NewsLetterPage;