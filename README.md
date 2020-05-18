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

**RF -> Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listas os dias de um mês com pelos menos um horário disponível
de um prestatodor;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF -> Requisitos não Funcionais**
- A listagem de prestadores deve ser armazenada em cache;

**RN -> Regras de Negócio**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h as 18hs (1° as 8hs e o umtilmo as 17hs);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar um um horário que já passou;
- O usuário não pode agendar um serviço consigo mesmo;
