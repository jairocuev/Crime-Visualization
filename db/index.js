const { PrismaClient } = require('@prisma/client');

 const prisma = new PrismaClient()
 
 exports.user = prisma.user;
 exports.crime = prisma.crime;
