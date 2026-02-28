// =============================================
// NotificationService.js – Patrón Observer
// =============================================
// Observadores concretos que reaccionan a eventos del sistema
// sin estar acoplados directamente a TaskManager.

class ConsoleLogger {
  update(event, task) {
    const ts = new Date().toLocaleTimeString("es-CO");
    console.log(`[${ts}] [LOG] "${event}" → ${task.title} (${task.id})`);
  }
}

class UrgencyAlertObserver {
  update(event, task) {
    if (task.priority === "urgent" || task.category === "urgent") {
      console.warn(`\n⚠️  ALERTA URGENTE: "${task.title}" requiere atención inmediata!\n`);
    }
  }
}

class PushNotificationObserver {
  constructor(userName) { this.userName = userName; }
  update(event, task) {
    if (event === "task-completed") {
      console.log(`📱 [${this.userName}] Tarea completada: "${task.title}"`);
    } else if (event === "task-created") {
      console.log(`📱 [${this.userName}] Nueva tarea asignada: "${task.title}"`);
    }
  }
}

module.exports = { ConsoleLogger, UrgencyAlertObserver, PushNotificationObserver };
