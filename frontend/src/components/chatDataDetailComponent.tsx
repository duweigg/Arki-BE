interface ChatDataDetailComponentProps {
    title: string;
    data: string;
    subData: string;
}
export const ChatDataDetailComponent = (data: ChatDataDetailComponentProps) => {
    return (
        <div>
            <div className="text-gray-400 mb-3">
                {data.title}
            </div>
            <div className="text-2xl font-semibold">
                {data.data}
            </div>
            <div className="text-gray-500">
                {data.subData}
            </div>
        </div>
    )
}