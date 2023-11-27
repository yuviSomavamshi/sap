export const authRoles = {
  admin: ["Admin"], // Only SA & Admin has access
  manager: ["Admin", "Manager"], // Only Admin & Manager has access
  lead: ["Admin", "Manager", "Lead"], // Only Admin, Manager & Lead has access
  Engineer: ["Admin", "Manager", "Lead", "Engineer"] // Everyone has access
};
