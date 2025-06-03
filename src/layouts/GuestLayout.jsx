import NavBar from "../components/NavBar"

export default function GuestLayout({ children, user, userData }) {
    return (
        <div className="min-h-screen font-sans bg-gradient-to-br from-pink-50 via-white to-rose-50">
            <NavBar user={user} userData={userData} />
            {children}
        </div>
    )
}