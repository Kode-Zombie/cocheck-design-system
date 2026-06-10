export type OwnerScheduleAssignment = {
  adminComment?: string;
  completed?: boolean;
  dayIndex: number;
  employee: string;
  store: string;
  startHour: number;
  endHour: number;
  endLabel?: string;
  tone: 'primary' | 'success' | 'warning';
};

export function filterOwnerScheduleAssignmentsByEmployee(assignments: OwnerScheduleAssignment[], query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return assignments;
  }

  return assignments.filter((assignment) => (
    assignment.employee.toLocaleLowerCase().includes(normalizedQuery)
  ));
}
