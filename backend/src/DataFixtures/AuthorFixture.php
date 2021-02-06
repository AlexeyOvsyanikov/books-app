<?php

namespace App\DataFixtures;

use App\Entity\Author;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AuthorFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $authors = [
            [
                'firstname' => 'Mikhail',
                'lastname' => 'Lermontov'
            ],
            [
                'firstname' => 'Lev',
                'lastname' => 'Tolstoi'
            ],
            [
                'firstname' => 'Anton',
                'lastname' => 'Chekhov'
            ],
            [
                'firstname' => 'Ivan',
                'lastname' => 'Turgenev'
            ],
            [
                'firstname' => 'Nikolai',
                'lastname' => 'Gogol'
            ],
            [
                'firstname' => 'Aleksandr',
                'lastname' => 'Blok'
            ],
            [
                'firstname' => 'Nikolai',
                'lastname' => 'Nekrasov'
            ],
            [
                'firstname' => 'Ivan',
                'lastname' => 'Bunin'
            ],
        ];


        foreach ($authors as $author){

            $newAuthor = new Author();


            $newAuthor->setFirstname($author['firstname']);
            $newAuthor->setLastname($author['lastname']);
            $manager->persist($newAuthor);

            $manager->flush();

        }

    }
}
