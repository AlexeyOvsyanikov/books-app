<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder){
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
         $user = new User();
         $user->setEmail('admin@gmail.com');
         $user->setRoles(['ROLE_ADMIN']);

         $encodedPassword = $this->passwordEncoder->encodePassword($user,'123456');

         $user->setPassword($encodedPassword);

         $manager->persist($user);

         $manager->flush();
    }
}
