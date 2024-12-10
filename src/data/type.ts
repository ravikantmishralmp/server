 interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
  }

  interface SignupRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }

  export {SignupRequestBody, User};