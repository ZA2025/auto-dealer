
import { signIn, signOut } from '@/auth'; // Import signIn and signOut from auth.js

// Login action
export async function login(formData) {
    console.log('Login action triggered');
    const action = formData.get('action'); // Get action from formData
    await signIn(action, { redirectTo: '/home' }); // Redirect to home after login
}

// Logout action
export async function logout() {
    console.log('Logout action triggered');
    await signOut({ redirectTo: '/' }); // Redirect to homepage after logout
}
