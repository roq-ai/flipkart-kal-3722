import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { brokerageValidationSchema } from 'validationSchema/brokerages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.brokerage
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBrokerageById();
    case 'PUT':
      return updateBrokerageById();
    case 'DELETE':
      return deleteBrokerageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBrokerageById() {
    const data = await prisma.brokerage.findFirst(convertQueryToPrismaUtil(req.query, 'brokerage'));
    return res.status(200).json(data);
  }

  async function updateBrokerageById() {
    await brokerageValidationSchema.validate(req.body);
    const data = await prisma.brokerage.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteBrokerageById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.brokerage.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
