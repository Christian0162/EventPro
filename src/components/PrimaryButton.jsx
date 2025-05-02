export default function PrimaryButton({ context, handleClick }) {
    return (
        <>
            <button className="py-2 px-3 w-full text-white mt-5 rounded-md bg-blue-600 hover:bg-blue-700" onClick={handleClick} type="submit">{context}</button>
        </>
    )
}