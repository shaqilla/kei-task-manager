/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/storage";

const TaskContext = createContext();

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Review Q4 Architecture Plan",
    description:
      "Verify system decoupling and local state persistence strategies.",
    category: "Work",
    priority: "High",
    status: "In Progress",
    important: true,
    dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Complete UI Security Audit",
    description: "Audit inputs for sanitization and safe rendering practices.",
    category: "Projects",
    priority: "High",
    status: "Pending",
    important: true,
    dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() =>
    storage.get("kei_tasks", INITIAL_TASKS),
  );
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    storage.set("kei_tasks", tasks);
  }, [tasks]);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title.trim(),
      description: (taskData.description || "").trim(),
      category: taskData.category || "Other",
      priority: taskData.priority || "Medium",
      status: taskData.status || "Pending",
      important: Boolean(taskData.important),
      dueDate: taskData.dueDate || "",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast("Task created successfully", "success");
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
    showToast("Task updated", "success");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast("Task deleted", "danger");
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextStatus =
            task.status === "Completed" ? "Pending" : "Completed";
          return { ...task, status: nextStatus };
        }
        return task;
      }),
    );
  };

  const toggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task,
      ),
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
    showToast("All tasks cleared", "warning");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        toggleImportant,
        clearAllTasks,
        toasts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
