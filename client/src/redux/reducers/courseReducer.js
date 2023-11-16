import { createReducer } from "@reduxjs/toolkit";


export const courseReducer= createReducer({courses:[]} , {
    courseRequest:(state) =>{
        state.loading=true;
    },
    courseSuccess:(state  , action)=>{
        state.loading=false;
        state.courses=action.payload
    },

    courseFail:(state , action)=>{
        
            state.loading=false;
           
           state.error=action.payload;

    },
    addToPlayListRequest:(state) =>{
        state.loading=true;
    },
    addToPlayListSuccess:(state  , action)=>{
        state.loading=false;
        state.message=action.payload
    },

    addToPlayListFail:(state , action)=>{
        
            state.loading=false;
           
           state.error=action.payload;

    },
    lectureRequest:(state) =>{
        state.loading=true;
    },
    lectureSuccess:(state  , action)=>{
        state.loading=false;
        state.lectures=action.payload
    },

    lectureFail:(state , action)=>{
        
            state.loading=false;
           
           state.error=action.payload;

    },

    clearError: state =>{
        state.error=null;
    },

    clearMessage : state =>{
        state.message=null;
    },
})