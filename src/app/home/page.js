import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/loginForm/LoginForm';
 

const HomePage = async () => {
    const session = await auth();
    if (!session?.user)  redirect('/');

    return (
        <div>
            <div className="inner-section">
                <h1>Welocme to the Admin Page - {session?.user?.name}</h1>
                <p>Coming Soon</p>
                
                <LoginForm />
            </div>
        </div>
    )

}

export default HomePage;