import { useState } from "react";
import { X } from "lucide-react";

const defaultState = {
  title: "",
  description: "",
  category: "Personal",
  priority: "Medium",
  dueDate: "",
  important: false,
};

export function TaskFormModal({ isOpen, onClose, onSubmit, initialTask }) {
  const [formData, setFormData] = useState(defaultState);
  const [errorMsg, setErrorMsg] = useState("");

  // State pembantu untuk mereset form tanpa menggunakan useEffect
  const [prevTask, setPrevTask] = useState(initialTask);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // TEKNIK REACT MODERN: Mereset state secara langsung tanpa useEffect
  // (Ini yang akan membungkam linter super ketat di VS Code kamu)
  if (initialTask !== prevTask || isOpen !== prevIsOpen) {
    setPrevTask(initialTask);
    setPrevIsOpen(isOpen);
    setErrorMsg("");

    if (initialTask && isOpen) {
      setFormData({
        title: initialTask.title || "",
        description: initialTask.description || "",
        category: initialTask.category || "Personal",
        priority: initialTask.priority || "Medium",
        dueDate: initialTask.dueDate || "",
        important: Boolean(initialTask.important),
      });
    } else {
      setFormData(defaultState);
    }
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg("Task title is required");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            {initialTask ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errorMsg && (
              <div
                style={{ color: "var(--danger-text)", fontSize: "0.825rem" }}
              >
                {errorMsg}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                id="title"
                name="title"
                className="input-control"
                placeholder="What needs to be done?"
                value={formData.title}
                maxLength={120}
                onChange={handleChange}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="textarea-control"
                rows={3}
                placeholder="Add details, notes, or links..."
                value={formData.description}
                maxLength={500}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="select-control"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Projects">Projects</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="select-control"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  className="input-control"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ justifyContent: "center" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    marginTop: "1.4rem",
                  }}
                >
                  <input
                    type="checkbox"
                    name="important"
                    checked={formData.important}
                    onChange={handleChange}
                    style={{ width: 16, height: 16 }}
                  />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Mark as Important
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
