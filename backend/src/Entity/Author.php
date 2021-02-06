<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use App\Repository\AuthorRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AuthorRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"author"}},
 *     denormalizationContext={"groups"={"author"}},
 *     attributes={"security"="is_granted('ROLE_USER')"},
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_USER')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "patch"={"security"="is_granted('ROLE_USER')"},
 *         "delete"={"security"="is_granted('ROLE_USER')"}
 *     }
 * )
 */
class Author
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"book","author"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank
     * @Groups({"book","author"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank
     * @Groups({"book","author"})
     */
    private $lastName;

    /**
     * @ORM\ManyToMany(targetEntity="Book" , inversedBy="authors")
     * @Groups({"author"})
     * @ORM\JoinTable(name="books_authors")
     *
     */
    public $books;

    public function __construct(){

        $this->books = new \Doctrine\Common\Collections\ArrayCollection();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstname): self
    {
        $this->firstName = $firstname;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastname): self
    {
        $this->lastName = $lastname;

        return $this;
    }


    public function getBooks(){
        return $this->books;
    }

    public function addBook(Book $book): self{
        $this->books->add($book);
        return $this;
    }

}
