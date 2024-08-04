const convertDateToYYYYMMDD = (dateString: string | undefined) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const convertTimeToHHMM = (timeString: string | undefined) => {
    return timeString.slice(0, 5);
}

export { convertDateToYYYYMMDD, convertTimeToHHMM }