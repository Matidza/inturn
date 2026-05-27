export const getRedirectByRole = (role: string) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "professional":
      return "/pro";
    default:
      return "/mentee";
  }
};