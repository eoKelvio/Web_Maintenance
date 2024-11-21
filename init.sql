CREATE TABLE IF NOT EXISTS parts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    cost FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    leader_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS machines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    type VARCHAR(30) NOT NULL,
    local VARCHAR(30) NOT NULL,
    fabrication_date DATE NOT NULL,
    serial_number VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,   
    team_id INT NULL,
    CONSTRAINT fk_team
        FOREIGN KEY(team_id) 
        REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS maintenances (
    id SERIAL PRIMARY KEY,
    machine_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    description VARCHAR(30) NOT NULL,
    priority VARCHAR(30) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id),
    CONSTRAINT fk_machine
        FOREIGN KEY(machine_id) 
        REFERENCES machines(id)
);

CREATE TABLE IF NOT EXISTS used_parts(
    id SERIAL PRIMARY KEY,
    maintenance_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_maintenance
        FOREIGN KEY(maintenance_id) 
        REFERENCES maintenances(id),
    CONSTRAINT fk_part
        FOREIGN KEY(part_id) 
        REFERENCES parts(id)
);