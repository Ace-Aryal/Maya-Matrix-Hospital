import { Client, Account, ID } from "appwrite";
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(process.env.appwritreURL!)
      .setProject(process.env.appwritreProjectID!);

    this.account = new Account(this.client);
  }

  //   signup = async ({ username, email, password }) => {
  //     try {
  //       const user = await this.account.create(
  //         ID.unique(), // Auto-generated unique ID
  //         email, // Email
  //         password, // Password
  //         username // Optional: Name
  //       );
  //       return true;
  //     } catch (error) {
  //       showErrorToast(error.message);
  //       console.error(error);

  //       return false;
  //     }
  //   };
  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response
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
}
const authService = new AuthService();
export default authService;
