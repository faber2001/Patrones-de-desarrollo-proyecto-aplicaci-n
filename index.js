// =============================================
// index.js – Demo de la aplicación
// =============================================
const { TaskManager }    = require("./TaskManager");
const { TaskFactory }    = require("./TaskFactory");
const { ConsoleLogger, UrgencyAlertObserver, PushNotificationObserver } = require("./NotificationService");

// 1. Singleton ─ verificar instancia única
const mgr  = TaskManager.getInstance();
const mgr2 = TaskManager.getInstance();
console.log("¿Singleton (misma instancia)?", mgr === mgr2); // true

// 2. Observer ─ registrar observadores
mgr.subscribe(new ConsoleLogger());
mgr.subscribe(new UrgencyAlertObserver());
mgr.subscribe(new PushNotificationObserver("Admin"));

console.log("\n══════════════ CREANDO TAREAS ══════════════\n");

// 3. Factory Method ─ crear tareas por categoría
const t1 = mgr.addTask(TaskFactory.create("work",     "Revisar informe Q3",          "Aprobar informe trimestral",        new Date("2026-03-10"), "Ana García"));
const t2 = mgr.addTask(TaskFactory.create("personal", "Comprar suministros",          "Papel, bolígrafos, carpetas"));
const t3 = mgr.addTask(TaskFactory.create("urgent",   "Servidor caído en producción", "El servidor principal no responde", null,                  "Carlos Ruiz"));
const t4 = mgr.addTask(TaskFactory.create("project",  "Diseñar módulo de pagos",      "Integración pasarela de pagos",     new Date("2026-04-01"), "María López"));

console.log("\n══════════════ ACTUALIZANDO ESTADOS ════════════\n");
mgr.updateStatus(t3.id, "completed");
mgr.updateStatus(t1.id, "in-progress");

console.log("\n══════════════ REPORTE FINAL ════════════════\n");
mgr.getAll().forEach(t => {
  console.log(`  ${t.id} | [${t.category.toUpperCase()}] ${t.title}`);
  console.log(`       Estado: ${t.status} | Prioridad: ${t.priority}\n`);
});
