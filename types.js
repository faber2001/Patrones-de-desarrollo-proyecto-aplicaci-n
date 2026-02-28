// ==============================================
// types.js – Constantes de tipos del sistema
// ==============================================
const TaskPriority = { LOW: "low", MEDIUM: "medium", HIGH: "high", URGENT: "urgent" };
const TaskStatus   = { PENDING: "pending", IN_PROGRESS: "in-progress", COMPLETED: "completed", CANCELLED: "cancelled" };
const TaskCategory = { PERSONAL: "personal", WORK: "work", PROJECT: "project", URGENT: "urgent" };

module.exports = { TaskPriority, TaskStatus, TaskCategory };
