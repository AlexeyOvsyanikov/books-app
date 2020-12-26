<?php

namespace App\DataFixtures;

use App\Entity\Author;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AuthorFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {

        for($i = 1 ; $i <= 10 ; $i++ ){

            $author = new Author();

            $author->setFirstname("Author firstname $i");
            $author->setLastname("Author lastname $i");
            $manager->persist($author);

        }

        $manager->flush();
    }
}
