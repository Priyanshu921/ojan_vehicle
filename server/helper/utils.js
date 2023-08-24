// sample response data
const sampleResponse = {statusCode:200,data:{},error:null,message:null}

// method to response in same format in every API
export const apiResponse = (res,response) => {
    res.status(response.statusCode||200).json({...sampleResponse,...response})
}