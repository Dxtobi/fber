import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '$lib/server/db';
import { UserModel } from '$lib/server/db/models/user';
import { clearAuthCookie, setAuthCookie } from '../../../hooks.server';




/**
 * @param {string} email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export async function POST({ request, url, locals }) {
    // await connectDB();
    const params_ = url.searchParams.get('param');
    
 
  if (params_=='register') {
    return handleRegister(request);
  }
  
 
  if (params_=='login') {
    return handleLogin(request, locals);
  }

  if (params_=='logout') {
    return handleLogout();
  }

  
  return json({ error: 'Endpoint not found' }, { status: 404 });
}


// @ts-ignore
async function handleRegister(request) {
  try {

    await connectDB();

    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    if (password.length < 8) {
      return json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }
    
    if (username.length < 3) {
      return json({ error: 'Username must be at least 3 characters long' }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return json({ error: 'Email already in use' }, { status: 409 });
      }
      if (existingUser.username === username) {
        return json({ error: 'Username already taken' }, { status: 409 });
      }
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Generate auth token
    const userAuthToken = uuidv4();
    
    // Create new user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
      userAuthToken
    });
    
    await newUser.save();
    
    
    const userData = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      userAuthToken: newUser.userAuthToken
    };
    
    let response = json({
      message: 'User registered successfully',
      user: userData
    }, { status: 201 });
    return setAuthCookie(response, userAuthToken);
    
  } catch (error) {
    
    console.error('Registration error:', error);
    return json({ error: 'Server error during registration' }, { status: 500 });
  }
}

// Handler for user login
// @ts-ignore
async function handleLogin(request, locals) {
  try {
    
    await connectDB();
    
   
    const { email, password } = await request.json();
    
    
    if (!email || !password) {
      return json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    
    const userAuthToken = uuidv4();
    user.userAuthToken = userAuthToken;
    await user.save();

    const userData = {
      id: user._id,
      email: user.email,
      username: user.username,
      userAuthToken: user.userAuthToken
    };
    
    
    let response = json({
      message: 'Login successful',
      user: userData
    });
    // Set the auth cookie
        locals.user = { 
          id: user._id, 
          username: user.username, 
          email: user.email 
        }
     return setAuthCookie(response, userAuthToken);
    
  } catch (error) {
    console.error('Login error:', error);
    

    return json({ error: 'Server error during login' }, { status: 500 });
  }
}

async function handleLogout() {
  try {
    const response = json({ message: 'Logout successful' });
    return clearAuthCookie(response);
  } catch (error) {
    console.error('Logout error:', error);
    return json({ error: 'Server error during logout' }, { status: 500 });
  }
}