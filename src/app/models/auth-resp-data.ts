export interface AuthRespData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  loaclId: string;
  registered?: boolean;
}
