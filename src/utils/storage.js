// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'trucksigns_users',
  CURRENT_USER: 'trucksigns_current_user',
  DESIGNS: 'trucksigns_designs',
};

// User management
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  const existingIndex = users.findIndex((u) => u.email === user.email);

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return user;
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const validateCredentials = (email, password) => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Current user session
export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  if (user) {
    // Don't store password in session
    const { password: _password, ...safeUser } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Design management
export const getAllDesigns = () => {
  const designs = localStorage.getItem(STORAGE_KEYS.DESIGNS);
  return designs ? JSON.parse(designs) : [];
};

export const getUserDesigns = (userEmail) => {
  const designs = getAllDesigns();
  return designs.filter((d) => d.userEmail === userEmail);
};

export const saveDesign = (design) => {
  const designs = getAllDesigns();
  const existingIndex = designs.findIndex((d) => d.id === design.id);

  if (existingIndex >= 0) {
    designs[existingIndex] = {
      ...design,
      updatedAt: new Date().toISOString(),
    };
  } else {
    designs.push({
      ...design,
      id: design.id || `design_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
  return designs[existingIndex >= 0 ? existingIndex : designs.length - 1];
};

export const getDesignById = (designId) => {
  const designs = getAllDesigns();
  return designs.find((d) => d.id === designId);
};

export const deleteDesign = (designId) => {
  const designs = getAllDesigns();
  const filteredDesigns = designs.filter((d) => d.id !== designId);
  localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(filteredDesigns));
  return true;
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
