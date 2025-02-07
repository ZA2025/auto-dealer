import styles from './Banner.module.scss';
const Banner = () => {
    return (
        <div className="banner">
            <div className={styles.bannerImageContainer}>
                <picture>
                    <source srcSet="/images/cars.jpg" type="image/webp" />
                    <img src="/images/car.webp" alt="Banner" className={styles.bannerImage} />
                </picture>
                <div className={styles.bannerTitleContainer}>
                    <h1 className={styles.bannerTitle}>Lorem ipsum dolor sit amet</h1>
                    <a href='/newsletter' className={styles.bannerButton}>Keep me informed</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;