import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient';

export default function useAuth() {
  const [authSession, setAuthSession] = useState(null);

  useEffect(() => {

    let authListener = null;

    (async () => {
      const token = localStorage.getItem('auth-token');
      const { user, error } = await supabase.auth.api.getUser(token);
      if (user) setAuthSession(user)

      authListener = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user_metadata) setAuthSession(session);
      });
    })();

    return () => {
      if (authListener && authListener.data) authListener.data.unsubscribe();
    }
  }, []);

  return authSession
}
