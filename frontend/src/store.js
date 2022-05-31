import {configureStore}from '@reduxjs/toolkit'
import fileTransfer from './reducer/fileTransfer'

export const store=configureStore({
    reducer:{
        fileTransfer

    }

})