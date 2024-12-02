// src/utils/validation.ts
export const validateUsername = (username: string): string | null => {
  if (!username) return "Kullanıcı adı gerekli";
  if (username.length < 3) return "Kullanıcı adı en az 3 karakter olmalı";
  if (username.length > 20) return "Kullanıcı adı en fazla 20 karakter olmalı";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Şifre gerekli";
  if (password.length < 6) return "Şifre en az 6 karakter olmalı";
  return null;
};
