import { priorityList } from '../constants/tasks.js';

const parsePriority = (priority) => {
  const isString = typeof priority === 'string';
  if (!isString) return;
  const isPriority = (priority) => priorityList.includes(priority);

  if (isPriority(priority)) return priority;
};

export const parseFilterParams = (query) => {
  const { priority } = query;

  const parsedPriority = parsePriority(priority);

  if (!parsedPriority) return {};

  return {
    priority: parsedPriority,
  };
};
