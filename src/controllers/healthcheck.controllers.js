import {ApiError} from "../utils/ApiErrors.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"


const healthcheck = asyncHandler(async (req, res) => {
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {message: "Everything is OK"},
            "OK"
        )
    )

})

export { healthcheck }
    