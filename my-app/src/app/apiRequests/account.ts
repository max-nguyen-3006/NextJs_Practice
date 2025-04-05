import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: async (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  meClient: async () => http.get<AccountResType>("/account/me"),
};
export default accountApiRequest;
