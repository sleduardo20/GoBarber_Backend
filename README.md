# Recuperação de Senha
**RF -> Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usurário deve poder resetar sua senha;

**RNF -> Requisitos não Funcionais**
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN ->Regas de Negócio**
- O link envido por e-mail para resetar a senha, deve expirar em duas horas;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil
**RF -> Requisitos Funcionais**
- O usuário deve porder atualizar seu nome, email e senha;

**RN -> Regras de Negócio**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar seu senha, o usuário deve informar a senha antiga;
- Para atualizar a senha, o usuário precisar confirmar a nova senha;

# Painel do Prestador

# Agendamento de Serviços
