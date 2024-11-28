# Dockerfile
FROM postgres:16-alpine3.20

# Defina as variáveis de ambiente comuns para todos os bancos de dados
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copie o arquivo init.sql para a pasta de inicialização do PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/

# Crie os bancos de dados e suas configurações específicas
COPY postgres_parts/init_parts.sql /docker-entrypoint-initdb.d/init_parts.sql
COPY postgres_machines/init_machines.sql /docker-entrypoint-initdb.d/init_machines.sql
COPY postgres_maintenances/init_maintenances.sql /docker-entrypoint-initdb.d/init_maintenances.sql
COPY postgres_users/init_users.sql /docker-entrypoint-initdb.d/init_users.sql