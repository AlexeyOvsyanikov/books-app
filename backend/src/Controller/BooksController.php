<?php

namespace App\Controller;

use App\Repository\AuthorRepository;
use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/books", name="books")
 */
class BooksController extends AbstractController
{

    private $bookRepository;
    private $authorRepository;

    public function __construct(
        BookRepository $bookRepository,
        AuthorRepository $authorRepository
    ){
        $this->bookRepository = $bookRepository;
        $this->authorRepository = $authorRepository;
    }

    /**
     * @Route("/image", name="image", methods={"POST"})
     */
    public function uploadBookImage(Request $request): Response
    {

        $fileInBase64 = $request->get('image');
        $fileName = $request->get('image_name');
        $bookId = $request->get('book_id');

        $imagePath = $this->getParameter('books_images_directory');
        $booksImagesDirectoryForDb = $this->getParameter('books_images_directory_for_db');

        $bookDir = "{$imagePath}{$bookId}";

        if(!file_exists($bookDir)){
            mkdir($bookDir);
        }

        $status = Response::HTTP_OK;
        $book = null;

        if(!file_put_contents("{$bookDir}/{$fileName}", file_get_contents($fileInBase64))){
            $status = Response::HTTP_BAD_REQUEST;
        } else {
            $book = $this->bookRepository->find($bookId);
            if($book){
                $book->setImage("{$booksImagesDirectoryForDb}{$bookId}/$fileName");
                $this->getDoctrine()->getManager()->persist($book);
                $this->getDoctrine()->getManager()->flush();
            }
        }

        return $this->json([
            'book' => $book
        ],$status);
    }
}
