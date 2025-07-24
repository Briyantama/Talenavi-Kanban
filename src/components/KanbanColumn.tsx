// KanbanColumn.tsx
import { useState } from "react";
import type { Data } from "../types";
import { Draggable, type DroppableProvidedProps } from "@hello-pangea/dnd";
import CardKanban from "./CardKanban";

interface KanbanColumnProps {
  title: string;
  tasks: Data[];
  innerRef: React.Ref<HTMLDivElement>;
  droppableProps: DroppableProvidedProps;
  children: React.ReactNode;
}

function KanbanColumn({
  title,
  tasks,
  innerRef,
  droppableProps,
  children,
}: KanbanColumnProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const headerBg = {
    "In Progress": "bg-blue-500 text-white",
    "Ready to start": "bg-green-500 text-white",
    "Waiting for review": "bg-yellow-500 text-white",
    Done: "bg-gray-500 text-white",
    Stuck: "bg-red-500 text-white",
    "Pending Deploy": "bg-purple-500 text-white",
  }[title] ?? "bg-gray-200 text-gray-800";

  return (
    <div
      className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border border-gray-300 shadow-md rounded-xl p-0 w-full h-fit flex-shrink-0"
      ref={innerRef}
      {...droppableProps}
    >
      <div
        className={`${headerBg} rounded-t-xl px-4 py-2 flex justify-between items-center`}
      >
        <h2 className="font-bold text-sm">
          {title} <span className="text-xs opacity-75">({tasks.length})</span>
        </h2>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-xs underline opacity-90 hover:opacity-100"
        >
          {isMinimized ? "Expand" : "Collapse"}
        </button>
      </div>

      {!isMinimized && (
        <div className="p-4 space-y-3">
          {tasks.map((task, index) => (
            <Draggable key={task.title} draggableId={task.title} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <CardKanban {...task} />
                </div>
              )}
            </Draggable>
          ))}
          {children}
        </div>
      )}
    </div>
  );
}

export default KanbanColumn;
