export default function Card({title, content, color}) {
    return (
        <div className={`bg-gray-800 p-6 rounded-lg ${color} shadow-md`}>
            <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
            <p className="text-white">{content}</p>
        </div>
    );
}