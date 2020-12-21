<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\BookRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ORM\Entity(repositoryClass=BookRepository::class)
 * @ApiResource
 */
class Book
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150)
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $year;

    /**
     * @ORM\Column(type="string", length=2000)
     * @Assert\NotBlank
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=2048, nullable=true)
     */
    private $image;


    /**
     * Many Books have Many Authors.
     * @ORM\ManyToMany(targetEntity="Author", mappedBy="books")
     */
    private $authors;

    public function __construct(){
        $this->authors = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(?int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function addAuthor(Author $author): self {
        $this->authors->add($author);
        return $this;
    }

    public function getAuthors(Author $author) : \Doctrine\Common\Collections\ArrayCollection{
        return $this->authors;
    }

}
