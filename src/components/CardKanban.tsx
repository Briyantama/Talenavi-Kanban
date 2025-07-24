import type { Data } from "../types";

function CardKanban(props: Data) {
  const {
    title,
    developer,
    priority,
    status,
    type,
  } = props;

  const priorityColor = {
    "High": "text-red-500",
    "Medium": "text-yellow-600",
    "Low": "text-green-600",
    "Critical": "text-red-700",
    "Best Effort": "text-blue-600",
  }[priority] ?? "text-gray-600";

  const developers = developer.split(/,\s*/); 

  const getInitials = (name: string) =>
    name
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase())
      .join("");

  return (
    <div className="bg-gray-300 border-l-4 p-4 rounded-md shadow-sm hover:shadow-md transition-all">
      <h3 className="font-bold text-s text-black mb-1">{title}</h3>
      <div className="text-xs text-gray-500 mt-1">
        <div className="uppercase text-indigo-600">{type}</div>
        <div className={priorityColor}>{priority}</div>
      </div>
      <p className="text-xs mt-1 text-gray-500">
        <span className="text-gray-700">{status}</span>
      </p>

      <div className="mt-2 flex relative w-fit" style={{ height: 40 }}>
        {developers.map((dev, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-semibold border-2 border-white absolute"
            style={{
              left: index * 20, 
              top: index % 2 === 1 ? -8 : 0, 
              zIndex: developers.length - index, 
            }}
            title={dev.trim()}
          >
            {getInitials(dev)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardKanban
