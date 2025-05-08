export default function PrimaryButton({ onClick, children }) {
    return (
        <button className="py-2 w-full transition-all duration-200 text-white rounded-md bg-blue-600 hover:bg-blue-700" onClick={onClick} type="submit">{children}</button>
    )
}