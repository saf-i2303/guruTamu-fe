import http from "@/utils/http";
import {type RegisterRequest, type LoginRequest} from "@/types/user";

export const login = async (payload: LoginRequest) => {
    const{ data } = await http.post("/user/login", payload)
    return data;
};

export const register = async (payload: RegisterRequest) => {
    const{ data } = await http.post("/user/register", payload)
    return data;
};

