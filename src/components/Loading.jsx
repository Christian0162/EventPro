import { SyncLoader } from "react-spinners"

export default  function Loading () {
    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
            <SyncLoader color="#1d5cc7"/>
        </div>
        </>
    )
}