import Link from "next/link"
export default function NotFound() {
    return (
        <div>
            <div className="inner-section">
                <h1>404 Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}