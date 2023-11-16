import {server} from "../store";
import axios from 'axios';


export const getAllCourses = (category="" , keyword="") => async dispatch => {

    try{
        dispatch({type: 'courseRequest'});

        const {data} =await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`);

        console.log(data);

        dispatch({type:'courseSuccess' , payload:data.courses});
    }
    catch(error){
        dispatch({type : 'courseFail' , payload : error.response.data.message});
    }

}
export const getLectures = (id) => async dispatch => {

    try{
        dispatch({type: 'lectureRequest'});

        const {data} =await axios.get(`${server}/course/${id}` , {
            withCredentials:true,
        });

        console.log(data);

        dispatch({type:'lectureSuccess' , payload:data.lectures});
    }
    catch(error){
        dispatch({type : 'lectureFail' , payload : error.response.data.message,
    });
    }

}
