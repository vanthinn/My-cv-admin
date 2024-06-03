import BaseURLUpLoadFile from "@utils/api/BaseURLUploadFile";

export const postImage = (data: any) => {
    return BaseURLUpLoadFile({
        url: `/images`,
        method: "POST",
        data,
    });
}
