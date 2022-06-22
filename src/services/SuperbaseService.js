import { supabase } from '../util/supabaseClient'

export default class SuperbaseService {

  static async signin() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    }, {
      redirectTo: 'http://localhost:8888/callback'
    });

    return { user, session, error }
  }

  static async getAllPastes(access_token) {
    const token = localStorage.getItem('auth-token') || access_token;
    const { user, error } = supabase.auth.setAuth(token);
    console.log(user, error);
    const { data } = await supabase.from('pastes').select().eq('user_id', user.id);
    return data
  }

  static async getOnePaste(id) {
    const { data, error } = await supabase.from('pastes').select().eq('id', id);    
    return data[0];
  }

  static async savePaste({ filename, content, user_email }) {
    const { data, error } = await supabase
      .from('pastes')
      .insert([{ filename, content, user_email }]);

    return data[0];
  }
}