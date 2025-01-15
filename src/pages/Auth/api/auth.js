import { publicApiRoute } from "utils/GlobalRequest";

export const loginApi = async(body, navigate) => {

    const {data, status} = await publicApiRoute.post("login", body)


    if(status === 200 || status === 201){

        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("refresh_token", data.refresh_token)
        localStorage.setItem("roles", data.roles)
        localStorage.setItem("userId", data.id)

        navigate("/dashboard")
        
    }

    return data



}