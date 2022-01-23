CREATE DATABASE pfa;

use pfa;

CREATE TABLE IF NOT EXISTS cursos (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome_do_curso varchar(255)
);

INSERT INTO cursos (nome_do_curso)
VALUES 
    ('Docker'),
    ('Git e GitHub'),
    ('Kubernetes'),
    ('Terraform'),
    ('Apache Kafka'),
    ('RabbitMQ');
