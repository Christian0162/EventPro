import { Navigate } from "react-router-dom";

export default function HomePage({ user }) {
    if (user) {
        return <Navigate to={'/dashboard'} />
    }
    return (
        <>
            <div>HELLO</div>
        </>
    );
}