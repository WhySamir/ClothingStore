import { Prisma, PrismaClient } from '@prisma/client'
import { connect } from 'http2'
const prisma = new PrismaClient()

const customers: Prisma.CustomerCreateInput[] = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    }
  ]
  const categories:Prisma.CategoryCreateInput[] = [{
    id:"1",
    name:"male",
    description:"Men's clothing"
  },{
    id:"2",
    name:"female",
    description:"Women's clothing"
  }]
  const products: Prisma.ProductCreateInput[] = [
    {
      name: "T-Shirt",
      description: "A cool t-shirt",
      price: 19.99,
      stockQty: 100,
      category: {
        connectOrCreate: {where:{
            id:"1"
        },create: {id:"2",name:"female",description:"Women's clothing"} } 
      },
      brand: "Brand A",
      material: "Cotton",
      originCountry: "USA",
    },
    
  ]
async function main() {
  console.log(`Start seeding ...`)
  for(const customer of customers) {
    await prisma.customer.create({
        data: customer
    })
}

    for(const category of categories) {
        await prisma.category.create({
            data: category
        })
    }
    for(const product of products) {
        await prisma.product.create({
            data: product
        })
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })