import "./App.css";
import { useState, useEffect } from "react";
import type { Data } from "./types";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import useData from "./hooks/useData";
import KanbanColumn from "./components/KanbanColumn";

const COLUMN_ORDER = [
  "In Progress",
  "Ready to start",
  "Waiting for review",
  "Done",
  "Stuck",
  "Pending Deploy",
];

function App() {
  const [loading, error, data] = useData();
  const [taskList, setTaskList] = useState<Data[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data?.data) {
      setTaskList(data.data);
    }
  }, [data]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;


  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; 
    if (source.droppableId === destination.droppableId) return;

    setTaskList((prev) =>
      prev.map((task) =>
        task.title === draggableId
          ? { ...task, status: destination.droppableId as Data["status"] }
          : task
      )
    );
  };

  const filtered = taskList.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = COLUMN_ORDER.map((status) => ({
    status,
    tasks: filtered.filter((t) => t.status === status),
  }));

  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <div className="mb-6 w-full">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)}
          }
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
          {grouped.map(({ status, tasks }) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <KanbanColumn
                  title={status}
                  tasks={tasks}
                  innerRef={provided.innerRef}
                  droppableProps={provided.droppableProps}
                >
                  {provided.placeholder}
                </KanbanColumn>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;