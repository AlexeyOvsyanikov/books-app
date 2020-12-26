<?php

namespace App\Controller;

use App\Repository\AuthorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/authors", name="author")
 */
class AuthorController extends AbstractController
{
    public $authorRepository;

    public function __construct(AuthorRepository $authorRepository){
        $this->authorRepository = $authorRepository;
    }

    /**
     * @Route("/count", name="count", methods={"GET"})
     */
    public function getAuthorsCount(): Response
    {
        return $this->json([
            'count' => $this->authorRepository->count([])
        ]);
    }
}
