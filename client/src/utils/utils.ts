export const formatDateTime = function(date: string) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  return new Date(date).toLocaleDateString(
    "fi-FI", dateOptions
  )
}

export const formatDate = function(date: string) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }

  return new Date(date).toLocaleDateString(
    "fi-FI", dateOptions
  )
}
