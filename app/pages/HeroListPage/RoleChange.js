export const RoleChange = (newRole,role) => {
    const change = role.includes(newRole)?role.filter((role) => role !== newRole): [...role, newRole];
    return change;
  };
   // const RoleChange = (newRole) => {
  //   setRole((prevRoles) =>
  //     prevRoles.includes(newRole)? prevRoles.filter((role) => role !== newRole): [...prevRoles, newRole]
  //   );
  // };