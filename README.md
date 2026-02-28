# 📋 Task Manager — Patrones de Diseño

Sistema de gestión de tareas desarrollado en JavaScript que implementa tres patrones de diseño: **Singleton**, **Observer** y **Factory Method**.

---

## 🏗️ Patrones Implementados

| Patrón | Archivo | Rol |
|---|---|---|
| Singleton | `src/TaskManager.js` | Instancia única del gestor de tareas |
| Observer | `src/TaskManager.js` + `src/NotificationService.js` | Notificaciones automáticas ante eventos |
| Factory Method | `src/TaskFactory.js` | Creación estandarizada de tareas por categoría |

---

## 📁 Estructura del Proyecto

```
task-manager-js/
├── src/
│   ├── types.js               # Constantes de tipos y categorías
│   ├── TaskFactory.js         # Patrón Factory Method
│   ├── TaskManager.js         # Patrón Singleton + Observer (sujeto)
│   ├── NotificationService.js # Patrón Observer (observadores concretos)
│   └── index.js               # Punto de entrada y demostración
├── package.json
└── README.md
```

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org) v18 o superior
- npm v9 o superior (incluido con Node.js)

---

## 🚀 Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/[tu-usuario]/task-manager-design-patterns.git

# 2. Ingresar al directorio
cd task-manager-design-patterns

# 3. Ejecutar la demostración
node src/index.js
```

---

## 🖥️ Salida Esperada

```
¿Singleton (misma instancia)? true

══════════ CREANDO TAREAS (Factory Method) ══════════

[10:30:01] [LOG] "task-created" → Revisar informe Q3 (TASK-1-...)
📱 [Admin] Nueva tarea asignada: "Revisar informe Q3"
[10:30:01] [LOG] "task-created" → Servidor caído en producción (TASK-3-...)

⚠️  ALERTA URGENTE: "Servidor caído en producción" requiere atención inmediata!

📱 [Admin] Nueva tarea asignada: "Servidor caído en producción"

══════════ ACTUALIZANDO ESTADOS ══════════

[10:30:01] [LOG] "task-completed" → Servidor caído en producción (TASK-3-...)
📱 [Admin] Tarea completada: "Servidor caído en producción"

══════════ REPORTE FINAL ══════════

  TASK-1-... | [WORK] Revisar informe Q3
  Estado: in-progress | Prioridad: medium

  TASK-2-... | [PERSONAL] Comprar suministros
  Estado: pending | Prioridad: low

  TASK-3-... | [URGENT] Servidor caído en producción
  Estado: completed | Prioridad: urgent

  TASK-4-... | [PROJECT] Diseñar módulo de pagos
  Estado: pending | Prioridad: high
```

---

## 🎨 Frontend Visual

Abre el archivo `task-manager-frontend.html` directamente en cualquier navegador para ver la interfaz interactiva con:

- Panel explicativo de cada patrón de diseño con fragmentos de código
- Log en tiempo real del patrón Observer
- CRUD completo de tareas
- Filtros por estado y categoría
- Estadísticas en vivo

---

## 📐 Descripción de los Patrones

### Singleton — `TaskManager`

```js
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
}
```

Garantiza una única instancia del gestor en toda la aplicación. Todos los módulos acceden al mismo conjunto de tareas.

---

### Observer — `NotificationService`

```js
// Sujeto notifica a todos los observadores
_notify(event, task) {
  this.observers.forEach(o => o.update(event, task));
}

// Observadores concretos
class ConsoleLogger       { update(event, task) { /* log */ } }
class UrgencyAlertObserver{ update(event, task) { /* alerta */ } }
class PushNotificationObserver { update(event, task) { /* push */ } }
```

Desacopla las notificaciones de la lógica central. Nuevos canales se agregan sin modificar `TaskManager`.

---

### Factory Method — `TaskFactory`

```js
class TaskFactory {
  static create(category, title, description, dueDate, assignedTo) {
    const creators = {
      personal : new PersonalTaskCreator(),  // priority: 'low'
      work     : new WorkTaskCreator(),       // priority: 'medium'
      project  : new ProjectTaskCreator(),    // priority: 'high'
      urgent   : new UrgentTaskCreator(),     // priority: 'urgent', 24h auto
    };
    return creators[category].create(title, description, dueDate, assignedTo);
  }
}
```

Centraliza la creación de tareas con reglas de negocio predefinidas por categoría.

---

## 📚 Referencias

- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns*. Addison-Wesley.
- Freeman, E., & Robson, E. (2020). *Head First Design Patterns* (2nd ed.). O'Reilly.
- [Refactoring.Guru — Design Patterns](https://refactoring.guru/design-patterns)

---

## 📄 Licencia

MIT © 2026
