// format the date for the application using handlebars
const format_date = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const formatMonths = months[date.getMonth()];

    return `${date.getDate()} ${formatMonths} ${date.getFullYear()}`
};

// format the plural so they are easier to deal with
const format_plural = (string, num) => {
    if (num === 1) {
        return string;
    } else {
        return `${string}s`;
    };
};

module.exports = { format_date, format_plural };