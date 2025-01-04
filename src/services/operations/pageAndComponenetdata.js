 
 import React from 'react'
 import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../api';
export const getCatalogPageData = async (categoryId) => {
    console.log("jhess jhess ", categoryId); 
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, { categoryId: categoryId });
        console.log("this is category page data response...", response);

        if (!response?.data?.success) {
            throw new Error("Cannot get API response for category page data");
        }

        result = response?.data; // Assign the data to result
        console.log("this is category page details", result);
        console.log("flagggg");
        toast.dismiss(toastId);
        console.log("flagggg000");
        
        return result; // Return the result here

    } catch (e) {
        console.log("Catalog Page dataAPI error ", e);
       
        result = e.response ? e.response.data : []; // Handle error response safely
    }
    console.log("flagggg0001");
    toast.dismiss(toastId);
    return result; // If an error occurred, return the default empty array or error data
};
