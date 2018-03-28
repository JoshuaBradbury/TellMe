CREATE TABLE modules (module_id INT NOT NULL AUTO_INCREMENT,
                      module_name VARCHAR(100),
                      PRIMARY KEY (module_id));

CREATE TABLE messages_sent (announcement_id INT NOT NULL AUTO_INCREMENT,
                            module_id INT NOT NULL,
                            subject VARCHAR(100),
                            message TEXT,
                            time_sent TIMESTAMP DEFAULT NOW(),
                            PRIMARY KEY (announcement_id),
                            FOREIGN KEY (module_id)
                            REFERENCES modules(module_id)
                            ON DELETE CASCADE);

CREATE TABLE students_in_groups (module_id INT NOT NULL,
                                 k_number INT NOT NULL,
                                 FOREIGN KEY (module_id)
                                 REFERENCES modules(module_id)
                                 ON DELETE CASCADE);
