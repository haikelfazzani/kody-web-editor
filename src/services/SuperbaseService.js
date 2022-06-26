import { supabase } from '../util/supabaseClient';

const redirectTo = process.env.REACT_APP_REDIRECTO;

export default class SuperbaseService {

  static async signin() {
    const { user, session, error } = await supabase.auth.signIn({ provider: 'github', }, { redirectTo });
    return { user, session, error }
  }

  static async signout() {
    await supabase.auth.signOut();
    // window.localStorage.removeItem('auth-token')
    window.location.href = '/login';
  }

  static async getAllPastes(userEmail) {
    const { data, error } = await supabase.from('pastes').select().eq('user_email', userEmail);
    if (error) window.location.href = '/login';
    return data;
  }

  static async getOnePaste(id) {
    const { data, error } = await supabase.from('pastes').select().eq('id', id);
    if (error) window.location.href = '/login';
    return data[0];
  }

  static async savePaste({ filename, content, user_email }) {
    const { data, error } = await supabase
      .from('pastes')
      .insert([{ filename, content, user_email }]);
    if (error) window.location.href = '/login';
    return data[0];
  }
}