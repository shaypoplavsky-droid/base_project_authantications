const createUserModel = (userData) => {
  return {
    id: Date.now(),
    password: userData.password,
    name: userData.name,
    email: userData.email,
    age: userData.age,
    phone: userData.phone,
    city: userData.city,
    role: userData.role || "user",
    createdAt: new Date().toISOString(),
  };
};

module.exports = {
  createUserModel,
};
