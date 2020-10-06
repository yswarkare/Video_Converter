import {
    Get_Error, 
    Upload_Video,
    Set_Ouptput_Size,
    Convert_Video,
    Download_Video,
    Change_Uploading_Status,
    Change_Converting_Status,
    Change_Uploaded_Status,
    Change_Converted_Status } from "./action_types";
import { api, formApi } from "./axios_defaults";


export const changeUpdatingStatus = (status) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Uploading_Status,
            payload: status
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Change_Uploading_Status
        })
    }   
}

export const changeConvertingStatus = (status) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Converting_Status,
            payload: status
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Change_Converting_Status
        })
    }   
}

export const changeUploadedStatus = (status) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Uploaded_Status,
            payload: status
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Change_Uploaded_Status
        })
    }   
}

export const changeConvertedStatus = (status) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Converted_Status,
            payload: status
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Change_Converted_Status
        })
    }   
}

export const uploadVideo = (file) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Uploading_Status,
            payload: true
        })
        let filesData = new FormData();
        filesData.append("file", file);
        let uploadProgress = 0;
        let res = await formApi.post("/convert/upload-video", filesData, {
            onUploadProgress: (progressEvent) => {
                uploadProgress = Math.floor((progressEvent.loaded / progressEvent.total)*100);
        }});
        await dispatch({
            type: Upload_Video,
            payload: res,
            uploadProgress: uploadProgress
        });
        await dispatch({
            type: Change_Uploading_Status,
            payload: false
        });
        await dispatch({
            type: Change_Uploaded_Status,
            payload: true
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Upload_Video
        })
    }
}

export const setOutputSize = (size) => async (dispatch) => {
    try {
        dispatch({
            type: Set_Ouptput_Size,
            payload: size
        })
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Set_Ouptput_Size
        })
    }
}

export const convertVideo = (fileInfo) => async (dispatch) => {
    try {
        await dispatch({
            type: Change_Converting_Status,
            payload: true
        })
        let res = await api.post("/convert/resize-video", fileInfo);
        await dispatch({
            type: Convert_Video,
            payload: res
        });
        await dispatch({
            type: Change_Converting_Status,
            payload: false
        });
        await dispatch({
            type: Change_Converted_Status,
            payload: true
        });
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Convert_Video
        })
    }
}

export const downloadVideo = (fileInfo) => async (dispatch) => {
    try {
        let res = await api.patch("/convert/download-video", fileInfo, {
            responseType: 'blob',
          });
        let downloadVideo_01 = (blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
              new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `${fileInfo.filename}`,
            );
        
            // Append to html link element page
            document.body.appendChild(link);
        
            // Start download
            link.click();
        
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }
        await downloadVideo_01(res.data);
        await dispatch({
            type: Download_Video,
            payload: res
        });
    } catch (err) {
        let error = {...err};
        console.log({error});
        dispatch({
            type: Get_Error,
            payload: error,
            message: Download_Video
        })
    }
}