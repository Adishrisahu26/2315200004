const priorityMap = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4
};

const prioritySort = {
  sortByPriority: (notifications) => {
    return notifications.sort((a, b) => {
      const priorityA = priorityMap[a.priority.toLowerCase()] || 5;
      const priorityB = priorityMap[b.priority.toLowerCase()] || 5;
      return priorityA - priorityB;
    });
  },

  getPriorityLevel: (priority) => {
    return priorityMap[priority.toLowerCase()] || 5;
  }
};

module.exports = prioritySort;
