import { formatRelative } from "date-fns";

const formatDate = (second) => {
    let formattedDate = "";
    if (second) {
        formattedDate = formatRelative(new Date(second), new Date());

        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};

export default formatDate;
