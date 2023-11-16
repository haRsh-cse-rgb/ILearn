import {server} from "../store";
import axios from 'axios';

export const createCourse = (title , description , category , createdBy , file) => async dispatch => {

    try{
        dispatch({type: 'createCourseRequest'});

        const {data} =await axios.post(`${server}/createcourse` , {title , description , category , createdBy , file} ,  {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'createCourseSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'createCourseFail' , payload : error.response.data.message,
    });
    }

}
export const deleteCourse = (id) => async dispatch => {

    try{
        dispatch({type: 'deleteCourseRequest'});

        const {data} =await axios.delete(`${server}/course/${id}` ,  {
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'deleteCourseSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'deleteCourseFail' , payload : error.response.data.message,
    });
    }

}
export const addLecture = (id , title , description , file) => async dispatch => {

    try{
        dispatch({type: 'addLectureRequest'});

        const {data} =await axios.post(`${server}/course/${id}` , {title , description , file}, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'addLectureSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'addLectureFail' , payload : error.response.data.message,
    });
    }

}
export const deleteLecture = (courseId , lectureId) => async dispatch => {

    try{
        dispatch({type: 'deleteLectureRequest'});

        const {data} =await axios.delete(`${server}/lectures?courseId=${courseId}&lectureId=${lectureId}` , {
            
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'deleteLectureSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'deleteLectureFail' , payload : error.response.data.message,
    });
    }

}
export const getAllUsers = () => async dispatch => {

    try{
        dispatch({type: 'getAllUsersRequest'});

        const {data} =await axios.get(`${server}/admin/users` , {
            
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'getAllUsersSuccess' , payload:data.users});
    }
    catch(error){
        dispatch({type : 'getAllUsersFail' , payload : error.response.data.message,
    });
    }

}
export const deleteUsers = (id) => async dispatch => {

    try{
        dispatch({type: 'deleteUsersRequest'});

        const {data} =await axios.delete(`${server}/admin/users/${id}` , {
            
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'deleteUsersSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'deleteUsersFail' , payload : error.response.data.message,
    });
    }

}
export const updateUsersRole = (id) => async dispatch => {

    try{
        dispatch({type: 'updateUsersRoleRequest'});

        const {data} =await axios.put(`${server}/admin/users/${id}` , {} , {
            
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'updateUsersRoleSuccess' , payload:data.message});
    }
    catch(error){
        dispatch({type : 'updateUsersRoleFail' , payload : error.response.data.message,
    });
    }

}
export const getDashboardStats = () => async dispatch => {

    try{
        dispatch({type: 'getStatsRequest'});

        const {data} =await axios.get(`${server}/admin/getstats`  , {
            
            
            withCredentials: true,
        });

        console.log(data);

        dispatch({type:'getStatsSuccess' , payload:data});
    }
    catch(error){
        dispatch({type : 'getStatsFail' , payload : error.response.data.message,
    });
    }

}
