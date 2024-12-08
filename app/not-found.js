import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h1 >This page does not exist</h1>
            <button><Link href={"/"}>Go back to home</Link></button>
        </div>

    );
}