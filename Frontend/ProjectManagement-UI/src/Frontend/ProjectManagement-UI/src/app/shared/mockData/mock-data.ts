import type { Employee, Project, Task, Bug, User } from "./types";

export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: "u1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "admin",
  },
  tl: {
    id: "u2",
    name: "Marcus Reed",
    email: "marcus.reed@company.com",
    role: "tl",
  },
  developer: {
    id: "u3",
    name: "Priya Patel",
    email: "priya.patel@company.com",
    role: "developer",
  },
  tester: {
    id: "u4",
    name: "Jordan Kim",
    email: "jordan.kim@company.com",
    role: "tester",
  },
};

export const ALL_SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "Java", "AWS", "Docker",
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST API",
  "Cypress", "Selenium", "Jest", "Manual QA", "UI/UX", "Figma",
];

export const EMPLOYEES: Employee[] = [
  { id: "e1", name: "Priya Patel", email: "priya@co.com", role: "developer", skills: ["React", "TypeScript", "Node.js"], availability: 20, utilization: 92 },
  { id: "e2", name: "Liam O'Brien", email: "liam@co.com", role: "developer", skills: ["Python", "AWS", "Docker"], availability: 60, utilization: 65 },
  { id: "e3", name: "Mei Tanaka", email: "mei@co.com", role: "developer", skills: ["React", "GraphQL", "PostgreSQL"], availability: 40, utilization: 78 },
  { id: "e4", name: "Carlos Mendez", email: "carlos@co.com", role: "developer", skills: ["Java", "Kubernetes", "REST API"], availability: 100, utilization: 30 },
  { id: "e5", name: "Aisha Khan", email: "aisha@co.com", role: "developer", skills: ["TypeScript", "Node.js", "MongoDB"], availability: 10, utilization: 95 },
  { id: "e6", name: "Jordan Kim", email: "jordan@co.com", role: "tester", skills: ["Cypress", "Jest", "Manual QA"], availability: 50, utilization: 70 },
  { id: "e7", name: "Elena Rossi", email: "elena@co.com", role: "tester", skills: ["Selenium", "Manual QA"], availability: 80, utilization: 45 },
  { id: "e8", name: "Noah Wright", email: "noah@co.com", role: "tester", skills: ["Cypress", "Selenium", "Jest"], availability: 5, utilization: 98 },
  { id: "e9", name: "Marcus Reed", email: "marcus@co.com", role: "tl", skills: ["React", "Node.js", "AWS"], availability: 30, utilization: 80 },
  { id: "e10", name: "Sofia Lindberg", email: "sofia@co.com", role: "developer", skills: ["UI/UX", "Figma", "React"], availability: 70, utilization: 55 },
];

export const PROJECTS: Project[] = [
  {
    id: "p1", name: "Atlas Payment Gateway", description: "Next-gen payment processing platform with multi-currency support.",
    status: "active", priority: "high", progress: 68, deadline: "2026-06-15", estimatedHours: 1200,
    requiredSkills: ["React", "Node.js", "PostgreSQL"],
    assignedTo: [{ employeeId: "e1", hours: 120 }, { employeeId: "e3", hours: 100 }, { employeeId: "e6", hours: 60 }],
    lead: "e9",
  },
  {
    id: "p2", name: "Helios Analytics Dashboard", description: "Real-time business intelligence dashboard.",
    status: "active", priority: "medium", progress: 42, deadline: "2026-07-20", estimatedHours: 800,
    requiredSkills: ["React", "GraphQL", "TypeScript"],
    assignedTo: [{ employeeId: "e3", hours: 80 }, { employeeId: "e5", hours: 90 }],
    lead: "e9",
  },
  {
    id: "p3", name: "Orion Mobile Banking", description: "Cross-platform mobile banking application.",
    status: "active", priority: "high", progress: 25, deadline: "2026-05-10", estimatedHours: 1500,
    requiredSkills: ["React", "Node.js", "AWS"],
    assignedTo: [{ employeeId: "e1", hours: 100 }, { employeeId: "e2", hours: 80 }, { employeeId: "e8", hours: 70 }],
    lead: "e9",
  },
  {
    id: "p4", name: "Vega Internal Tools", description: "Suite of internal admin and ops tools.",
    status: "planning", priority: "low", progress: 8, deadline: "2026-09-01", estimatedHours: 600,
    requiredSkills: ["TypeScript", "REST API"],
    assignedTo: [{ employeeId: "e4", hours: 40 }],
    lead: "e9",
  },
  {
    id: "p5", name: "Nova Customer Portal", description: "Self-service customer portal redesign.",
    status: "completed", priority: "medium", progress: 100, deadline: "2026-04-01", estimatedHours: 700,
    requiredSkills: ["React", "UI/UX"],
    assignedTo: [{ employeeId: "e10", hours: 200 }],
    lead: "e9",
  },
  {
    id: "p6", name: "Pulse Notification Service", description: "Unified notifications across email, SMS, push.",
    status: "on-hold", priority: "low", progress: 35, deadline: "2026-08-15", estimatedHours: 500,
    requiredSkills: ["Node.js", "AWS"],
    assignedTo: [{ employeeId: "e2", hours: 60 }],
    lead: "e9",
  },
];

export const TASKS: Task[] = [
  { id: "t1", title: "Implement Stripe webhook handler", projectId: "p1", assigneeId: "e1", status: "in-progress", priority: "high", dueDate: "2026-05-02", estimatedHours: 16 },
  { id: "t2", title: "Build refund flow UI", projectId: "p1", assigneeId: "e1", status: "todo", priority: "high", dueDate: "2026-05-08", estimatedHours: 20 },
  { id: "t3", title: "Optimize chart rendering performance", projectId: "p2", assigneeId: "e3", status: "review", priority: "medium", dueDate: "2026-05-05", estimatedHours: 12 },
  { id: "t4", title: "Set up CI pipeline", projectId: "p3", assigneeId: "e2", status: "done", priority: "medium", dueDate: "2026-04-20", estimatedHours: 8 },
  { id: "t5", title: "Mobile login screen", projectId: "p3", assigneeId: "e1", status: "in-progress", priority: "high", dueDate: "2026-05-04", estimatedHours: 14 },
  { id: "t6", title: "API rate limiting", projectId: "p1", assigneeId: "e5", status: "todo", priority: "medium", dueDate: "2026-05-12", estimatedHours: 10 },
  { id: "t7", title: "Internal tools — user list", projectId: "p4", assigneeId: "e4", status: "todo", priority: "low", dueDate: "2026-06-01", estimatedHours: 18 },
  { id: "t8", title: "Notification template editor", projectId: "p6", assigneeId: "e2", status: "in-progress", priority: "low", dueDate: "2026-05-20", estimatedHours: 15 },
];

export const BUGS: Bug[] = [
  { id: "b1", title: "Payment confirmation email not sent", projectId: "p1", reportedBy: "e6", assigneeId: "e1", severity: "high", status: "pending", createdAt: "2026-04-22" },
  { id: "b2", title: "Dashboard chart misaligned on Safari", projectId: "p2", reportedBy: "e7", assigneeId: "e3", severity: "low", status: "passed", createdAt: "2026-04-20" },
  { id: "b3", title: "Login session expires too quickly", projectId: "p3", reportedBy: "e8", assigneeId: "e1", severity: "medium", status: "failed", createdAt: "2026-04-23" },
  { id: "b4", title: "Currency conversion off by 0.01", projectId: "p1", reportedBy: "e6", assigneeId: "e5", severity: "high", status: "pending", createdAt: "2026-04-24" },
  { id: "b5", title: "Tooltip overflows on small screens", projectId: "p2", reportedBy: "e7", assigneeId: "e3", severity: "low", status: "passed", createdAt: "2026-04-18" },
  { id: "b6", title: "Push notifications duplicated", projectId: "p6", reportedBy: "e8", assigneeId: "e2", severity: "medium", status: "failed", createdAt: "2026-04-25" },
];
