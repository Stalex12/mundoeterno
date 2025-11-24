import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface UserSession {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

export function useUserSession(): UserSession {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if (event === 'SIGNED_OUT') {
          // Redirect to admin login page if signed out
          router.push('/admin');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return { session, user, isLoading };
}

export function useAdminAuth(redirectPath: string = '/admin') {
  const { session, isLoading } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push(redirectPath);
    }
  }, [session, isLoading, router, redirectPath]);

  return { isAuthenticated: !!session, isLoading };
}
