import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const formatDayVN = (dateTime: string): string => {
    var myDate = new Date(dateTime)
    myDate.setMinutes(myDate.getMinutes())
    const originalTime = dayjs(myDate).format('DD/MM/YYYY');
    return originalTime.toString()
}

export const formatDateFormDateLocal = (dateTime: string): string => {
    const formattedDate = dayjs(dateTime).locale('vi').format('DD-MM-YYYY');
    return formattedDate
}

export const formatDateLocal = (dateTime: string): string => {
    const yourTime = new Date(dateTime)
    return yourTime.toISOString()
}

export const formatDateLocalV2 = (dateTime: string): string => {
    const dateObject = dayjs(dateTime);
    const formattedDate = dateObject.format('DD-MM-YYYY HH:mm');
    return formattedDate;
}

export const formatDateTimeLocal = (dateTime: string): string => {
    const formattedTime = dayjs(dateTime).utc().format();
    return formattedTime;
}

export const formatToMonthYear = (dateTime: string | Date): string => {
    return dayjs(dateTime).format('MM/YYYY');
}


export const dayComparedToThePast = (dateTime: string): string => {
    const now = dayjs();
    const inputDate = dayjs(dateTime);
    const diff = now.diff(inputDate, 'minute');
    let output: string;
    if (diff > 24 * 60) {
        const diffInDays = Math.floor(diff / (24 * 60));
        output = `${diffInDays} day ago`;
    } else if (diff > 60) {
        const diffInHours = Math.floor(diff / 60);
        output = `${diffInHours} hours ago`;
    } else if (diff < 2) {
        output = `just finished`
    } else {
        output = `${diff} hours ago`;
    }
    return output;
}

export function daysUntil(targetDateStr: string): number {
    const targetDate = new Date(targetDateStr);

    if (isNaN(targetDate.getTime())) {
        throw new Error('Invalid date format.');
    }

    const today = new Date();

    const remainingDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return remainingDays;
}


