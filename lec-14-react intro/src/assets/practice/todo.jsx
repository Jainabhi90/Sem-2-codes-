import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const [removeMode, setRemoveMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [lastDeleted, setLastDeleted] = useState([]);

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD
  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: input,
        completed: false,
        createdAt: Date.now(),
      },
    ]);

    setInput("");
  };

  // COMPLETE
  const toggleTodo = (id) => {
    if (removeMode) return;

    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const updated = { ...t, completed: !t.completed };

          if (!t.completed && updated.completed) {
            confetti({
              particleCount: 80,
              spread: 70,
            });
          }

          return updated;
        }
        return t;
      })
    );
  };

  // SELECT
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelected(todos.map((t) => t.id));
  };

  // DELETE
  const removeSelected = () => {
    const deleted = todos.filter((t) =>
      selected.includes(t.id)
    );

    setLastDeleted(deleted);
    setTodos(todos.filter((t) => !selected.includes(t.id)));
    setSelected([]);
    setRemoveMode(false);
  };

  // UNDO
  const undoDelete = () => {
    setTodos([...todos, ...lastDeleted]);
    setLastDeleted([]);
  };

  // COMPLETE ALL
  const completeAll = () => {
    setTodos(todos.map((t) => ({ ...t, completed: true })));
  };

  // DRAG
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  const filtered = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div style={bg}>
      <div style={card}>
        <h2>To-Do List 📋</h2>

        {/* INPUT */}
        <div style={inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add your task"
            style={inputStyle}
          />

          <button style={addBtn} onClick={addTodo}>
            ADD
          </button>

          {!removeMode ? (
            <button style={removeBtn} onClick={() => setRemoveMode(true)}>
              Remove
            </button>
          ) : (
            <button style={confirmBtn} onClick={removeSelected}>
              ✔
            </button>
          )}
        </div>

        {/* FILTER */}
        <div style={filterRow}>
          {["all", "completed", "pending"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                ...filterBtn,
                background: filter === type ? "#ff5a4f" : "#eee",
                color: filter === type ? "white" : "#333",
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* ACTION */}
        <div style={{ marginTop: "10px" }}>
          {removeMode ? (
            <button style={smallBtn} onClick={selectAll}>
              Select All
            </button>
          ) : (
            <button style={smallBtn} onClick={completeAll}>
              Complete All
            </button>
          )}
        </div>

        {/* UNDO */}
        {lastDeleted.length > 0 && (
          <button style={undoBtn} onClick={undoDelete}>
            Undo Delete
          </button>
        )}

        {/* LIST */}
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveId(e.active.id)}
          onDragEnd={(e) => {
            handleDragEnd(e);
            setActiveId(null);
          }}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext
            items={filtered.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              {filtered.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  toggleSelect={toggleSelect}
                  removeMode={removeMode}
                  selected={selected}
                />
              ))}
            </ul>
          </SortableContext>

          <DragOverlay adjustScale={false}>
            {activeId ? (
              <div style={dragOverlay}>
                {todos.find((t) => t.id === activeId)?.text}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

// ITEM
function SortableItem({
  todo,
  toggleTodo,
  toggleSelect,
  removeMode,
  selected,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    disabled: removeMode,
  });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
        borderBottom: "1px solid #eee",
        opacity: isDragging ? 0 : 1,
      }}
    >
      <div
        onClick={() =>
          removeMode
            ? toggleSelect(todo.id)
            : toggleTodo(todo.id)
        }
        style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}
      >
        <div style={checkbox(todo.completed)}>
          {todo.completed ? "✓" : ""}
        </div>

        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <span onClick={() => toggleSelect(todo.id)}>✕</span>

        {!removeMode && (
          <span {...listeners} style={{ cursor: "grab" }}>
            ≡
          </span>
        )}
      </div>
    </li>
  );
}

// STYLES
const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1e1b4b, #312e81)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  width: "400px",
};

const inputRow = { display: "flex", gap: "10px" };

const inputStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "20px",
  border: "none",
  background: "#eee",
};

const addBtn = {
  background: "#ff5a4f",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "10px",
};

const removeBtn = {
  background: "#999",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "10px",
};

const confirmBtn = {
  background: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "10px",
};

const filterRow = { display: "flex", gap: "10px", marginTop: "10px" };

const filterBtn = {
  flex: 1,
  padding: "8px",
  borderRadius: "20px",
  border: "none",
};

const smallBtn = {
  marginTop: "10px",
  padding: "8px",
  borderRadius: "10px",
};

const undoBtn = {
  marginTop: "10px",
  background: "#facc15",
  padding: "8px",
  border: "none",
};

const checkbox = (done) => ({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  border: "2px solid #ccc",
  background: done ? "#ff5a4f" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

const dragOverlay = {
  padding: "12px",
  borderRadius: "10px",
  background: "#ff5a4f",
  color: "white",
};