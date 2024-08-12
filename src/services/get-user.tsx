import { ICurrentUser } from "@/context/auth-provider/types";
import { CurrentUser } from "@/context/auth-provider/util";

export const getCurrentUser = async () => {
    const response: ICurrentUser = await CurrentUser()
    return response;
}
