function dateFormat(data) {
  const newBlogs = {
    ...data,
    date: data.date.toISOString,
    newDate: data.date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  return newBlogs;
}

module.exports = dateFormat;
