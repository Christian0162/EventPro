import { Navigate } from "react-router-dom";
import { Title } from "react-head";
import NavBar from "../components/NavBar";
import UploadWidget from "../components/UploadWidgen";
import UserDropdown from "../components/UserDropdown";
import DropDown from "../components/DropDown";

export default function HomePage({ user }) {

    if (user) {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <>  
            <div className="min-h-screen">
                <NavBar user={user}/>
                <div>
                    <UserDropdown />
                    <DropDown />
                </div>
            </div>
        </>
    );
}