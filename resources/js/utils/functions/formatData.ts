import moment from "moment";

export const formatDate = (createdAt: string) => {
    if (createdAt == null) return 'Not Specify';

    return moment(createdAt).format('MMMM D, YYYY hA');
}   