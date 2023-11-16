import {server} from "../store";
import axios from 'axios';


export const updateProfile = (name , email) => async dispatch => {

    try{
        dispatch({type: 'updateProfileRequest'});

        const {data} =await axios.put(`${server}/updateProfile` , {name , email},{
            headers:{
                "Content-Type" : "application/json",

            },
            withCredentials:true,
        });

        console.log(data);

        dispatch({type:'updateProfileSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'updateProfileFail' , payload : error.response.data.message});
    }

}
export const updateProfilePicture = (formdata) => async dispatch => {

    try{
        dispatch({type: 'updateProfilePictureRequest'});

        const {data} =await axios.put(`${server}/updateProfilepicture` , formdata,{
            headers:{
                "Content-Type" : "multipart/form-data",

            },
            withCredentials:true,
        });

        console.log(data);

        dispatch({type:'updateProfilePictureSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'updateProfilePictureFail' , payload : error.response.data.message});
    }

}
export const changePassword = (oldPassword , newPassword) => async dispatch => {

    try{
        dispatch({type: 'changePasswordRequest'});

        const {data} =await axios.put(`${server}/changePassword` , {oldPassword , newPassword},{
            headers:{
                "Content-Type" : "application/json",

            },
            withCredentials:true,
        });

        console.log(data);

        dispatch({type:'changePasswordSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'changePasswordFail' , payload : error.response.data.message});
    }

}




export const forgetPassword = (email) => async dispatch => {

    try{
        dispatch({type: 'forgetPasswordRequest'});

        const {data} =await axios.post(`${server}/forgetPassword` , {email},{
            headers:{
                "Content-Type" : "application/json",

            },
            withCredentials:true,
        });

        console.log(data);

        dispatch({type:'forgetPasswordSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'forgetPasswordFail' , payload :error.response.data.message});
    }

}
export const resetPassword = (token, password) => async dispatch => {
    try {
        dispatch({ type: 'resetPasswordRequest' });

        const response = await axios.put(`${server}/resetpassword/${token}`, {password}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log(response.data);

        dispatch({ type: 'resetPasswordSuccess', payload: response.data.message });
    } catch (error) {
        console.error("Reset password error:", error);
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : 'An error occurred during password reset.';

        dispatch({ type: 'resetPasswordFail', payload: errorMessage });
    }
};



export const addToPlayList = id => async dispatch => {
    try {
        dispatch({ type: 'addToPlayListRequest' });

        const { data } = await axios.post(`${server}/addtoplaylist`, {id}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log(data);

        dispatch({ type: 'addToPlayListSuccess', payload: data.message });
    } catch (error) {
        console.error("Add to playlist error:", error);

        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : 'An error occurred while adding to the playlist.';

        dispatch({ type: 'addToPlayListFail', payload: errorMessage });
    }
};

export const removeFromPlayList = (id) => async dispatch => {

    try{
        dispatch({type: 'removeFromPlayListRequest'});

        const {data} =await axios.delete(`${server}/removefromplaylist?id=${id}` , {
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'removeFromPlayListSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'removeFromPlayListFail' , payload : error.response.data.message});
    }

}