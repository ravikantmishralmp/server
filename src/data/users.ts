import { User } from "./type";

export const users: User[] = [
    // Admin users
    { id: 1, firstName: 'Alice', lastName: 'Smith', username: 'admin1', password: 'admin123', role: 'admin' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', username: 'admin2', password: 'admin234', role: 'admin' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', username: 'admin3', password: 'admin345', role: 'admin' },
  
    // Regular users
    { id: 4, firstName: 'David', lastName: 'Williams', username: 'user1', password: 'user123', role: 'user' },
    { id: 5, firstName: 'Emma', lastName: 'Jones', username: 'user2', password: 'user234', role: 'user' },
    { id: 6, firstName: 'Fiona', lastName: 'Taylor', username: 'user3', password: 'user345', role: 'user' },
  ];