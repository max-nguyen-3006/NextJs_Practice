import http from "@/lib/http";
import { LoginBodyTypeSchemas, LoginResType, RegisterBodyTypeSchemas, RegisterResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    login: (body:LoginBodyTypeSchemas) =>  http.post<LoginResType>("/auth/login",body),
    register: (body:RegisterBodyTypeSchemas) =>  http.post<RegisterResType>("/auth/register",body),
    auth: (body:{sessionToken:string}) =>  http.post("/api/auth",body, {
        baseUrl:''
    }),
}
export default authApiRequest