export default function DashboardCard({ title, numbers, days, icon }) {
    return (
        <>
            <div className="w-full h-full border-1 border-b-black rounded-md flex items-center justify-between p-10 px-[6rem]">
                <div className="flex flex-col space-y-1">
                    <span className="block text-lg">{title}</span>
                    <span className="block text-2xl font-bold">{numbers}</span>
                    <span className="block text-blue-600">{days}</span>
                </div>
                <span>{icon}</span>
            </div>
        </>
    )
}