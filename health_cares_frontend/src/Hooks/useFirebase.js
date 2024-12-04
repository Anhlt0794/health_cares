import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail, updateProfile, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from '../components/Login/Firebase/Firebase.init';
import apiConfig from '../apiConfig'; // Import the API configuration
import axios from 'axios';
initializeAuthentication();initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const useFirebase = () => {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState({});
    const [isLogin, setisLogin] = useState(true);
    const [mail, setMail] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const singInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const singInUsingFacebook = () => {
        return signInWithPopup(auth, facebookProvider);
    };

    const singInUsingGithub = () => {
        return signInWithPopup(auth, githubProvider);
    };

    useEffect(() => {
        const checkAuthState = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiConfig.baseURL}/auth-state`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...apiConfig.headers,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    setUser({});
                }
            } catch (error) {
                setUser({});
            } finally {
                setIsLoading(false);
                setisLogin(true);
            }
        };

        checkAuthState();
    }, []);
    const logout = () => {
        setIsLoading(true);
        signOut(auth).finally(() => setIsLoading(false));
    };

    const handleRegister = e => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }
        if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
            setError('Password should be minimum 6 characters, at least one letter and one number');
            return;
        }
        isLogin ? loginRegisterUser(mail, password) : registeruser(mail, password);
    };

    const registeruser = async (mail, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiConfig.baseURL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...apiConfig.headers,
                },
                body: JSON.stringify({ email: mail, password, userName }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const loginRegisterUser = async (mail, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiConfig.baseURL}/signin`, {
                email: mail,
                password
            }, {
                headers: apiConfig.headers
            });
            const data = response.data;
            if (response.status === 200) {
                setUser(data.user);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const verifyUserMail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setError('Verification mail has been sent to your mail');
            });
    };

    const handleUserName = e => {
        setUserName(e.target.value);
    };

    const handleEmail = e => {
        setMail(e.target.value);
    };

    const handlePass = e => {
        setPass(e.target.value);
    };

    const handleConfirmPass = e => {
        const confirmPass = e.target.value;
        if (password === confirmPass) {
            setError('');
        } else {
            setPass('');
            setError('Password is not matched');
        }
    };

    const toggleLogin = e => {
        setisLogin(e);
    };

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, mail)
            .then(() => {
                setError('Password reset mail is sent');
            });
    };

    return {
        singInUsingGoogle,
        singInUsingFacebook,
        singInUsingGithub,
        user,
        setUser,
        isLogin,
        logout,
        handleRegister,
        handlePasswordReset,
        handleUserName,
        handleEmail,
        handlePass,
        error,
        setError,
        loginRegisterUser,
        handleConfirmPass,
        toggleLogin,
        setIsLoading,
        isLoading,
        mail
    };
};

export default useFirebase;