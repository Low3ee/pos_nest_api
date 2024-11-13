import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert some sample products into the Product table
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Cappuccino',
        description: 'A classic espresso-based coffee with steamed milk',
        price: 4.50,
        category: Category.COFFEE,
        imageUrl: 'https://example.com/images/cappuccino.jpg',
      },
      {
        name: 'Latte',
        description: 'Espresso with steamed milk and a light foam topping',
        price: 4.00,
        category: Category.COFFEE,
        imageUrl: 'https://example.com/images/latte.jpg',
      },
      {
        name: 'Croissant',
        description: 'A buttery and flaky pastry',
        price: 2.50,
        category: Category.PASTRY,
        imageUrl: 'https://example.com/images/croissant.jpg',
      },
      {
        name: 'Iced Tea',
        description: 'Chilled tea served with ice and lemon',
        price: 3.00,
        category: Category.TEA,
        imageUrl: 'https://example.com/images/iced_tea.jpg',
      },
      {
        name: 'Chocolate Cake',
        description: 'A rich and moist chocolate cake topped with chocolate icing',
        price: 5.00,
        category: Category.DESSERT,
        imageUrl: 'https://example.com/images/chocolate_cake.jpg',
      },
      {
        name: 'Pineapple Smoothie',
        description: 'A refreshing smoothie made with fresh pineapple and yogurt',
        price: 4.00,
        category: Category.BEVERAGE,
        imageUrl: 'https://example.com/images/pineapple_smoothie.jpg',
      },
      {
        name: 'Egg Salad Sandwich',
        description: 'A fresh sandwich with creamy egg salad and lettuce',
        price: 6.00,
        category: Category.SANDWICH,
        imageUrl: 'https://example.com/images/egg_salad_sandwich.jpg',
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, Caesar dressing, croutons, and parmesan',
        price: 7.00,
        category: Category.SALAD,
        imageUrl: 'https://example.com/images/caesar_salad.jpg',
      },
    ],
  });

  console.log('Products have been created:', products);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
