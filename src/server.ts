import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { users } from './data/users';
import { JwtPayload } from './types';
import { User, SignupRequestBody } from './data/type';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = 'your_secret_key';

const authenticateJWT: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return; // Explicitly stop execution after sending the response
    }
  
    try {
      const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = user; // Attach the user to the request object
      next(); // Continue to the next middleware/route handler
    } catch (error) {
      res.status(403).json({ message: 'Forbidden' });
      return; // Explicitly stop execution after sending the response
    }
  };
  

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.json({ token, isAdmin: user.role === 'admin' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/signup', (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    const { firstName, lastName, username, password } = req.body;
  
    // Validate input
    if (!firstName || !lastName || !username || !password) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }
  
    // Check if the username already exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists.' });
      return;
    }
  
    // Add new user
    const newUser: User = {
      id: users.length + 1,
      firstName,
      lastName,
      username,
      password, // In production, hash the password with bcrypt
      role: 'user', // Default role
    };
    users.push(newUser);
  
    // Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    res.status(201).json({ token, isAdmin: false });
  });
  


// Example of a protected route
app.get('/protected', authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
