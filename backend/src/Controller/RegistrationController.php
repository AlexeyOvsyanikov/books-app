<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Lexik\Bundle\JWTAuthenticationBundle\Tests\Stubs\JWTUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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


    /**
     * @Route("/check_token", name="check_token" , methods={"POST"})
     */
    public function checkTokenAction(Request $request): Response{

        $tokenFromClient = $request->headers->get('Authorization');

        if( $tokenFromClient ) {
            $tokenFromClient = substr($tokenFromClient,7);
        }

        $token = $this->container->get('security.token_storage')->getToken();

        if($token){
            $token = $token->getCredentials();
        }

        if( $token && $tokenFromClient && ($token === $tokenFromClient)) {

            return $this->json([
                'code' => Response::HTTP_OK,
                'message'  => 'Authorized.',
            ], Response::HTTP_OK);

        }

        return $this->json([
            'code' => Response::HTTP_UNAUTHORIZED,
            'message'  => 'Unauthorized.',
        ], Response::HTTP_UNAUTHORIZED);
    }

}
