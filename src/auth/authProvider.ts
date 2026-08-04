// export const authProvider = {
//   login: async ({ email }) => {
//     // simulate roles
//     let role = "mentee";

//     if (email === "admin@test.com") role = "admin";
//     if (email === "pro@test.com") role = "professional";

//     const user = { email, role };

//     localStorage.setItem("user", JSON.stringify(user));

//     return {
//       success: true,
//       redirectTo: getRedirectByRole(role),
//     };
//   },

//   logout: async () => {
//     localStorage.removeItem("user");
//     return { success: true, redirectTo: "/login" };
//   },

//   check: async () => {
//     const user = localStorage.getItem("user");
//     return {
//       authenticated: !!user,
//       redirectTo: user ? undefined : "/login",
//     };
//   },

//   getIdentity: async () => {
//     return JSON.parse(localStorage.getItem("user") || "{}");
//   },
// };

function getRedirectByRole(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "professional":
      return "/pro";
    default:
      return "/mentee";
  }
}


interface LoginParams {
  email: string;
  password?: string;
}

export const authProvider = {
  login: async ({ email }: LoginParams) => {
    // simulate roles
    let role = "mentee";

    if (email === "admin@test.com") role = "admin";
    if (email === "pro@test.com") role = "professional";

    const user = { email, role };

    localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
      redirectTo: getRedirectByRole(role),
    };
  },

  logout: async () => {
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const user = localStorage.getItem("user");
    return {
      authenticated: !!user,
      redirectTo: user ? undefined : "/login",
    };
  },

  getIdentity: async () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  },
};