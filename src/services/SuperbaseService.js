import { supabase } from '../util/supabaseClient';

const redirectTo = process.env.REACT_APP_REDIRECTO;

export default class SuperbaseService {

  static async signin() {
    const { user, session, error } = await supabase.auth.signIn({ provider: 'github', }, { redirectTo });
    return { user, session, error }
  }

  static async getAllPastes(userEmail) {
    const { data } = await supabase.from('pastes').select().eq('user_email', userEmail);
    return data;
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