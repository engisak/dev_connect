/**
 * Utility functions for formatting strings, dates, and tech stacks
 */

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export const parseTechStack = (techStackString) => {
  if (!techStackString) return []
  return techStackString
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
