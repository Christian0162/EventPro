export default function PrimaryButton({ onClick, children }) {
    return (
        <>
            <button className="py-2 w-full text-white rounded-md bg-blue-600 hover:bg-blue-700 font-bold" onClick={onClick} type="submit">{children}</button>
        </>
    )
}