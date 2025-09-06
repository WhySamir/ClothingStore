import { Prisma, PrismaClient } from '@prisma/client'
import { connect } from 'http2'
const prisma = new PrismaClient()

const customers: Prisma.CustomerCreateInput[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      userAvatarUrl: "https://example.com/avatar.jpg",
    }
  ]
  const categories:Prisma.CategoryCreateInput[] = [{
    name:"male",
    description:"Men's clothing"
  },{
    name:"female",
    description:"Women's clothing"
  }]
  const products: Prisma.ProductCreateInput[] = [
    {
      name: "T-Shirt",
      description: "A cool t-shirt",
      mainImgUrl:"https://res.cloudinary.com/dcfrlqakq/image/upload/v1753473129/image_1_lapjpe.png",
      sellingPrice:"5000",
      costPrice:"1000",
      stockQty: 100,
      category: {
        connectOrCreate: {where:{
            id:1
        },create: {id:2,name:"female",description:"Women's clothing"} } 
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