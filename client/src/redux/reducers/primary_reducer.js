import { Get_Error, 
    Upload_Video,
    Set_Ouptput_Size,
    Convert_Video,
    Download_Video,
    Change_Uploading_Status,
    Change_Converting_Status,
    Change_Uploaded_Status,
    Change_Converted_Status } from "../actions/action_types";
import primaryState from "../states/primary_state";


const primaryReducer = (state = primaryState, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case Upload_Video:
            console.log(action.payload);
            stateCopy.uploadProgress = action.uploadProgress;
            stateCopy.newFilename = action.payload.data.newFilename;
            console.log(stateCopy);
            return stateCopy;

        case Change_Uploading_Status:
            stateCopy.uploadingStatus= action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Change_Uploaded_Status:
            stateCopy.uploadedStatus= action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Set_Ouptput_Size:
            console.log(action.payload);
            stateCopy.size = action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Convert_Video:
            console.log(action.payload);
            console.log(stateCopy);
            return stateCopy;

        case Change_Converting_Status:
            stateCopy.convertingStatus = action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Change_Converted_Status:
            stateCopy.convertedStatus = action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Download_Video:
            console.log(action.payload);
            console.log(stateCopy);
            return stateCopy;

        case Get_Error:
            console.log(action.payload);
            console.log(action.message);
            console.log(stateCopy);
            return stateCopy;

        default:
            return stateCopy;
    }
}

export default primaryReducer;