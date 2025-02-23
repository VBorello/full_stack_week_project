export const isValidCpf = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Elimina CPFs com todos os dígitos iguais (ex: 888.888.888-88)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Cálculo do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstVerifier = (sum * 10) % 11;
  if (firstVerifier === 10) firstVerifier = 0;

  if (firstVerifier !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Cálculo do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondVerifier = (sum * 10) % 11;
  if (secondVerifier === 10) secondVerifier = 0;

  return secondVerifier === parseInt(cpf.charAt(10));
};
