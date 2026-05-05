export type Role = "admin" | "tl" | "developer" | "tester";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export type Priority = "high" | "medium" | "low";
export type ProjectStatus = "planning" | "active" | "on-hold" | "completed";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TestStatus = "pending" | "passed" | "failed";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  skills: string[];
  availability: number; // 0-100 %
  utilization: number; // 0-100 %
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  deadline: string;
  estimatedHours: number;
  requiredSkills: string[];
  requiredDevelopers?: number;
  requiredTesters?: number;
  assignedTo: { employeeId: string; hours: number }[];
  lead: string;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  assigneeId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  estimatedHours: number;
}

export interface Bug {
  id: string;
  title: string;
  projectId: string;
  reportedBy: string;
  assigneeId: string;
  severity: Priority;
  status: TestStatus;
  createdAt: string;
}
