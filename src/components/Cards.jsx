export default function Cards({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}>
            {children}
        </div>
    )
};