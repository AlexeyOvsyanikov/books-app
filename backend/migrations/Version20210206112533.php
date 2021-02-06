<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210206112533 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE author (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE books_authors (author_id INT NOT NULL, book_id INT NOT NULL, INDEX IDX_877EACC2F675F31B (author_id), INDEX IDX_877EACC216A2B381 (book_id), PRIMARY KEY(author_id, book_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE book (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(150) NOT NULL, year SMALLINT DEFAULT NULL, description VARCHAR(2000) NOT NULL, image VARCHAR(2048) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_books (user_id INT NOT NULL, book_id INT NOT NULL, INDEX IDX_AD6C8EDBA76ED395 (user_id), INDEX IDX_AD6C8EDB16A2B381 (book_id), PRIMARY KEY(user_id, book_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE books_authors ADD CONSTRAINT FK_877EACC2F675F31B FOREIGN KEY (author_id) REFERENCES author (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE books_authors ADD CONSTRAINT FK_877EACC216A2B381 FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_books ADD CONSTRAINT FK_AD6C8EDBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_books ADD CONSTRAINT FK_AD6C8EDB16A2B381 FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE books_authors DROP FOREIGN KEY FK_877EACC2F675F31B');
        $this->addSql('ALTER TABLE books_authors DROP FOREIGN KEY FK_877EACC216A2B381');
        $this->addSql('ALTER TABLE users_books DROP FOREIGN KEY FK_AD6C8EDB16A2B381');
        $this->addSql('ALTER TABLE users_books DROP FOREIGN KEY FK_AD6C8EDBA76ED395');
        $this->addSql('DROP TABLE author');
        $this->addSql('DROP TABLE books_authors');
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE users_books');
    }
}
