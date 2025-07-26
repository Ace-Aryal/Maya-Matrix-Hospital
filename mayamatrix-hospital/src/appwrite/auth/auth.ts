import { Client, Account, ID } from "appwrite";
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    this.account = new Account(this.client);
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  logout = async () => {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  getuser = async () => {
    try {
      const currentuser = await this.account.get();
      return currentuser;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
const authService = new AuthService();
export default authService;
