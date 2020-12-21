<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Persistence\ObjectManager;
/**
 * @Route("/api", name="registration")
 */
class RegistrationController extends AbstractController
{
    private $userRepository;
    private $passwordEncoder;

    public function __construct(
        UserRepository $userRepository ,
        UserPasswordEncoderInterface $passwordEncoder
    ){
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/registration", name="registration" , methods={"POST"})
     */
    public function registration(Request $request): Response
    {

        try{

            $email    = $request->get('email');
            $password = $request->get('password');
            $role     = $request->get('role');

            $role = $role ? $role : ['ROLE_USER'];

            $user = new User();
            $user->setEmail($email)
                 ->setRoles([$role]);

            $encodedPassword = $this->passwordEncoder->encodePassword($user, $password);

            $user->setPassword($encodedPassword);


            $manager = $this->getDoctrine()->getManager();

            $manager->persist($user);
            $manager->flush();

            return $this->json([
                'message' => 'User successfully register!'
            ], Response::HTTP_OK);

        } catch (\Exception $ex){
            return $this->json([
                'message' => 'User wasn\'t registered! Email already used or incorrect password.'
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
