// =============================================
// TaskFactory.js – Patrón Factory Method
// =============================================
// Centraliza la creación de tareas según su categoría,
// asignando prioridades y estados por defecto apropiados.

const { TaskPriority, TaskStatus } = require("./types");

let taskCounter = 0;
const generateId = () => `TASK-${++taskCounter}-${Date.now()}`;

// ── Creadores concretos ────────────────────────────────────────
class PersonalTaskCreator {
  create(title, description, dueDate) {
    return { id: generateId(), title, description, priority: TaskPriority.LOW,
      status: TaskStatus.PENDING, category: "personal", createdAt: new Date(), dueDate, assignedTo: null };
  }
}

class WorkTaskCreator {
  create(title, description, dueDate, assignedTo) {
    return { id: generateId(), title, description, priority: TaskPriority.MEDIUM,
      status: TaskStatus.PENDING, category: "work", createdAt: new Date(), dueDate, assignedTo };
  }
}

class ProjectTaskCreator {
  create(title, description, dueDate, assignedTo) {
    return { id: generateId(), title, description, priority: TaskPriority.HIGH,
      status: TaskStatus.PENDING, category: "project", createdAt: new Date(), dueDate, assignedTo };
  }
}

class UrgentTaskCreator {
  create(title, description, dueDate, assignedTo) {
    return { id: generateId(), title, description, priority: TaskPriority.URGENT,
      status: TaskStatus.IN_PROGRESS, category: "urgent", createdAt: new Date(),
      dueDate: dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000), assignedTo };
  }
}

// ── Factory principal ──────────────────────────────────────────
class TaskFactory {
  static create(category, title, description, dueDate = null, assignedTo = null) {
    const creators = {
      personal: new PersonalTaskCreator(),
      work:     new WorkTaskCreator(),
      project:  new ProjectTaskCreator(),
      urgent:   new UrgentTaskCreator(),
    };
    if (!creators[category]) throw new Error(`Categoría desconocida: ${category}`);
    return creators[category].create(title, description, dueDate, assignedTo);
  }
}

module.exports = { TaskFactory };
