// =============================================
// TaskManager.js – Patrón Singleton + Observer
// =============================================
// Singleton:  Una sola instancia controla todas las tareas.
// Observer:   Notifica automáticamente a los suscriptores.

class TaskManager {
  constructor() {
    if (TaskManager._instance) return TaskManager._instance;
    this.tasks     = new Map();
    this.observers = [];
    TaskManager._instance = this;
  }

  static getInstance() {
    return TaskManager._instance || new TaskManager();
  }

  // ── Observer ───────────────────────────────────────────────
  subscribe(observer)   { this.observers.push(observer); }
  unsubscribe(observer) { this.observers = this.observers.filter(o => o !== observer); }

  _notify(event, task) {
    this.observers.forEach(o => o.update(event, task));
  }

  // ── CRUD ───────────────────────────────────────────────────
  addTask(task) {
    this.tasks.set(task.id, task);
    this._notify("task-created", task);
    return task;
  }

  updateStatus(taskId, newStatus) {
    const task = this.tasks.get(taskId);
    if (!task) return null;
    task.status = newStatus;
    this._notify(newStatus === "completed" ? "task-completed" : "task-updated", task);
    return task;
  }

  deleteTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) return false;
    this.tasks.delete(taskId);
    this._notify("task-deleted", task);
    return true;
  }

  getAll()              { return Array.from(this.tasks.values()); }
  getById(id)           { return this.tasks.get(id); }
  getByStatus(status)   { return this.getAll().filter(t => t.status === status); }
  getByCategory(cat)    { return this.getAll().filter(t => t.category === cat); }
}

module.exports = { TaskManager };
