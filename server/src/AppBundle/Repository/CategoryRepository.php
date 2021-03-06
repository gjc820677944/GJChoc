<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

/**
 * CategoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CategoryRepository extends \Doctrine\ORM\EntityRepository
{
  public function getCategoriesWithProduct(array $productnames)
  {
    $qb = $this->createQueryBuilder('c');

    // On fait une jointure avec l'entité Product avec pour alias « p »
    $qb
      ->join('c.products', 'p')
      ->addSelect('p')
    ;

    // Puis on filtre sur le nom des products à l'aide d'un IN
    $qb->where($qb->expr()->in('p.name', $productnames));
    // La syntaxe du IN et d'autres expressions se trouve dans la documentation Doctrine

    // Enfin, on retourne le résultat
    return $qb
      ->getQuery()
      ->getResult()
    ;
  }
}
